import React, { useState, useRef, useEffect } from "react";
import { useForm, } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge, Eye, FileText, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import ViewClearanceDialog from '@/pages/vetmed/ViewClearanceDialog';

import { Link } from '@inertiajs/react';

import { type BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { PigIcon } from "@/components/icons";


const breadcrumbs: BreadcrumbItem[] = [
  { title: "Seller", href: "/marketplace/seller/edit" }
];

interface Swine {
  id: number;
  name: string;
  tag_number: string;
  breed_name?: string;
  weight?: number;
  breed?: string;
  sex?: string;
}

interface Listing {
  id: number;
  title: string;
  category: string;
  description: string;
  price_per_unit: number;
  price_unit_type: string;
  swine_ids: number[];
  sex_summary?: string;
  breed?: string;
  age_range?: string;
  barangay?: { name?: string };
  seller: {
    name: string;
    email: string;
    user_information?: {
      address?: string;
      contact_number?: string;
    };
  };
  available_quantity: number;
  listing_swine: {
    id: number;
    scaled_weight?: number;
    estimated_weight?: number;
    breed?: string;
    birthdate?: string;
    status?: string;
    sex?: string;
  }[];
  full_address?: string;
  province?: { name?: string };
  municipal?: { name?: string };
  purok?: string;
  street?: string;
  breed_summary?: string;
  status: string;
  image: string;
    gallery_images?: string[]; // array of image paths from storage
    gallery_image_ids?: number[]; // optional, if you track IDs for deletion
  

}

interface Props {

  listing: Listing;
  availableSwine: Swine[];
   vetmedClearance?: {
    id: number;
    clearance_number: string;
    document_type: string;
    veterinarian_name: string;
    license_number: string;
    issued_by: string;
    issue_date: string;
    expiry_date: string;
    remarks: string;
    status: string;
    file_path: string;
    file_name: string;
    mime_type: string;
    file_size: number;
    rejection_reason?: string;
    created_at: string;
  } | null;
}


const EditListing: React.FC<Props> = ({ listing, availableSwine, vetmedClearance }) => {
  const [activeTab, setActiveTab] = useState<"swine" | "details">("swine");
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabContentRef.current) {
      const yOffset = -10; // adjust if you have a fixed navbar
      const y =
        tabContentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeTab]);



  const [selectedCount, setSelectedCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [swineToAdd, setSwineToAdd] = useState<Swine[]>([]);


  const { data, setData, put, errors, processing } = useForm({
    title: listing.title || "",
    category: listing.category || "fattening",
    description: listing.description || "",
    price_per_unit: listing.price_per_unit || "",
    price_unit_type: listing.price_unit_type || "per_head",
    swine_ids: listing.swine_ids || [],
    image: null as File | null, // ✅ add this line
  });

  const toggleSwine = (id: number) => {
    const newSelected = data.swine_ids.includes(id)
      ? data.swine_ids.filter((s) => s !== id)
      : [...data.swine_ids, id];
    setData("swine_ids", newSelected);
    setSelectedCount(newSelected.length);
  };
  const handleUncheckAll = () => {
    setData("swine_ids", []);
    setSelectedCount(0);
  };

  const handleUpdateClick = () => {
    const previousIds = listing.swine_ids || [];
    const addedIds = data.swine_ids.filter(id => !previousIds.includes(id));
    const addedSwine = availableSwine.filter(s => addedIds.includes(s.id));
    setSwineToAdd(addedSwine);
    setShowConfirm(true);
  };
  const formatAddress = (listing: any) => {
    const parts = [
      listing.street,
      listing.purok ? `Purok ${listing.purok}` : null,
      listing.barangay?.name,
      listing.municipal?.name,
      listing.province?.name,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const previousCount = listing.swine_ids?.length || 0;
    const newCount = data.swine_ids.length;
    const added = newCount - previousCount;



    put(`/marketplace/seller/${listing.id}`, {
      preserveScroll: true, // keep scroll position
      onSuccess: () => {
        if (added > 0) {
          toast.success(`${added} new swine added to the listing.`);
          setData("swine_ids", []);
          setSelectedCount(0);
        } else if (added < 0) {
          toast.info(`${Math.abs(added)} swine removed from the listing.`);
        } else {
          toast.success(`Listing updated successfully — no changes in swine count.`);
        }
      },
      onError: () => {
        toast.error("Failed to update the listing. Please check your inputs.");
      },
    });
  };

  const handleTabClick = (tab: "swine" | "details") => {
    setActiveTab(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSwineId, setSelectedSwineId] = useState<number | null>(null);

  const handleOpenModal = (swineId: number) => {
    setSelectedSwineId(swineId);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (!selectedSwineId) return;
router.delete(
  route("marketplace.seller.removeSwine", { 
    listingId: listing.id,
    swineId: selectedSwineId,
  }),
  {
    preserveScroll: true,
    onSuccess: () => setIsModalOpen(false),
    onError: () => alert("Failed to remove swine. Please try again."),
  }
);

  };

  const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string>(
  listing.image ? (listing.image.startsWith("/storage/") ? listing.image : `/storage/${listing.image}`) : ''
);


  const csrfToken = (window as any).Laravel?.csrfToken;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    router.post(`/marketplace/seller/${listing.id}/image`, formData, {
      forceFormData: true,      // ensures files are sent correctly
      preserveScroll: true,     // keeps scroll position
      onSuccess: (page) => {
        toast.success("Image updated successfully!");
      },
      onError: (errors) => {
        console.log(errors);
        toast.error("Failed to update image.");
      },
    });
  };

  // Inside your EditListing component
const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
  listing.gallery_images?.map((img) => `/storage/${img}`) || []
);


const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const filesArray = Array.from(e.target.files);
  setGalleryFiles(filesArray);

  // Add preview URLs
  const previews = filesArray.map((file) => URL.createObjectURL(file));
  setGalleryPreviews((prev) => [...prev, ...previews]);
};

const submitGallery = () => {
  if (galleryFiles.length === 0) return;

  const formData = new FormData();
  galleryFiles.forEach((file) => formData.append("images[]", file));

  router.post(`/marketplace/seller/${listing.id}/images`, formData, {
    forceFormData: true,
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Gallery images uploaded successfully!");
      setGalleryFiles([]);
    },
    onError: () => {
      toast.error("Failed to upload gallery images.");
    },
  });
};


const handleDeleteGallery = (photoId: number) => {
  if (!confirm("Are you sure you want to remove this image?")) return;

  router.delete(`/marketplace/seller/${listing.id}/images/${photoId}`, {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Image removed successfully!");
      // safely remove from local state if exists
      setGalleryPreviews((prev) =>
        prev.filter((_, idx) => listing.gallery_image_ids?.[idx] !== photoId)
      );
      if (listing.gallery_image_ids) {
        listing.gallery_image_ids = listing.gallery_image_ids.filter(
          (id) => id !== photoId
        );
      }
    },
    onError: () => toast.error("Failed to remove image."),
  });
};

const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);
const images = listing.gallery_images || [];


// Add state for vetmed clearance dialog inside your component
const [isVetmedDialogOpen, setIsVetmedDialogOpen] = useState(false);
const [selectedClearance, setSelectedClearance] = useState<any>(null);

// Add this function to handle viewing vetmed clearance
  const handleViewVetmedClearance = () => {
    if (vetmedClearance) {
      setSelectedClearance(vetmedClearance);
      setIsVetmedDialogOpen(true);
    }
  };

  return (
 <AppLayout breadcrumbs={breadcrumbs}>
    <div className="full-wide mx-auto  space-y-6">

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Confirm Listing Update</DialogTitle>
            <DialogDescription>
              Please review the information before confirming your listing update.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Listing Details</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>Title:</strong> {data.title}</li>
                <li><strong>Category:</strong> {data.category}</li>
                <li><strong>Price:</strong> ₱{data.price_per_unit} ({data.price_unit_type})</li>
                <li><strong>Description:</strong> {data.description || "N/A"}</li>
                <li><strong>Breed:</strong> {listing.breed || "N/A"}</li>
              </ul>
            </div>

            {swineToAdd.length > 0 ? (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Swine to be Added</h4>
                <ul className="text-sm text-sidebar-primary dark:text-gray-300 list-disc ml-5 space-y-1 max-h-[10rem] overflow-y-auto">
                  {swineToAdd.map((s) => (
                    <li key={s.id}>
                      {s.name || "Unnamed"} — Tag {s.tag_number} ({s.sex})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No new swine will be added.</p>
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirm(false);
                submit(e);
              }}
              disabled={processing}
            >
              {processing ? "Updating..." : "Confirm Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600 dark:text-red-400">
              Remove Swine
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to remove this swine from the listing?
              This action will restore its status to <span className="font-semibold">active</span>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmRemove}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Confirm Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>





      {/* 🧩 Simplified Manage Your Marketplace Listing Header */}
      <div className="w-full bg-gradient-to-br from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-8 md:py-10">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Manage Your Marketplace Listing
            </h1>
            <p className="text-green-100 text-sm md:text-base">
              {listing.title || "Marketplace Listing"}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-md 
              ${listing.status === "active"
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"}`}>
              {listing.status === "active" ? "● Active" : "○ Draft"}
            </span>
          </div>

          {/* Key Information in a Simple Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-green-200 text-xs uppercase tracking-wide mb-1">Category</p>
              <p className="text-white font-semibold">{listing.category || "N/A"}</p>
            </div>
            <div className="text-center">
              <p className="text-green-200 text-xs uppercase tracking-wide mb-1">Price</p>
              <p className="text-white font-semibold">₱{listing.price_per_unit} <span className="text-sm">({listing.price_unit_type})</span></p>
            </div>
            <div className="text-center">
              <p className="text-green-200 text-xs uppercase tracking-wide mb-1">Quantity</p>
              <p className="text-white font-semibold">{listing.available_quantity || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-green-200 text-xs uppercase tracking-wide mb-1">Breed</p>
              <p className="text-white font-semibold truncate">{listing.breed || "N/A"}</p>
            </div>
          </div>

          {/* Address Line */}
          <div className="mt-6 text-center max-w-2xl mx-auto">
            <p className="text-green-100 text-sm">
              📍 {listing.full_address || formatAddress(listing)}
            </p>
          </div>
        </div>
      </div>




      <div className="p-0 sm:p-2 md:p-6 lg:px-24 m-0">
        <div className="w-full bg-sidebar-primary/10 dark:bg-sidebar-primary/20 p-1 lg:p-6 md:p-4 sm:p-2 rounded-xl shadow-md border border-sidebar-primary/10 dark:border-sidebar-primary/30">
          <h2 className="text-2xl sm:text-xl font-semibold mb-6 text-sidebar-primary dark:text-green-400">
            Listing Swine
          </h2>

          {listing.listing_swine && listing.listing_swine.length > 0 ? (
            <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 max-h-[400px] overflow-y-auto">
              <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300 border-collapse">
                <thead className="bg-sidebar-primary text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Breed</th>
                    <th className="px-4 py-3 font-medium">Sex</th>
                    <th className="px-4 py-3 font-medium">Age (days)</th>
                    <th className="px-4 py-3 font-medium">Tag No.</th>
                    <th className="px-4 py-3 font-medium">Weight</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Approval</th>
                    <th className="px-4 py-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {listing.listing_swine.map((swine: any, index: number) => {
                    const birthdate = swine.birthdate || swine.swine?.birthdate;
                    let ageInDays = "N/A";

                    if (birthdate) {
                      const birth = new Date(birthdate);
                      const now = new Date();
                      const diff = Math.floor(
                        (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
                      );
                      ageInDays = diff.toString();
                    }

                    return (
                      <tr
                        key={swine.id}
                        className={`${index % 2 === 0
                            ? "bg-white dark:bg-gray-900/40"
                            : "bg-gray-50 dark:bg-gray-800/40"
                          } hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors`}
                      >
                        <td className="px-4 py-3">{swine.swine?.id}</td>
                        <td className="px-4 py-3 truncate max-w-[150px]">
                          {swine.breed || swine.swine?.cuztom_breed || "N/A"}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {swine.sex || swine.swine?.sex || "N/A"}
                        </td>
                        <td className="px-4 py-3">{ageInDays}</td>
                        <td className="px-4 py-3">{swine.swine?.tag_number || "N/A"}</td>
                        <td className="px-4 py-3">
  {swine.estimated_weight ? (
    <span>{swine.estimated_weight} estimated</span>
  ) : swine.scaled_weight ? (
    <span >{swine.scaled_weight} <span className="text-primary italic">scaled</span></span>
  ) : (
<button
  onClick={() => {
    Inertia.visit(
      `/swine/${swine.swine?.id}?focusWeight=true#listing-${swine.id}`,
      { preserveScroll: true }
    );
  }}
  className="px-2 py-1 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition"
>
  Fill Weight
</button>





  )}
</td>

                        <td className="px-4 py-3 capitalize">
                          {swine.status || swine.swine?.status || "N/A"}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {swine.approval_status || swine.swine?.approval_status || "pending"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleOpenModal(swine.swine?.id)}
                            className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 italic mt-4">
              No swine found in this listing.
            </p>
          )}

        </div>
      </div>
      <div className="flex justify-center w-[95%] mx-auto mt-6">
        <Separator className="mx-10" />
      </div>




      {/* Existing Form Below */}
      <div className="p-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* ... your existing left and right columns ... */}

        {/* Left — Marketplace Card Preview */}
        <div ref={tabContentRef}>
              <h2 className="text-lg font-bold mb-2">Listing Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 m-5 lg:grid-cols-5 gap-5">
    <div className="">
      
</div>


          <Card className="rounded-2xl overflow-hidden hover:shadow-lg lg:col-span-3 dark:shadow-primary transition-shadow duration-200 p-0">
            {/* 🖼 Image on top with overlay info */}
            <div className="w-full relative">
               {imagePreview ? (
    <img
      src={imagePreview}
      alt="Listing Preview"
      className="w-full h-48 object-cover block"
    />
  ) : (
    <div className="w-full h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <PigIcon className="w-12 h-12 text-green-400 mx-auto mb-2" />
        <span className="text-green-600 text-sm font-medium">No image uploaded</span>
      </div>
    </div>
  )}

              {/* 🔹 Overlay info (Sex & Quantity) */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-white bg-black/40 px-3 py-1 backdrop-blur-sm">
                <div>
                  <span className="text-gray-100/50 mr-2">Available</span>
                  <span>{listing.available_quantity}</span>
                </div>
              </div>
            </div>

            {/* 📄 Content */}
            <div className="p-3 pt-0 flex flex-col justify-between h-full">


              {/* Category + Breed */}
              <div className="flex items-end justify-between text-sm text-gray-700 mb-1">
                <span className="font-medium font-semibold text-green-900 dark:text-gray-500 capitalize">{data.category}</span>
                {listing.breed && (
                  <div className="flex items-center justify-between bg-green-900 text-white px-2 rounded-lg  italic text-[12px] overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="flex-1">{listing.breed}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm  dark:text-white line-clamp-2 mb-2">
                {data.description}
              </p>

              {/* Price */}
              <div className=" mb-1">

                <span className="text-primary dark:text-green-400 font-semibold text-base">   ₱{Number(data.price_per_unit).toLocaleString()}{" "}</span>
                <span className="text-gray-400 text-[10px] sm:text-[12px] italic">
                  {data.price_unit_type?.replace(/_/g, " ")}
                </span>

              </div>

              {/* Address (Map icon + text) */}
              <div className="flex items-center text-xs text-gray-500 space-x-1 overflow-hidden">
                <MapPin className="w-4 h-4 text-sidebar-primary flex-shrink-0 text-gray-400" />
                <span className="truncate">{formatAddress(listing)}</span>
              </div>
            </div>
          </Card>
          </div>

         <div className="mt-6">
  <h3 className="text-sm text-gray-500 mb-2">List Images</h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
    {listing.gallery_images?.map((img, index) => (
      <div key={index} className="relative group">
       <img
  src={`/storage/${img}`}
  alt={`Gallery ${index + 1}`}
  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
  onClick={() => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }}
/>

         <button
    type="button"
    onClick={() =>
      listing.gallery_image_ids?.[index] && handleDeleteGallery(listing.gallery_image_ids[index])
    }
    className="absolute top-1 right-1 z-10 h-6 w-6 flex items-center justify-center hover:bg-red-600 bg-gray-600 text-white rounded-full opacity-30 group-hover:opacity-100 hover:scale-110 transition"
    title="Remove image"
  >
    ✕
  </button>
      </div>
    ))}
  </div>
  <input
  type="file"
  multiple
  onChange={handleGalleryChange}
/>
<Button onClick={submitGallery}>Upload Images</Button>

</div>

{lightboxOpen && images.length > 0 && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <button
      className="absolute top-4 right-4 text-white text-2xl"
      onClick={() => setLightboxOpen(false)}
    >
      ✕
    </button>

    <button
      className="absolute left-4 text-white text-3xl"
      onClick={() =>
        setCurrentIndex((prev) =>
          prev === 0 ? listing.gallery_images!.length - 1 : prev - 1
        )
      }
    >
      ‹
    </button>

    <img src={`/storage/${images[currentIndex]}`} alt={`Gallery ${currentIndex + 1}`} />


    <button
      className="absolute right-4 text-white text-3xl"
      onClick={() =>
        setCurrentIndex((prev) =>
          prev === listing.gallery_images!.length - 1 ? 0 : prev + 1
        )
      }
    >
      ›
    </button>
  </div>
)}

{/* Add this section inside your left panel (Listing Preview area) */}
{/* Vetmed Clearance Display Section - After the address section */}
{vetmedClearance && (
  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          Vetmed Clearance
        </span>
        {vetmedClearance.status === 'verified' && (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            Verified
          </Badge>
        )}
        {vetmedClearance.status === 'pending_review' && (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending Review
          </Badge>
        )}
        {vetmedClearance.status === 'needs_revision' && (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            Needs Revision
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Edit Button - Only show for pending_review or needs_revision */}
        {(vetmedClearance.status === 'pending_review' || vetmedClearance.status === 'needs_revision') && (
          <Link 
            href={`/vetmed-clearance/${vetmedClearance.id}/edit`}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3l4 4-7 7H10v-4l7-7z" />
              <path d="M4 20h16" />
            </svg>
            Edit
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewVetmedClearance}
          className="text-green-600 hover:text-green-700 hover:bg-green-100"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Clearance
        </Button>
      </div>
    </div>
    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
      Clearance Number: {vetmedClearance.clearance_number || 'N/A'}
    </p>
    {vetmedClearance.expiry_date && (
      <p className="text-xs text-gray-500 mt-1">
        Valid until: {new Date(vetmedClearance.expiry_date).toLocaleDateString()}
      </p>
    )}
    {vetmedClearance.status === 'needs_revision' && vetmedClearance.rejection_reason && (
      <p className="text-xs text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-900/20 p-1.5 rounded">
        <strong>Revision needed:</strong> {vetmedClearance.rejection_reason}
      </p>
    )}
  </div>
)}

{/* Dialog at the end of component */}
<ViewClearanceDialog
  clearance={selectedClearance}
  isOpen={isVetmedDialogOpen}
  onClose={() => {
    setIsVetmedDialogOpen(false);
    setSelectedClearance(null);
  }}
/>

        </div>

        {/* Right — Edit Form */}
        <div>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "swine"
                ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              onClick={() => handleTabClick("swine")}

            >
              Swine List
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "details"
                ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              onClick={() => handleTabClick("details")}
            >
              Edit Details
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "swine" && (
            <Card className="shadow-md border border-gray-200 dark:border-gray-800">
              <CardContent>
                <div className="flex justify-between items-center  " >
                  <label className="block font-medium text-gray-800 dark:text-gray-200">
                    Select Swines
                  </label>

                  {selectedCount > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Selected: {selectedCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleUncheckAll}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      >
                        Uncheck All
                      </button>
                    </div>
                  )}
                </div>
                {availableSwine.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-1 gap-3 max-h-[25rem] overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/50 p-1">
                      {availableSwine.map((s) => {
                        const isSelected = data.swine_ids.includes(s.id);
                        return (
                          <div
                            key={s.id}
                            onClick={() => toggleSwine(s.id)}
                            className={`grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${isSelected
                              ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600"
                              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSwine(s.id)}
                              className="w-4 h-4 ml-[2px] accent-green-600"
                            />
                            <div className="flex flex-col leading-tight">
                              <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {s.name || "Unnamed Swine"}
                              </span>
                              {s.tag_number && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  Tag: {s.tag_number}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        onClick={handleUpdateClick}
                        disabled={selectedCount === 0}
                        className={`transition-all ${selectedCount === 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : ""
                          }`}
                      >
                        {selectedCount === 0 ? "Select Swine First" : "Add Selected Swine"}
                      </Button>


                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No available swine to list.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "details" && (
            <Card className="shadow-md border border-gray-200 dark:border-gray-800">
              <CardContent>
                <form onSubmit={submit} className="space-y-4 pb-6">
                  {/* Title */}
                  <Input
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />
                  {errors.title && <p className="text-red-500">{errors.title}</p>}

                  {/* Category */}
                  <Select
                    value={data.category}
                    onValueChange={(value) => setData("category", value)}
                  >
                    <SelectTrigger className="w-full select-trigger">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breeder">Breeder</SelectItem>
                      <SelectItem value="piglet">Piglet</SelectItem>
                      <SelectItem value="fattening">Fattening</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500">{errors.category}</p>}

                  {/* Description */}
                  <Textarea
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                  />

                  {/* Price */}
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Price per unit"
                      value={data.price_per_unit}
                      onChange={(e) => setData("price_per_unit", e.target.value)}
                    />
                    <Select
                      value={data.price_unit_type}
                      onValueChange={(value) => setData("price_unit_type", value)}
                    >
                      <SelectTrigger className="w-full select-trigger">
                        <SelectValue placeholder="Select price unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per_head">Per Head</SelectItem>
                        <SelectItem value="per_kg">Per Kg</SelectItem>
                      </SelectContent>
                    </Select>

                    
                  </div>
                  {errors.price_per_unit && (
                    <p className="text-red-500">{errors.price_per_unit}</p>
                  )}
 <input type="file" onChange={handleImageChange} />
                  <div className="flex justify-between pt-4">
                    <Button type="submit" disabled={processing}>
                      {processing ? "Updating..." : "Update Listing"}
                    </Button>

                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
    
</AppLayout>
  );
};

export default EditListing;
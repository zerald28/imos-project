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
import { MapPin } from "lucide-react";
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

}

interface Props {

    listing: Listing;
    availableSwine: Swine[];
}


const EditListing: React.FC<Props> = ({ listing, availableSwine }) => {
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


    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const previousCount = listing.swine_ids?.length || 0;
        const newCount = data.swine_ids.length;
        const added = newCount - previousCount;

   

        put(`/marketplace/seller/${listing.id}`, {
           forceFormData: true, // this ensures files are sent properly
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
    route("seller.listings.removeSwine", {
      listingId: listing.id,
      swineId: selectedSwineId,
    }),
    {
      preserveScroll: true,
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: () => {
        alert("Failed to remove swine. Please try again.");
      },
    }
  );
};

const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>(listing.image ? `/storage/${listing.image}` : '');

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



    return (

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





           {/* 🧩 Marketplace Listing Header */}
 <div className="w-full bg-gradient-to-bl
       from-gray-700 to-sidebar-primary dark:bg-gradient-to-bl
       dark:from-sidebar-primary dark:to-gray-700 shadow-lg p-6 mb-6 text-white relative overflow-hidden">

  {/* Background Glow Effects */}


  {/* Centered Title */}
  <div className="relative z-10 text-center mb-8">
    <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
      🐖 {listing.title || "Marketplace Listing Overview"}
    </h2>
    <p className="text-white/80 text-sm mt-2">
      A detailed summary of your current listing and farm location.
    </p>
  </div>

  {/* Status Badge */}
  <div className="flex justify-center mb-10">
    <span
      className={`px-5 py-2 rounded-full text-sm font-semibold shadow-lg 
        ${listing.status === "active"
          ? "bg-green-500/90 text-white"
          : "bg-gray-400/80 text-gray-100"}`}
    >
      {listing.status === "active" ? "🟢 Active Listing" : "⚪ Draft Listing"}
    </span>
  </div>

  {/* Quick Info Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
    {/* Example Info Card */}
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Category</p>
      <h4 className="text-xl font-bold mt-1">{listing.category || "N/A"}</h4>
    </div>

    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Price</p>
      <h4 className="text-xl font-bold mt-1">₱{listing.price_per_unit} ({listing.price_unit_type})</h4>
    </div>

    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Available Quantity</p>
      <h4 className="text-xl font-bold mt-1">{listing.available_quantity || 0}</h4>
    </div>

    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Sex Summary</p>
      <h4 className="text-xl font-bold mt-1">{listing.sex_summary || "N/A"}</h4>
    </div>

    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Breed</p>
      <h4 className="text-xl font-bold mt-1">{listing.breed || "N/A"}</h4>
    </div>

    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition">
      <p className="text-sm text-lime-200 font-semibold">Age Range</p>
      <h4 className="text-xl font-bold mt-1">{listing.age_range || "N/A"}</h4>
    </div>


    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-6">
      <p className="text-sm text-lime-200 font-semibold">Full Address</p>
      <h4 className="text-xl font-bold mt-1">{listing.full_address || "N/A"}</h4>
    </div>
  </div>

  {/* Management Section */}
  <div className="mt-10">
    <div className="bg-gradient-to-r from-gray-800/90 to-green-700/90 rounded-2xl p-6 border border-gray-600 shadow-lg">
      <h3 className="text-2xl font-bold mb-2">⚙️ Manage Your Marketplace Listing</h3>
      <p className="text-sm text-white/90">
        You’re one step away from turning your farm efforts into real profit.
        Update your listing details or manage your swine selections below.
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
              className={`${
                index % 2 === 0
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
                {swine.estimated_weight || swine.scaled_weight || "N/A"}
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
                    <Card className="shadow-md py-0 border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="relative">
  <img
    src={imagePreview || "/placeholder.jpg"} 
    alt="Listing Preview"
    className="h-48 w-full object-cover rounded-t-md"
  />

  {/* Horizontal overlay */}
  <div className="absolute top-0 left-0 right-0 bg-sidebar-primary/50 text-white text-xs flex justify-between items-center px-3 py-1">
    {/* Left group: sex, breed, age */}
    <div className="flex space-x-3">
      <span>{listing.sex_summary || "Sex: N/A"}</span>
      <span>{listing.breed || "Breed: N/A"}</span>
      <span>{listing.age_range || "Age: N/A"}</span>
    </div>

    {/* Right group: location */}
    <div className="flex items-center space-x-1">
      <MapPin className="w-4 h-4" />
      <span>{listing.barangay?.name || "Location: N/A"}</span>
    </div>
  </div>
</div>


                        <CardContent className="space-y-0 pt-0 px-4 pb-4">
                            <p className="text-sm text-gray-500">{data.category}</p>
                            <p className="text-gray-700 dark:text-gray-200 leading-snug line-clamp-3">
                                {data.description || "No description provided."}
                            </p>
                            <p className="pt-1 font-medium text-primary dark:text-green-400">
                                ₱{data.price_per_unit} ({data.price_unit_type})
                            </p>
                        </CardContent>
                    </Card>

                 <div className="mb-4 p-4">
  <label className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
    Listing Image
  </label>


<input type="file" onChange={handleImageChange} />



</div>


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
  className={`transition-all ${
    selectedCount === 0
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
        
    );
};

export default EditListing;

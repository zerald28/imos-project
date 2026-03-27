import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import AssignGroupModal from "./assign_group_modal";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarPlus2, Ellipsis, Group, Store, BadgeCheck, AlertCircle, ExternalLink } from "lucide-react";
import { Plus, MoreVertical, Mars, Venus, Trash2, Pencil, Banknote } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"
import { BanknoteArrowDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SwineFormModal from "../swineform";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios'; // Add axios import

type Swine = {
  id: number;
  tag_number: string;
  sex: "male" | "female";
  status: string;
  stage: string;
  breed?: { name: string } | null;
  cuztom_breed?: string | null;
  purpose: string;
  category: string;
  birthdate: string;
  weight?: string;
  description?: string;
  breed_id?: string | null;
  created_at: string;
};

type Group = {
  id: number;
  name: string;
  description?: string;
  group_type: string;
};

type SwineWithGroups = Swine & {
  assignedGroups: Group[];
  availableGroups: Group[];
};

type Props = {
  swine: SwineWithGroups;
  breeds: { id: number; name: string }[];
  groups: Group[];
  selected: boolean;
  onToggle: (id: number, checked: boolean) => void;
  showCheckbox: boolean;
};

export default function SwineCard({ swine, breeds, groups, selected, onToggle, showCheckbox }: Props) {
  const [selectedSwine, setSelectedSwine] = useState<Swine | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [showListingWarning, setShowListingWarning] = useState(false);
  const [isFindingListing, setIsFindingListing] = useState(false); // Add loading state

  const handleEdit = (swine: Swine) => {
    setSelectedSwine(swine);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedSwine(null);
  };

  const calculateAgeInDays = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const diffTime = today.getTime() - birthDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatText = (text: string) => {
    if (!text) return "Update";
    return text
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const ageInDays = calculateAgeInDays(swine.birthdate);
  const isAvailable = swine.status.toLowerCase() === 'available';

  // Determine which image to show based on category
  const getCategoryImage = () => {
    const categoryLower = swine.category.toLowerCase();
    
    if (categoryLower.includes('piglet') || categoryLower.includes('weanling')) {
      return '/piglet.png';
    } else if (categoryLower.includes('boar') || categoryLower.includes('sow')) {
      return '/boar.png';
    } else if (categoryLower.includes('barrow') || categoryLower.includes('gilt') || categoryLower.includes('fatten')) {
      return '/fatten.png';
    }
    // Default image if no match
    return '/boar.png';
  };

  const categoryImage = getCategoryImage();

  const handleDeleteClick = () => {
    const createdAt = new Date(swine.created_at);
    const now = new Date();
    const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      router.delete(`/swine-management/swine/${swine.id}`, {
        onSuccess: () => {
          toast.success(`Swine ${swine.tag_number || swine.id} has been deleted.`);
        },
        onError: () => {
          toast.error("Failed to delete swine.");
        },
      });
    } else {
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    router.delete(`/swine-management/swine/${swine.id}`, {
      onSuccess: () => {
        toast.success(`Swine ${swine.tag_number || swine.id} deleted.`);
        setShowDeleteDialog(false);
      },
      onError: () => {
        toast.error("Failed to delete swine.");
        setShowDeleteDialog(false);
      },
    });
  };

  // Handle Create Listing click
  const handleCreateListing = () => {
    if (isAvailable) {
      // Show warning dialog instead of routing
      setShowListingWarning(true);
    } else {
      // Route to create listing page
      router.get("/marketplace/seller/create", {
        swine_ids: [swine.id]
      });
    }
  };

  // Handle Go to Listing click - NEW FUNCTION
  const handleGoToListing = async () => {
    setIsFindingListing(true);
    
    try {
      const response = await axios.get(`/marketplace/seller/find-by-swine/${swine.id}`);
      
      if (response.data.success && response.data.listing_id) {
        // Route to edit page with the listing ID
        router.get(`/marketplace/seller/${response.data.listing_id}/edit`);
      } else {
        toast.error("No active listing found for this swine.");
      }
    } catch (error) {
      console.error("Error finding listing:", error);
      toast.error("Failed to find the listing. Please try again.");
    } finally {
      setIsFindingListing(false);
    }
  };

  // Function to navigate anyway if user confirms
  const confirmCreateListing = () => {
    setShowListingWarning(false);
    router.get("/marketplace/seller/create", {
      swine_ids: [swine.id]
    });
  };

  return (
    <div className="w-full">
      <div className="w-full @[925px]:w-4/5 @[925px]:mx-auto mb-4">
        <Card className="w-full bg-white shadow-md rounded-xl p-0 overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-0 bg-transparent">
            {/* Card Layout with Image and Content */}
            <div className="flex flex-col @[640px]:flex-row">
              {/* Image Section - Smaller on mobile */}
              <div className="relative @[640px]:w-2/5 @[768px]:w-2/5 bg-gradient-to-b from-gray-50 to-gray-100 p-1 @[640px]:p-0 flex items-center justify-center">
                <div className="relative w-full h-40 @[400px]:h-48 @[640px]:h-56 @[640px]:h-auto aspect-square overflow-hidden rounded-lg @[640px]:rounded-xl">
                  <img 
                    src={categoryImage} 
                    alt={`${swine.category} swine`}
                    className="w-full h-full object-contain object-center p-0 bg-white rounded-lg @[640px]:rounded-xl"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.src = '/boar.png';
                    }}
                  />
                  {/* Category Badge over Image */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {formatText(swine.category)}
                  </div>
                </div>
              </div>

              {/* Content Section - More compact on mobile */}
              <div className="flex-1">
                {/* Header Section with Status - Smaller padding on mobile */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 @[640px]:p-4 relative">
                  {/* Status Badge - Smaller on mobile */}
                  <div className="absolute top-2 @[640px]:top-3 right-2 @[640px]:right-3 flex items-center gap-1">
                    {isAvailable && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 @[640px]:px-3 @[640px]:py-1 rounded-full text-xs @[640px]:text-sm font-medium">
                        <Store className="h-3 w-3 @[640px]:h-4 @[640px]:w-4" />
                        <span className="hidden @[400px]:inline">Available</span>
                      </div>
                    )}
                    
                    {showCheckbox && (
                      <Checkbox
                        checked={selected}
                        onCheckedChange={(val) => onToggle(swine.id, !!val)}
                        className="h-4 w-4 @[640px]:h-5 @[640px]:w-5 data-[state=checked]:bg-white data-[state=checked]:text-green-700 border-2 border-white ml-1 @[640px]:ml-2"
                      />
                    )}
                  </div>

                  {/* Tag Number and Basic Info - Smaller text on mobile */}
                  <div className="flex items-start gap-2 @[640px]:gap-3 mb-2 @[640px]:mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl @[400px]:text-2xl @[759px]:text-3xl font-bold truncate">
                          {swine.tag_number?.trim() || `Swine ${swine.id}`}
                        </h2>
                        {swine.sex === "male" ? (
                          <Mars className="h-4 w-4 @[640px]:h-6 @[640px]:w-6 text-blue-200" />
                        ) : (
                          <Venus className="h-4 w-4 @[640px]:h-6 @[640px]:w-6 text-pink-200" />
                        )}
                      </div>
                      <div className="flex items-center flex-wrap gap-2 text-xs @[640px]:text-sm text-green-100">
                        <span className="font-medium whitespace-nowrap">
                          {ageInDays > 0 ? `${ageInDays} ${ageInDays === 1 ? 'day' : 'days'}` : 'Newborn'}
                        </span>
                        <span className="px-1.5 py-0.5 @[640px]:px-2 @[640px]:py-1 bg-white/20 rounded-md whitespace-nowrap">
                          {formatText(swine.stage)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Section - Compact on mobile */}
                <div className="p-3 @[640px]:p-4">
                  {/* Quick Stats Grid - 2 columns on mobile, 4 on desktop */}
                  <div className="grid grid-cols-2 @[640px]:grid-cols-4 gap-2 @[640px]:gap-3 mb-3 @[640px]:mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Breed</p>
                      <p className="font-semibold text-xs @[640px]:text-sm truncate">
                        {swine.breed?.name
                          ? formatText(swine.breed.name)
                          : swine.cuztom_breed?.trim()
                          ? formatText(swine.cuztom_breed)
                          : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Purpose</p>
                      <p className="font-semibold text-xs @[640px]:text-sm truncate">{formatText(swine.purpose)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="font-semibold text-xs @[640px]:text-sm flex items-center gap-1 truncate">
                        {formatText(swine.status)}
                        {isAvailable && <Store className="h-3 w-3 text-green-600" />}
                      </p>
                    </div>
                    {swine.weight && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Weight</p>
                        <p className="font-semibold text-xs @[640px]:text-sm">{swine.weight} kg</p>
                      </div>
                    )}
                  </div>

                  {/* Groups Info with Actions Row - Combined on mobile */}
                  <div className="flex justify-between items-start @[640px]:items-center mb-3 @[640px]:mb-4">
                    {/* Groups Section */}
                    <div className="flex-1">
                      {swine.assignedGroups.length > 0 ? (
                        <>
                          <p className="text-xs text-gray-500 mb-1">Assigned Groups</p>
                          <div className="flex flex-wrap gap-1">
                            {swine.assignedGroups.slice(0, 2).map((group) => (
                              <span 
                                key={group.id}
                                className="px-1.5 py-0.5 @[640px]:px-2 @[640px]:py-1 bg-blue-100 text-blue-700 text-xs rounded truncate max-w-[120px]"
                                title={group.name}
                              >
                                {group.name}
                              </span>
                            ))}
                            {swine.assignedGroups.length > 2 && (
                              <span className="px-1.5 py-0.5 @[640px]:px-2 @[640px]:py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{swine.assignedGroups.length - 2} more
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">No groups assigned</p>
                      )}
                    </div>

                  {/* Action Menu - Now in the same row as groups on mobile */}
<div className="ml-2 @[640px]:ml-4 flex-shrink-0">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="p-1.5 @[640px]:p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Ellipsis className="h-4 w-4 @[640px]:h-5 @[640px]:w-5 text-gray-600" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48 @[640px]:w-56 bg-white shadow-xl rounded-lg border">
      {/* Go to Listing option - only shown when swine is available */}
      {isAvailable && (
        <DropdownMenuItem
          onClick={handleGoToListing}
          disabled={isFindingListing}
          className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm"
        >
          <ExternalLink className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-blue-500" />
          <span>
            {isFindingListing ? "Finding listing..." : "Go to Listing"}
          </span>
        </DropdownMenuItem>
      )}
      
      {/* Create New Listing - only shown when swine is NOT available */}
      {!isAvailable && (
        <DropdownMenuItem
          onClick={handleCreateListing}
          className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm"
        >
          <Store className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-orange-500" />
          <span>Sale in Marketplace</span>
        </DropdownMenuItem>
      )}
      
      {/* Revenue option - always shown */}
      <DropdownMenuItem 
        onClick={() => {
          router.get(
            `/swine-management/financial-performance?date_range=all&id=${swine.id}&view=individual`
          );
        }}
        className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm"
      >
        <Banknote className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-green-500" />
        <span>Revenue</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm">
        <BanknoteArrowDown className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-orange-500" />
        <span>Add Expense</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm">
        <CalendarPlus2 className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-yellow-500" />
        <span>Schedule</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setIsAssignOpen(true)}
        className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm"
      >
        <Group className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-blue-500" />
        <span>Assign Group</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => handleEdit(swine)}
        className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm"
      >
        <Pencil className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2 text-green-500" />
        <span>Edit Details</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={handleDeleteClick}
        className="cursor-pointer py-2 @[640px]:py-2.5 text-xs @[640px]:text-sm text-red-600"
      >
        <Trash2 className="h-3 w-3 @[640px]:h-4 @[640px]:w-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning Dialog for creating listing when already available */}
      <Dialog open={showListingWarning} onOpenChange={setShowListingWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Swine Already Available
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>{swine.tag_number?.trim() || `Swine ${swine.id}`}</strong> is already marked as <span className="text-green-600 font-semibold">"Available"</span> in the marketplace.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
              <p className="text-sm text-yellow-700">
                Are you sure you want to create another listing for this swine?
                This might create duplicate listings in the marketplace.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowListingWarning(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreateListing} className="bg-yellow-500 hover:bg-yellow-600">
              Continue Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modals */}
      {selectedSwine && (
        <SwineFormModal
          swine={selectedSwine}
          breeds={breeds}
          open={isOpen}
          onClose={handleClose}
          onUpdate={(updatedData) => {
            console.log("Updated:", updatedData);
          }}
        />
      )}

      <AssignGroupModal
        assignedGroups={swine.assignedGroups}
        availableGroups={swine.availableGroups}
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        swineId={swine.id}
        groups={groups}
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Swine</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{swine.tag_number || `Swine ${swine.id}`}</strong>?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
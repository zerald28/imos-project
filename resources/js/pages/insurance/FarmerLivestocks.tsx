import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import AppLayout from "@/layouts/admin-layout";
import { Ellipsis, MessageCircleMore, Trash2 } from "lucide-react";
import PermissionWarningModal from "./permission-warning-modal";

interface Animal {
  id: number;
  breed?: string;
  age?: number;
  ear_mark?: string;
  sex?: string;
  cover_type?: string | null;
  veterinary_report_id?: number | null;
  veterinarian_name?: string;
  veterinarian_id?: number | null;
}

interface Farmer {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  username: string;
  profile?: string | null;
  barangay: string;
  contact: string;
}

interface Props {
  farmer: Farmer;
  animals: Animal[];
  veterinaryRequests?: any[];
  currentUserId: number;
}

// Helper function to get initials from name
const getInitials = (firstname: string, lastname: string): string => {
  const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : '';
  const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

// Helper function to generate a consistent color based on name
const getColorFromName = (name: string): string => {
  const colors = [
    'bg-red-500 dark:bg-red-600',
    'bg-blue-500 dark:bg-blue-600',
    'bg-green-500 dark:bg-green-600',
    'bg-yellow-500 dark:bg-yellow-600',
    'bg-purple-500 dark:bg-purple-600',
    'bg-pink-500 dark:bg-pink-600',
    'bg-indigo-500 dark:bg-indigo-600',
    'bg-teal-500 dark:bg-teal-600',
    'bg-orange-500 dark:bg-orange-600',
    'bg-cyan-500 dark:bg-cyan-600',
  ];
  
  // Simple hash function to get consistent color
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Profile Component with Fallback
const ProfileDisplay: React.FC<{ farmer: Farmer; size?: number }> = ({ farmer, size = 80 }) => {
  const [imageError, setImageError] = useState(false);
  const fullName = `${farmer.firstname} ${farmer.lastname}`;
  const initials = getInitials(farmer.firstname, farmer.lastname);
  const bgColor = getColorFromName(fullName);

  // If no profile or image failed to load, show initials fallback
  if (!farmer.profile || imageError) {
    return (
      <div 
        className={`${bgColor} rounded-full flex items-center justify-center text-white font-bold border border-gray-200 dark:border-gray-700`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials || '?'}
      </div>
    );
  }

  // Try to load the image
  return (
    <img
      src={`/storage/${farmer.profile}`}
      alt={fullName}
      className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700"
      onError={() => setImageError(true)}
    />
  );
};

const FarmerLivestocks: React.FC<Props> = ({ farmer, animals, veterinaryRequests, currentUserId }) => {
  // Permission warning modal state
  const [permissionModal, setPermissionModal] = useState<{
    isOpen: boolean;
    action: string;
    animal: Animal | null;
    pendingAction: (() => void) | null;
  }>({
    isOpen: false,
    action: "",
    animal: null,
    pendingAction: null,
  });

  // Function to check if current user is the assigned veterinarian
  const isAssignedVeterinarian = (animal: Animal): boolean => {
    // If no veterinarian is assigned, allow action
    if (!animal.veterinarian_id) return true;
    
    // Check if current user ID matches the assigned veterinarian ID
    return currentUserId === animal.veterinarian_id;
  };

  // Wrapper function for actions that need permission check
  const withPermissionCheck = (
    action: string,
    animal: Animal,
    callback: () => void
  ) => {
    if (isAssignedVeterinarian(animal)) {
      // If user is the assigned vet, proceed directly
      callback();
    } else {
      // Show warning modal
      setPermissionModal({
        isOpen: true,
        action,
        animal,
        pendingAction: () => callback(),
      });
    }
  };

  // Color palette for report groups with dark mode support
  const colorPalette = [
    "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-800",
    "bg-blue-50 border-blue-300 dark:bg-blue-950/30 dark:border-blue-800",
    "bg-green-50 border-green-300 dark:bg-green-950/30 dark:border-green-800",
    "bg-yellow-50 border-yellow-300 dark:bg-yellow-950/30 dark:border-yellow-800",
    "bg-purple-50 border-purple-300 dark:bg-purple-950/30 dark:border-purple-800",
    "bg-pink-50 border-pink-300 dark:bg-pink-950/30 dark:border-pink-800",
    "bg-orange-50 border-orange-300 dark:bg-orange-950/30 dark:border-orange-800",
  ];

  const reportColors: Record<number, string> = {};
  let colorIndex = 0;

  // Count animals per veterinary_report_id
  const reportCounts: Record<number, number> = {};
  animals.forEach((animal) => {
    const id = animal.veterinary_report_id;
    if (id) {
      reportCounts[id] = (reportCounts[id] || 0) + 1;
      if (!reportColors[id]) {
        reportColors[id] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      }
    }
  });

  const detachReport = async (id: number) => {
    if (!confirm("Remove this animal from the veterinary disease report?")) return;

    try {
      await axios.delete(`/veterinary-report/detach/${id}`);
      toast.success("Animal removed from veterinary report.");
      router.reload({ only: ["animals"] });
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove the veterinary report.");
    }
  };

  const [activeTab, setActiveTab] = useState<"requests" | "livestock">("requests");
  
  const goToConversation = (conversationId: number) => {
    router.visit(`/messenger?conversation=${conversationId}`);
  };

  const messageFarmerDirect = async () => {
    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: farmer.id,
      });

      const conversation = res.data.data;
      goToConversation(conversation.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to start conversation.");
    }
  };

  const deleteVeterinaryRequest = async (id: number, event: React.MouseEvent) => {
    event.preventDefault();
    
    if (!confirm("Are you sure you want to delete this veterinary request? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await axios.delete(`/veterinary-requests/${id}`);
      
      if (response.data.success) {
        toast.success(response.data.message || "Veterinary request deleted successfully.");
        router.reload({ only: ["veterinaryRequests"] });
      } else {
        toast.error(response.data.message || "Failed to delete veterinary request.");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to delete veterinary request. Please try again."
      );
    }
  };

  const updateVeterinaryRequestStatus = async (id: number, status: string) => {
    try {
      const response = await axios.put(`/veterinary-request/${id}/update-status`, {
        status: status
      });
      
      if (response.data.success) {
        toast.success(`Request marked as ${status.replace('_', ' ')}`);
        router.reload({ only: ["veterinaryRequests"] });
      }
    } catch (error: any) {
      console.error("Status update error:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to update request status. Please try again."
      );
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900">
        <h1 className="text-2xl font-semibold mb-4 dark:text-white">
          Farmers Livestock Disease Report
        </h1>
        
        {/* Header */}
        <div className="flex items-center mb-6 space-x-4">
          <ProfileDisplay farmer={farmer} size={80} />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold dark:text-white">
                {farmer.firstname} {farmer.middlename} {farmer.lastname}
              </h2>

              <button
                onClick={messageFarmerDirect}
                className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <MessageCircleMore size={18} />
              </button>
            </div>

            <p className="text-gray-500 dark:text-gray-400">@{farmer.username}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {farmer.barangay} <span className="text-xs ml-1">{farmer.contact}</span>
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => setActiveTab("requests")}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "requests"
                  ? "border-sidebar-primary/70 text-sidebar-primary/70 dark:border-sidebar-primary dark:text-sidebar-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Veterinary Requests
            </button>
            <button
              onClick={() => setActiveTab("livestock")}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "livestock"
                  ? "border-sidebar-primary/70 text-sidebar-primary/70 dark:border-sidebar-primary dark:text-sidebar-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Livestock List
            </button>
          </nav>
        </div>

        <div className="min-h-[400px]">
          {activeTab === "requests" && (
            <div className="mt-8 border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">Veterinary Requests</h2>

              {veterinaryRequests && veterinaryRequests.length > 0 && (
                <p className="text-sm font-medium mb-2 dark:text-gray-300">
                  Total Pending:{" "}
                  <span className="text-red-600 dark:text-red-400">
                    {veterinaryRequests.filter((r: any) => r.status === "pending").length}
                  </span>
                </p>
              )}

              {veterinaryRequests && veterinaryRequests.length > 0 ? (
                <ul className="space-y-2 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                  {veterinaryRequests.map((req: any) => (
                    <li
                      key={req.id}
                      className="border rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex justify-between items-start dark:border-gray-600"
                    >
                      <div className="space-y-1 flex-1">
                        <p className="dark:text-gray-300">
                          <span className="font-semibold dark:text-gray-200">Title:</span> {req.title}
                        </p>
                        <p className="dark:text-gray-300">
                          <span className="font-semibold dark:text-gray-200">Animal:</span>{" "}
                          {req.animal?.breed ?? "N/A"} (ID: {req.animal_id})
                        </p>
                        <p className="dark:text-gray-300">
                          <span className="font-semibold dark:text-gray-200">Type:</span> {req.request_type ?? "N/A"}
                        </p>
                        <p className="dark:text-gray-300">
                          <span className="font-semibold dark:text-gray-200">Disease:</span> {req.description ?? "N/A"}
                        </p>
                        <p className="dark:text-gray-300">
                          <span className="font-semibold dark:text-gray-200">Status:</span>{" "}
                          <span
                            className={`font-medium ${
                              req.status.toLowerCase() === "pending"
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {req.status}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Submitted at: {new Date(req.created_at).toLocaleString()}
                        </p>
                      </div>

                      {/* Dropdown actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                          {/* Create Report - only show if no report exists */}
                          {!req.animal?.veterinary_report_id ? (
                            <DropdownMenuItem className="dark:hover:bg-gray-700">
                              <Link
                                href={`/insurance/veterinary-form?animal_ids[]=${req.animal_id}`}
                                className="w-full block dark:text-gray-300"
                              >
                                Create Report
                              </Link>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="dark:hover:bg-gray-700">
                              <Link
                                href={`/veterinary-disease-report/${req.animal?.veterinary_report_id}/edit`}
                                className="w-full block text-blue-600 dark:text-blue-400"
                              >
                                Edit Existing Report
                              </Link>
                            </DropdownMenuItem>
                          )}

                          {/* Status Update Options */}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              updateVeterinaryRequestStatus(req.id, 'in_progress');
                            }}
                            disabled={req.status === 'in_progress'}
                            className={`dark:hover:bg-gray-700 ${req.status === 'in_progress' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'dark:text-gray-300'}`}
                          >
                            Mark as In Progress
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              updateVeterinaryRequestStatus(req.id, 'completed');
                            }}
                            disabled={req.status === 'completed'}
                            className={`dark:hover:bg-gray-700 ${req.status === 'completed' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'dark:text-gray-300'}`}
                          >
                            Mark as Completed
                          </DropdownMenuItem>

                          {/* Delete Request */}
                          <DropdownMenuItem
                            onClick={(e) => deleteVeterinaryRequest(req.id, e)}
                            className="text-red-600 dark:text-red-400 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/30 dark:hover:bg-gray-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No veterinary requests submitted yet.</p>
              )}
            </div>
          )}

          {activeTab === "livestock" && (
            <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">Livestock List</h2>

              <div className="max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                {animals.length > 0 ? (
                  <ul className="space-y-4">
                    {animals.map((animal) => {
                      const colorClass =
                        animal.veterinary_report_id
                          ? reportColors[animal.veterinary_report_id]
                          : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700";

                      return (
                        <li
                          key={animal.id}
                          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center 
                                     border rounded-xl shadow-sm p-4 hover:shadow-md transition ${colorClass}`}
                        >
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {animal.ear_mark || "N/A"}
                          </span>

                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm w-full sm:w-auto">
                            <p className="dark:text-gray-300">
                              <span className="font-semibold text-gray-700 dark:text-gray-200">Breed:</span>{" "}
                              {animal.breed || "N/A"}
                            </p>

                            <p className="dark:text-gray-300">
                              <span className="font-semibold text-gray-700 dark:text-gray-200">Age:</span>{" "}
                              {animal.age ?? "N/A"}
                            </p>

                            <p className="dark:text-gray-300">
                              <span className="font-semibold text-gray-700 dark:text-gray-200">Sex:</span>{" "}
                              {animal.sex || "N/A"}
                            </p>

                            <p className="dark:text-gray-300">
                              <span className="font-semibold text-gray-700 dark:text-gray-200">Cover:</span>{" "}
                              {animal.cover_type || "N/A"}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {/* Badge: report ID + total animals */}
                            {animal.veterinary_report_id && (
                              <span className="text-xs px-2 py-1 rounded-full bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-medium">
                                Report #{animal.veterinary_report_id} ({reportCounts[animal.veterinary_report_id]} animals)
                              </span>
                            )}

                            {animal.veterinary_report_id && (
                              <p className="text-xs dark:text-gray-400">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Veterinarian:</span>{" "}
                                {animal.veterinarian_name || "N/A"}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2 mt-3 sm:mt-0">
                            {/* Preview Button */}
                            {animal.veterinary_report_id && (
                              <button
                                onClick={() =>
                                  withPermissionCheck(
                                    "preview the veterinary report for",
                                    animal,
                                    () => {
                                      router.visit(`/veterinary-disease-report/${animal.veterinary_report_id}/view`);
                                    }
                                  )
                                }
                                className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-500 dark:bg-green-600 text-white hover:opacity-90 transition"
                              >
                                Preview
                              </button>
                            )}

                            {/* Edit Button with Permission Check */}
                            {animal.veterinary_report_id ? (
                              <button
                                onClick={() =>
                                  withPermissionCheck(
                                    "edit the veterinary report for",
                                    animal,
                                    () => {
                                      router.visit(`/veterinary-disease-report/${animal.veterinary_report_id}/edit`);
                                    }
                                  )
                                }
                                className="px-3 py-1.5 text-sm font-medium rounded-full 
                                         bg-sidebar-primary text-white hover:opacity-90 transition"
                              >
                                Edit
                              </button>
                            ) : (
                              <span className="px-3 py-1.5 text-xs font-medium rounded-full 
                                             bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                No Report
                              </span>
                            )}

                            {/* Dropdown for actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="text-gray-600/90 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded">
                                <Ellipsis />
                              </DropdownMenuTrigger>

                              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                                {/* Create Report with Permission Check */}
                                {!animal.veterinary_report_id && (
                                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                                    <button
                                      onClick={() =>
                                        withPermissionCheck(
                                          "create a veterinary report for",
                                          animal,
                                          () => {
                                            router.visit(`/insurance/veterinary-form?animal_ids[]=${animal.id}`);
                                          }
                                        )
                                      }
                                      className="w-full text-left dark:text-gray-300"
                                    >
                                      Create Report
                                    </button>
                                  </DropdownMenuItem>
                                )}

                                {/* Preview Report with Permission Check */}
                                {animal.veterinary_report_id && (
                                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                                    <button
                                      onClick={() =>
                                        withPermissionCheck(
                                          "preview the veterinary report for",
                                          animal,
                                          () => {
                                            router.visit(`/veterinary-disease-report/${animal.veterinary_report_id}/view`);
                                          }
                                        )
                                      }
                                      className="w-full text-left dark:text-gray-300"
                                    >
                                      Preview Report
                                    </button>
                                  </DropdownMenuItem>
                                )}

                                {/* Edit Report in Dropdown with Permission Check */}
                                {animal.veterinary_report_id && (
                                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                                    <button
                                      onClick={() =>
                                        withPermissionCheck(
                                          "edit the veterinary report for",
                                          animal,
                                          () => {
                                            router.visit(`/veterinary-disease-report/${animal.veterinary_report_id}/edit`);
                                          }
                                        )
                                      }
                                      className="w-full text-left dark:text-gray-300"
                                    >
                                      Edit Report
                                    </button>
                                  </DropdownMenuItem>
                                )}

                                {/* Remove veterinary report with Permission Check */}
                                {animal.veterinary_report_id && (
                                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                                    <button
                                      onClick={() =>
                                        withPermissionCheck(
                                          "remove the veterinary report from",
                                          animal,
                                          () => detachReport(animal.id)
                                        )
                                      }
                                      className="w-full text-left text-red-600 dark:text-red-400"
                                    >
                                      Remove Report
                                    </button>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No livestock animals found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permission Warning Modal */}
      <PermissionWarningModal
        isOpen={permissionModal.isOpen}
        onClose={() => setPermissionModal({ ...permissionModal, isOpen: false })}
        onProceed={() => {
          if (permissionModal.pendingAction) {
            permissionModal.pendingAction();
          }
        }}
        action={permissionModal.action}
        veterinarianName={permissionModal.animal?.veterinarian_name || "Unknown"}
        animalIdentifier={permissionModal.animal?.ear_mark || 
          `ID: ${permissionModal.animal?.id}`}
      />
    </AppLayout>
  );
};

export default FarmerLivestocks;
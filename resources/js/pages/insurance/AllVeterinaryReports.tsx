import React, { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import SignatureEditor from "./signatureEditor";
import axios from 'axios';
import { toast } from "sonner";
import { router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/admin-layout";
import { Ellipsis, MessageCircleMore, User, Phone, MapPin, Search, X } from "lucide-react";

interface Farmer {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  username: string;
  profile?: string;
  barangay: string;
  contact: string;
}

interface Animal {
  id: number;
  ear_mark?: string;
  veterinary_report_id?: number | null;
  veterinarian_name?: string;
  updated_at: string;
  
  // Farmer info
  farmer?: Farmer | null;
  
  // Signature fields
  proponent_signature_path?: string | null;
  signature_x?: number | null;
  signature_y?: number | null;
  signature_width?: number | null;
  signature_height?: number | null;
}

interface Props {
  animals: Animal[];
}

const AllVeterinaryReports: React.FC<Props> = ({ animals }) => {
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter animals based on search term
  const filteredAnimals = useMemo(() => {
    if (!searchTerm.trim()) return animals;
    
    const term = searchTerm.toLowerCase();
    return animals.filter(animal => {
      // Search in farmer info
      if (animal.farmer) {
        const farmer = animal.farmer;
        if (
          farmer.firstname?.toLowerCase().includes(term) ||
          farmer.lastname?.toLowerCase().includes(term) ||
          farmer.middlename?.toLowerCase().includes(term) ||
          farmer.barangay?.toLowerCase().includes(term) ||
          farmer.contact?.toLowerCase().includes(term)
        ) {
          return true;
        }
      }
      
      // Search in animal info
      if (
        animal.ear_mark?.toLowerCase().includes(term) ||
        animal.veterinarian_name?.toLowerCase().includes(term) ||
        animal.veterinary_report_id?.toString().includes(term)
      ) {
        return true;
      }
      
      return false;
    });
  }, [animals, searchTerm]);

  const [editingSignatureApp, setEditingSignatureApp] = useState<Animal | null>(null);

  const openSignatureEditor = async (app: Animal) => {
    try {
      const res = await axios.get(`/insurance/signature/${app.id}`);
      const signature = res.data;

      setEditingSignatureApp({
        ...app,
        signature_x: signature?.x ?? 0,
        signature_y: signature?.y ?? 0,
        signature_width: signature?.width ?? 200,
        signature_height: signature?.height ?? 80,
      });
    } catch (error) {
      console.error("Failed to fetch signature", error);
      // fallback to default
      setEditingSignatureApp({
        ...app,
        signature_x: 0,
        signature_y: 0,
        signature_width: 200,
        signature_height: 80,
      });
    }
  };

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

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const viewReport = async (reportId: number | null) => {
    if (!reportId) {
      toast.error("No veterinary report found for this animal.");
      return;
    }

    try {
      const res = await axios.get(`/api/veterinary-report/${reportId}`);
      setReportData(res.data);
      setShowReportModal(true);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load veterinary report.");
    }
  };

  const messageFarmerDirect = async (farmerId: number) => {
    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: farmerId,
      });

      const conversation = res.data.data;
      router.visit(`/messenger?conversation=${conversation.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to start conversation.");
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <AppLayout>
      <Head title="All Veterinary Reports" />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">All Veterinary Reports</h1>
            <p className="text-gray-500 mt-1">
              Showing {filteredAnimals.length} of {animals.length} animals with veterinary reports
              {searchTerm && (
                <span className="text-blue-600 ml-2">
                  (filtered by: "{searchTerm}")
                </span>
              )}
            </p>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <div className="relative w-80">
              
              <input
                type="text"
                placeholder="Search by name, ear mark, barangay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10  py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="text-xs text-gray-500 mt-1">
                Found {filteredAnimals.length} result{filteredAnimals.length !== 1 ? 's' : ''}
              </div>
            )}
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredAnimals.length > 0 ? (
              <ul className="space-y-4">
                {filteredAnimals.map((animal) => (
                  <li
                    key={animal.id}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-center 
                             border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition bg-white"
                  >
                    {/* Left Column: Farmer Info */}
                    {animal.farmer && (
                      <div className="flex items-center space-x-3 mb-3 lg:mb-0 lg:w-1/3">
                        {animal.farmer.profile ? (
                          <img
                            src={`/storage/${animal.farmer.profile}`}
                            alt={`${animal.farmer.firstname} ${animal.farmer.lastname}`}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <User size={20} className="text-gray-600" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <Link
                            href={`/insurance/farmers/${animal.farmer.id}/livestocks`}
                            className="font-medium hover:text-blue-600 block"
                          >
                            {animal.farmer.firstname} {animal.farmer.lastname}
                          </Link>
                          
                          <div className="flex flex-col space-y-1 text-xs text-gray-500 mt-1">
                            {animal.farmer.barangay && (
                              <div className="flex items-center">
                                <MapPin size={10} className="mr-1" />
                                {animal.farmer.barangay}
                              </div>
                            )}
                            {animal.farmer.contact && (
                              <div className="flex items-center">
                                <Phone size={10} className="mr-1" />
                                {animal.farmer.contact}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => messageFarmerDirect(animal.farmer!.id)}
                          className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          title="Message farmer"
                        >
                          <MessageCircleMore size={16} />
                        </button>
                      </div>
                    )}

                    {/* Middle Column: Animal & Report Info */}
                    <div className="flex-1 mb-3 lg:mb-0 lg:mx-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Ear Mark:</span>{" "}
                          <span className="font-medium">{animal.ear_mark || "N/A"}</span>
                        </div>
                        
                        {animal.veterinarian_name && (
                          <div>
                            <span className="font-semibold text-gray-700">Veterinarian:</span>{" "}
                            {animal.veterinarian_name}
                          </div>
                        )}
                        
                        {animal.veterinary_report_id && (
                          <div className="md:col-span-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                              Report #{animal.veterinary_report_id}
                            </span>
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(animal.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {/* Dropdown Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm text-gray-600/90 hover:bg-gray-100 p-1 rounded">
                          <Ellipsis size={20} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          {animal.veterinary_report_id ? (
                            <>
                              <DropdownMenuItem onClick={() => openSignatureEditor(animal)}>
                                Preview & Sign
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem>
                                <Link
                                  href={`/veterinary-disease-report/${animal.veterinary_report_id}/edit`}
                                  className="w-full block"
                                >
                                  Edit Report
                                </Link>
                              </DropdownMenuItem>
                              
                           
<DropdownMenuItem>
  <Link
    href={`/veterinary-report/${animal.veterinary_report_id}`}
    className="w-full block"
  >
    View Report Details
  </Link>
</DropdownMenuItem>
                              
                              <DropdownMenuItem>
                                <a 
                                  href={`/insurance/${animal.veterinary_report_id}/pdf/download`} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full block"
                                >
                                  Download PDF
                                </a>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem
                                onClick={() => detachReport(animal.id)}
                                className="text-red-600"
                              >
                                Remove From Report
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem>
                              <Link
                                href={`/insurance/veterinary-form?animal_ids[]=${animal.id}`}
                                className="w-full block"
                              >
                                Create New Report
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No matching results found" : "No Veterinary Reports Found"}
                </h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `No animals found matching "${searchTerm}". Try a different search term.`
                    : "No animals have veterinary reports yet."}
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Signature Editor Modal */}
        {editingSignatureApp && editingSignatureApp.proponent_signature_path && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Preview & Sign Veterinary Report #{editingSignatureApp.veterinary_report_id}
                  {editingSignatureApp.farmer && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      - {editingSignatureApp.farmer.firstname} {editingSignatureApp.farmer.lastname}
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setEditingSignatureApp(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <SignatureEditor
                signaturePath={`/storage/${editingSignatureApp.proponent_signature_path}`}
                initialX={(editingSignatureApp?.signature_x ?? 0) +80}
                initialY={(editingSignatureApp?.signature_y ?? 0) -490}
                initialWidth={editingSignatureApp.signature_width ?? 200}
                initialHeight={editingSignatureApp.signature_height ?? 80}
                pdfId={editingSignatureApp.veterinary_report_id!}
                onSave={(x, y, width, height) => {
                  axios.post(`/insurance/signature/${editingSignatureApp.veterinary_report_id}/saves`, {
                    x,
                    y,
                    width,
                    height,
                    veterinary_disease_report_id: editingSignatureApp.veterinary_report_id,
                  })
                  .then(() => {
                    window.open(`/insurance/${editingSignatureApp.veterinary_report_id}/pdf/downloadempty`, '_blank');
                    setEditingSignatureApp(null);
                  });
                }}
                onClose={() => setEditingSignatureApp(null)}
              />
            </div>
          </div>
        )}

        {/* Report Details Modal */}
        {showReportModal && reportData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Report Details</h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Veterinarian</label>
                    <p className="mt-1">{reportData.veterinarian_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1">{new Date(reportData.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {reportData.diagnosis && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Diagnosis</label>
                    <p className="mt-1">{reportData.diagnosis}</p>
                  </div>
                )}
                
                {reportData.treatment && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Treatment</label>
                    <p className="mt-1">{reportData.treatment}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <button
                    onClick={() => window.open(`/insurance/${reportData.id}/pdf/download`, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Download PDF Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AllVeterinaryReports;
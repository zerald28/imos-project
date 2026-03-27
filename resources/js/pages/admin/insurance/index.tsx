import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  MoreHorizontal,
  ChevronRight, 
  Search, 
  Eye, 
  FilePlus, 
  Pencil,
  File, 
  X, 
  Plus,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Stethoscope,
  AlertTriangle,
  Info,
  Download,
  Filter,
  Users,
  Shield,
  PiggyBank,
  FileSignature,
  BadgeCheck,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  User
} from "lucide-react";
import SignatureEditor from "./signatureEditor";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { PigIcon } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/admin-layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VeterinaryAuthModal from "./authmodal";

interface Animal {
  id: number;
  sex: string;
  age: string;
  breed: string;
  ear_mark: string;
  color: string;
  proof_of_ownership: string;
  has_disease_report?: boolean;
  disease_report_status?: string;
  disease_report_date?: string;
  veterinarian_name?: string;
  disease_diagnosis?: string;
  has_veterinary_request?: boolean;
  request_status?: string;
  request_title?: string;
  request_description?: string;
  request_created_at?: string;
  latest_veterinary_request?: any;
  full_disease_report?: any;
  veterinary_id?: number;
}

interface Application {
  id: number;
  farmer_id: number;
  farmer_name: string;
  proponent_user_id?: number;
  proponent_name: string;
  cover_type: string;
  number_of_heads: number;
  created_at: string;
  animals: Animal[];
  proponent_signature_path?: string;
  signature_x?: number;
  signature_y?: number;
  signature_width?: number;
  signature_height?: number;
}

export default function InsuranceIndex({ applications, filters, user, signature }: any) {
  const [search, setSearch] = useState(filters.search || "");
  const [editingSignatureApp, setEditingSignatureApp] = useState<Application | null>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [coverTypeFilter, setCoverTypeFilter] = useState<string>("all");
  
  // Modal states
  const [animalsModal, setAnimalsModal] = useState<{
    isOpen: boolean;
    application: Application | null;
  }>({
    isOpen: false,
    application: null,
  });
  
  const submitSearch = () => {
    router.get(route("admin.insurance.index"), { search, cover_type: coverTypeFilter }, { preserveState: true });
  };

  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<string | null>(null);
  const [newSignatureFile, setNewSignatureFile] = useState<File | null>(null);
  const [previewSignature, setPreviewSignature] = useState<string | null>(null);

  const openSignatureEditor = async (app: Application) => {
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
      setEditingSignatureApp({
        ...app,
        signature_x: 0,
        signature_y: 0,
        signature_width: 200,
        signature_height: 80,
      });
    }
  };

  const handleSignatureUpload = async () => {
    if (!newSignatureFile) return;

    const formData = new FormData();
    formData.append("signature", newSignatureFile);

    try {
      await axios.post("/imos_admin/profile/signature", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Signature successfully updated!");
      setOpenSignatureModal(false);
      router.reload();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload signature. Please try again.");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

const formatDateTime = (dateString: string) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

  const getRequestStatusIcon = (status: string | undefined, hasRequest: boolean | undefined) => {
    if (!hasRequest) return <AlertCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
    if (!status) return <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
    
    switch(status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />;
      case 'rejected':
      case 'denied':
        return <X className="w-4 h-4 text-red-600 dark:text-red-500" />;
      case 'in_progress':
      case 'processing':
        return <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
    }
  };

  const getRequestStatusText = (status: string | undefined, hasRequest: boolean | undefined) => {
    if (!hasRequest) return "No Request";
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    
    switch(status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'rejected':
      case 'cancelled':
      case 'denied':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'in_progress':
      case 'processing':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const showReportModal = (report: any) => {
    setSelectedReport(report);
  };

  const showRequestModal = (request: any) => {
    setSelectedRequest(request);
  };

  // Calculate statistics
  const totalAnimals = applications.data.reduce((sum: number, app: Application) => sum + app.number_of_heads, 0);
  const animalsWithReports = applications.data.reduce((sum: number, app: Application) => 
    sum + app.animals.filter((a: Animal) => a.has_disease_report).length, 0
  );
  const pendingRequests = applications.data.reduce((sum: number, app: Application) => 
    sum + app.animals.filter((a: Animal) => a.request_status === 'pending').length, 0
  );

  // Filter applications based on cover type
  const filteredApplications = coverTypeFilter === 'all' 
    ? applications.data 
    : applications.data.filter((app: Application) => app.cover_type === coverTypeFilter);

  // Veterinary authorization state
  const [veterinaryAuthModal, setVeterinaryAuthModal] = useState<{
    isOpen: boolean;
    reportData: any;
    pendingAction: 'view' | 'edit' | 'pdf' | null;
    reportId: number | null;
  }>({
    isOpen: false,
    reportData: null,
    pendingAction: null,
    reportId: null,
  });

  const handleVeterinaryAction = (
    reportData: any,
    action: 'view' | 'edit' | 'pdf',
    reportId: number
  ) => {
    if (user?.id === reportData.veterinary_id) {
      if (action === 'view') {
        showReportModal(reportData);
      } else if (action === 'edit') {
        router.get(`/veterinary-disease-report/${reportId}/edit`);
      } else if (action === 'pdf') {
        window.open(`/veterinary-disease-report/${reportId}/view`, '_blank');
      }
    } else {
      setVeterinaryAuthModal({
        isOpen: true,
        reportData,
        pendingAction: action,
        reportId,
      });
    }
  };

  const handleAuthContinue = () => {
    const { pendingAction, reportData, reportId } = veterinaryAuthModal;
    
    if (pendingAction === 'view') {
      showReportModal(reportData);
    } else if (pendingAction === 'edit') {
      router.get(`/veterinary-disease-report/${reportId}/edit`);
    } else if (pendingAction === 'pdf') {
      window.open(`/veterinary-disease-report/${reportId}/view`, '_blank');
    }
    
    setVeterinaryAuthModal({
      isOpen: false,
      reportData: null,
      pendingAction: null,
      reportId: null,
    });
  };

  const handleAuthStay = () => {
    setVeterinaryAuthModal({
      isOpen: false,
      reportData: null,
      pendingAction: null,
      reportId: null,
    });
  };

  // Animals Modal Component
  // Update the AnimalsModal component's DialogContent
const AnimalsModal = ({ 
  isOpen, 
  onClose, 
  application 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  application: Application | null;
}) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-auto overflow-y-auto dark:bg-gray-900 sm:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-white">
            <PigIcon className="w-5 h-5" />
            Animals for Application #{application.id}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            {application.farmer_name} • {application.cover_type} • {application.number_of_heads} total animals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-semibold text-lg dark:text-white">Animals ({application.animals.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.get(`/insurance/farmer/livestocks/${application.farmer_id}`)}
              className="gap-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FileText className="w-4 h-4" />
              View All Reports
            </Button>
          </div>

          {application.animals.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <PigIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No animals added to this application</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow className="dark:border-gray-700">
                      <TableHead className="dark:text-gray-300">Sex</TableHead>
                      <TableHead className="dark:text-gray-300">Age</TableHead>
                      <TableHead className="dark:text-gray-300">Breed</TableHead>
                      <TableHead className="dark:text-gray-300">Ear Mark</TableHead>
                      <TableHead className="dark:text-gray-300">Request Status</TableHead>
                      <TableHead className="dark:text-gray-300">Disease Report</TableHead>
                      <TableHead className="dark:text-gray-300">Veterinarian</TableHead>
                      <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {application.animals.map((animal) => (
                      <TableRow key={animal.id} className="dark:border-gray-700">
                        <TableCell className="dark:text-gray-300">{animal.sex}</TableCell>
                        <TableCell className="dark:text-gray-300">{animal.age}</TableCell>
                        <TableCell className="dark:text-gray-300">{animal.breed}</TableCell>
                        <TableCell className="dark:text-gray-300">{animal.ear_mark}</TableCell>

                        {/* Request Status */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRequestStatusIcon(animal.request_status, animal.has_veterinary_request)}
                            <span className="text-sm dark:text-gray-300">
                              {getRequestStatusText(animal.request_status, animal.has_veterinary_request)}
                            </span>
                          </div>
                        </TableCell>

                        {/* Disease Report */}
                        <TableCell>
                          {animal.has_disease_report ? (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">Reported</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(animal.disease_report_date)}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm">No Report</span>
                            </div>
                          )}
                        </TableCell>

                        <TableCell>
                          {animal.veterinarian_name ? (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium dark:text-gray-300">{animal.veterinarian_name}</span>
                              {user?.id === animal.veterinary_id && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                  You
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 dark:hover:bg-gray-800">
                                <MoreHorizontal className="w-4 h-4 dark:text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-900 dark:border-gray-700">
                              {!animal.has_disease_report ? (
                                <>
                                  <DropdownMenuItem asChild className="dark:hover:bg-gray-800">
                                    <Link
                                      href={`/insurance/veterinary-form?animal_ids[]=${animal.id}&application_id=${application.id}`}
                                      className="w-full flex items-center gap-2 text-green-600 font-medium dark:text-green-400"
                                    >
                                      <FilePlus className="w-4 h-4" />
                                      Create Disease Report
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="dark:border-gray-700" />
                                </>
                              ) : null}

                              {animal.has_disease_report && animal.full_disease_report ? (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleVeterinaryAction(
                                      animal.full_disease_report,
                                      'view',
                                      animal.full_disease_report.id
                                    )}
                                    className="dark:hover:bg-gray-800"
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Disease Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleVeterinaryAction(
                                      animal.full_disease_report,
                                      'edit',
                                      animal.full_disease_report.id
                                    )}
                                    className="text-amber-600 dark:text-amber-400 dark:hover:bg-gray-800"
                                  >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit Disease Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleVeterinaryAction(
                                      animal.full_disease_report,
                                      'pdf',
                                      animal.full_disease_report.id
                                    )}
                                    className="dark:hover:bg-gray-800"
                                  >
                                    <File className="w-4 h-4 mr-2" />
                                    View PDF
                                  </DropdownMenuItem>
                                </>
                              ) : null}

                              <DropdownMenuSeparator className="dark:border-gray-700" />

                              {animal.has_veterinary_request && animal.latest_veterinary_request ? (
                                <DropdownMenuItem onClick={() => showRequestModal(animal.latest_veterinary_request)} className="dark:hover:bg-gray-800">
                                  <Info className="w-4 h-4 mr-2" />
                                  View Request Details
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem disabled className="dark:text-gray-500">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  No Request Found
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary Cards - Now with better responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                      <span className="text-sm dark:text-gray-300">
                        With reports: {application.animals.filter(a => a.has_disease_report).length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                      <span className="text-sm dark:text-gray-300">
                        Pending requests: {application.animals.filter(a => a.request_status === 'pending').length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                      <span className="text-sm dark:text-gray-300">
                        With vet: {application.animals.filter(a => a.veterinarian_name).length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

  return (
    <>
      <AppLayout>
        <Head title="Livestock Insurance Applications" />
        
        {openSignatureModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-5 w-[420px] relative dark:border dark:border-gray-700">
              <button
                onClick={() => setOpenSignatureModal(false)}
                className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold mb-3 dark:text-white">Your Digital Signature</h2>

              <div className="flex justify-center mb-4">
                {previewSignature ? (
                  <img
                    src={previewSignature}
                    className="w-72 border rounded dark:border-gray-700"
                    alt="Preview"
                  />
                ) : selectedSignature ? (
                  <img
                    src={`/storage/${selectedSignature}`}
                    className="w-72 border rounded dark:border-gray-700"
                    alt="Signature"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No signature uploaded.</p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setNewSignatureFile(file);

                  if (file) {
                    const preview = URL.createObjectURL(file);
                    setPreviewSignature(preview);
                  }
                }}
                className="mb-4 dark:text-gray-300 dark:bg-gray-800"
              />

              <Button
                onClick={handleSignatureUpload}
                disabled={!newSignatureFile}
                className="w-full"
              >
                Save Signature
              </Button>
            </div>
          </div>
        )}

        {/* Disease Report Modal */}
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 dark:text-white">
                <FileText className="w-5 h-5" />
                Disease Report Details
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Complete veterinary disease report information
              </DialogDescription>
            </DialogHeader>
            
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-lg mb-3 dark:text-white">Policy Information</h4>
                      <div className="space-y-2">
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Policy Holder:</span> {selectedReport.policy_holder}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Address:</span> {selectedReport.address}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Province:</span> {selectedReport.province}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Contact No:</span> {selectedReport.contact_no}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Policy No:</span> {selectedReport.policy_no}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-lg mb-3 dark:text-white">Veterinarian Details</h4>
                      <div className="space-y-2">
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Veterinarian:</span> {selectedReport.veterinarian_name}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Signed at:</span> {selectedReport.signed_at_location}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Signed on:</span> {formatDate(selectedReport.signed_at_date)}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Report Date:</span> {formatDate(selectedReport.created_at)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg mb-3 dark:text-white">Examination Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Called Date:</span> {formatDate(selectedReport.q1a_called_date)}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Called Time:</span> {selectedReport.q1a_called_time}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Examined Date:</span> {formatDate(selectedReport.q1b_examined_date)}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Examined Time:</span> {selectedReport.q1b_examined_time}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Temperature:</span> {selectedReport.q3a_temperature}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Breathing:</span> {selectedReport.q3a_breathing}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Pulse:</span> {selectedReport.q3a_pulse}</p>
                        <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Disease Stage:</span> {selectedReport.q3b_disease_stage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg mb-3 dark:text-white">Diagnosis & Treatment</h4>
                    <div className="space-y-3">
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Preliminary Report:</span> {selectedReport.q2_preliminary_report}</p>
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Diagnosis:</span> {selectedReport.q4_diagnosis}</p>
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Treatment Given:</span> {selectedReport.q6a_treatment_given}</p>
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Special Instructions:</span> {selectedReport.q6b_special_instructions}</p>
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Cause of Disease:</span> {selectedReport.q7_cause_of_disease}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Veterinary Request Modal */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 dark:text-white">
                <Stethoscope className="w-5 h-5" />
                Veterinary Request Details
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Information about the veterinary service request
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-4">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg dark:text-white">{selectedRequest.title}</h4>
                      <Badge className={getStatusBadge(selectedRequest.status)}>
                        {selectedRequest.status?.charAt(0).toUpperCase() + selectedRequest.status?.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Request Type:</span> {selectedRequest.request_type || 'Not specified'}</p>
                      <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Created:</span> {formatDateTime(selectedRequest.created_at)}</p>
                    </div>
                    
                    <div className="border-t pt-3 mt-3 dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-200">Description:</h5>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded dark:bg-gray-900 dark:text-gray-300 dark:border dark:border-gray-700">{selectedRequest.description}</p>
                    </div>
                    
                    {selectedRequest.animal && (
                      <div className="border-t pt-3 mt-3 dark:border-gray-700">
                        <h5 className="font-medium mb-2 dark:text-gray-200">Animal Details:</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Breed:</span> {selectedRequest.animal.breed}</p>
                          <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Age:</span> {selectedRequest.animal.age}</p>
                          <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Sex:</span> {selectedRequest.animal.sex}</p>
                          <p className="dark:text-gray-300"><span className="font-medium dark:text-gray-200">Ear Mark:</span> {selectedRequest.animal.ear_mark}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Animals Modal */}
        <AnimalsModal
          isOpen={animalsModal.isOpen}
          onClose={() => setAnimalsModal({ isOpen: false, application: null })}
          application={animalsModal.application}
        />

        <div className="container mx-auto px-4 py-6 dark:text-gray-300">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-sidebar-primary/10 rounded-lg dark:bg-sidebar-primary/20">
                <Shield className="w-6 h-6 text-sidebar-primary dark:text-sidebar-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Livestock Insurance</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage insurance applications and veterinary reports</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Applications Card */}
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Applications</p>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{applications.total}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/40">
                    <FileSpreadsheet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Animals Card */}
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Animals</p>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-300">{totalAnimals}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/40">
                    <PigIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With Reports Card */}
            <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">With Reports</p>
                    <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">{animalsWithReports}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/40">
                    <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests Card */}
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Pending Requests</p>
                    <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">{pendingRequests}</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900/40">
                    <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Card */}
          <Card className="shadow-lg border dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="border-b dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <FileText className="w-5 h-5" />
                    Insurance Applications
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    View, manage, and process livestock insurance applications
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const firstApp = applications.data[0];
                      setSelectedSignature(firstApp?.proponent_signature_path || null);
                      setOpenSignatureModal(true);
                    }}
                    className="gap-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <FileSignature className="w-4 h-4" />
                    My Signature
                  </Button>

                  <Link
                    href="/insurance/application/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sidebar-primary text-white rounded-lg hover:bg-sidebar-primary/90 transition-colors text-sm font-medium dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/80"
                  >
                    <Plus className="w-4 h-4" />
                    New Application
                  </Link>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search by farmer name, proponent, or cover type..."
                      className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={coverTypeFilter} onValueChange={setCoverTypeFilter}>
                    <SelectTrigger className="w-[140px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <Filter className="w-4 h-4 mr-2 dark:text-gray-400" />
                      <SelectValue placeholder="Cover Type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                      <SelectItem value="all" className="dark:text-gray-300 dark:focus:bg-gray-800">All Types</SelectItem>
                      <SelectItem value="livestock" className="dark:text-gray-300 dark:focus:bg-gray-800">Livestock</SelectItem>
                      <SelectItem value="poultry" className="dark:text-gray-300 dark:focus:bg-gray-800">Poultry</SelectItem>
                      <SelectItem value="dairy" className="dark:text-gray-300 dark:focus:bg-gray-800">Dairy</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button onClick={submitSearch} className="gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow className="dark:border-gray-700">
                      <TableHead className="w-12 dark:text-gray-300"></TableHead>
                      <TableHead className="dark:text-gray-300">Application #</TableHead>
                      <TableHead className="dark:text-gray-300">Farmer</TableHead>
                      <TableHead className="dark:text-gray-300">Proponent</TableHead>
                      <TableHead className="dark:text-gray-300">Cover Type</TableHead>
                      <TableHead className="dark:text-gray-300">Animals</TableHead>
                      <TableHead className="dark:text-gray-300">Date</TableHead>
                      <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredApplications.map((app: Application) => (
                      <React.Fragment key={app.id}>
                        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setAnimalsModal({ isOpen: true, application: app })}
                              className="h-8 w-8 p-0 dark:hover:bg-gray-700"
                              title="View Animals"
                            >
                              <Eye className="w-4 h-4 dark:text-gray-400" />
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium dark:text-white">#{app.id}</TableCell>
                          <TableCell className="font-medium dark:text-gray-300">{app.farmer_name}</TableCell>
                          <TableCell className="dark:text-gray-300">{app.proponent_name ?? "—"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize dark:border-gray-700 dark:text-gray-300">
                              {app.cover_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <PigIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              <span className="dark:text-gray-300">{app.number_of_heads} animals</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {new Date(app.created_at).toLocaleDateString()}
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="gap-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                                  Actions
                                  <ChevronDown className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end" className="w-48 dark:bg-gray-900 dark:border-gray-700">
                                <DropdownMenuItem onClick={() => router.get(`/insurance/application/${app.id}`)} className="dark:hover:bg-gray-800">
                                  <Eye className="w-4 h-4 mr-2" /> View Details
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => router.get(`/insurance/application/${app.id}/edit`)} className="dark:hover:bg-gray-800">
                                  <Pencil className="w-4 h-4 mr-2" /> Edit Application
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator className="dark:border-gray-700" />
                                
                                <DropdownMenuItem onClick={() => openSignatureEditor(app)} className="dark:hover:bg-gray-800">
                                  <Printer className="w-4 h-4 mr-2" /> Preview PDF
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem onClick={() => window.open(`/insurance/${app.id}/pdf/downloads`, '_blank')} className="dark:hover:bg-gray-800">
                                  <Download className="w-4 h-4 mr-2" /> Download PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {applications.from} to {applications.to} of {applications.total} applications
                </div>
                <div className="flex gap-2">
                  {applications.links.map((link: any) => (
                    <Button
                      key={link.label}
                      variant={link.active ? "default" : "outline"}
                      size="sm"
                      disabled={!link.url}
                      onClick={() => router.get(link.url)}
                      className={!link.active ? "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800" : ""}
                    >
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signature Editor Modal */}
          {editingSignatureApp && editingSignatureApp.proponent_signature_path && (
            <SignatureEditor
              signaturePath={`/storage/${editingSignatureApp.proponent_signature_path}`}
              initialX={editingSignatureApp.proponent_user_id === user.id ? 588 : 0}
              initialY={editingSignatureApp.proponent_user_id === user.id ? 970 : 0}
              initialWidth={editingSignatureApp.proponent_user_id === user.id ? 301 : 0}
              initialHeight={editingSignatureApp.proponent_user_id === user.id ? 120 : 0}
              pdfId={editingSignatureApp.id}
              onSave={(x, y, width, height) => {
                axios.post(`/insurance/signature/${editingSignatureApp.id}/save`, { x, y, width, height })
                  .then(() => {
                    window.open(`/insurance/${editingSignatureApp.id}/pdf/download`, '_blank');
                    setEditingSignatureApp(null);
                  });
              }}
              onClose={() => setEditingSignatureApp(null)}
            />
          )}

          {/* Veterinary Authorization Modal */}
          <VeterinaryAuthModal
            isOpen={veterinaryAuthModal.isOpen}
            onClose={handleAuthStay}
            reportData={veterinaryAuthModal.reportData}
            currentUser={user}
            onContinue={handleAuthContinue}
            onStay={handleAuthStay}
          />
        </div>
      </AppLayout>
    </>
  );
}
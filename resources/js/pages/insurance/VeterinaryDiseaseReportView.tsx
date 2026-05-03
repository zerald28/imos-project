// File: resources/js/Pages/veterinary/ViewAnimalReport.tsx

import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/admin-layout";
import SignatureEditor from "./signatureEditor";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Pencil, 
  FileEdit, 
  ArrowLeft, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar,
  Tag,
  Hash,
  PawPrint,
  UserCircle,
  Stethoscope,
  FileText,
  Download,
  Printer,
  Shield,
  ChevronLeft,
  Home,
  PhoneCall
} from "lucide-react";
import { route } from "ziggy-js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PigIcon } from "@/components/icons";

// Define interfaces
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
  breed?: string;
  age?: number;
  ear_mark?: string;
  sex?: string;
  cover_type?: string | null;
  veterinary_report_id?: number | null;
  veterinarian_name?: string | null;
}

interface Report {
  id: number;
  disease_details?: string;
  findings?: string;
  recommendation?: string;
}

interface Signature {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  signature_path?: string;
}

// Define the Props interface and export it
export interface ViewAnimalReportProps {
  farmer: Farmer;
  animal: Animal;
  report: Report;
  userSignature?: string | null;
  signature?: Signature | null;
  currentUserId?: number;
}

const ViewAnimalReport: React.FC<ViewAnimalReportProps> = ({
  farmer,
  animal,
  report,
  userSignature,
  signature,
  currentUserId,
}) => {
  const [editingSignature, setEditingSignature] = useState(false);

  // In ViewAnimalReport.tsx - Update the handleSaveSignature function

const handleSaveSignature = async (x: number, y: number, width: number, height: number) => {
  try {
    // First save the signature
    await axios.post(`/insurance/signature/${animal.veterinary_report_id}/saves`, {
      x,
      y,
      width,
      height,
      veterinary_disease_report_id: animal.veterinary_report_id,
    });
    
    alert("Signature saved successfully! Opening print dialog...");
    
    // Then fetch and print the PDF
    const response = await axios.get(`/insurance/${animal.veterinary_report_id}/pdf/downloadreport`, {
      responseType: 'blob'
    });
    
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
    
    setEditingSignature(false);
    
  } catch (error) {
    console.error("Failed to save or print:", error);
    alert("Failed to save signature or print document. Please try again.");
  }
};

  const handleEditReport = () => {
    if (animal.veterinary_report_id) {
      router.get(route('veterinary.report.edit', { id: animal.veterinary_report_id }));
    }
  };

  const handleGoBack = () => {
    router.visit('/admin/insurance');
  };

  // Helper function to get initials
  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname?.[0] || ''}${lastname?.[0] || ''}`.toUpperCase();
  };

  return (
    <AppLayout>
      <Head title={`Veterinary Report for ${animal.ear_mark || animal.id}`} />

      <div className="p-6 max-w-7xl mx-auto space-y-6 dark:bg-gray-900">
        {/* Header with Back and Edit buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-sidebar-primary hover:text-sidebar-primary/80 hover:bg-sidebar-primary/10 dark:text-sidebar-primary dark:hover:bg-sidebar-primary/20"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Insurance
          </Button>

          {animal.veterinary_report_id && (
            <Button
              onClick={handleEditReport}
              className="flex items-center gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-white dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/80"
            >
              <Pencil className="w-4 h-4" />
              Edit Disease Report
            </Button>
          )}
        </div>

        {/* Farmer Information Card - Consolidated at the top */}
        <Card className="border-sidebar-primary/20 pt-0 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="h-2 bg-sidebar-primary" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Farmer Name and Username */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {farmer.firstname} {farmer.middlename} {farmer.lastname}
                  </h2>
                  <Badge className="bg-sidebar-primary/10 text-sidebar-primary border-sidebar-primary/20 dark:bg-sidebar-primary/20 dark:text-sidebar-primary dark:border-sidebar-primary/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Policy Holder
                  </Badge>
                </div>
                <p className="text-gray-500 flex items-center gap-1 dark:text-gray-400">
                  <UserCircle className="w-4 h-4" />
                  @{farmer.username}
                </p>
              </div>

              {/* Contact and Address Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg dark:bg-gray-700/50">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-sidebar-primary/10 rounded-full dark:bg-sidebar-primary/20">
                    <MapPin className="w-3.5 h-3.5 text-sidebar-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-sm font-medium dark:text-gray-200">{farmer.barangay}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <div className="p-1.5 bg-sidebar-primary/10 rounded-full dark:bg-sidebar-primary/20">
                    <Phone className="w-3.5 h-3.5 text-sidebar-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Contact</p>
                    <p className="text-sm font-medium dark:text-gray-200">{farmer.contact || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animal Info Card - Improved UI with sidebar-primary theme */}
        <Card className="border-sidebar-primary/20 shadow-md pt-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="h-2 bg-sidebar-primary" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sidebar-primary/10 rounded-lg dark:bg-sidebar-primary/20">
                  <PigIcon className="w-5 h-5 text-sidebar-primary" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Livestock Details</CardTitle>
              </div>
              {animal.veterinary_report_id && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                  <FileText className="w-3 h-3 mr-1" />
                  Report ID: #{animal.veterinary_report_id}
                </Badge>
              )}
            </div>
            <CardDescription className="dark:text-gray-400">
              Detailed information about the insured animal
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-sidebar-primary uppercase tracking-wider flex items-center gap-2 dark:text-sidebar-primary">
                  <div className="w-1 h-4 bg-sidebar-primary rounded-full" />
                  Basic Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <Tag className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Ear Mark</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{animal.ear_mark || 'N/A'}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <Hash className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Animal ID</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">#{animal.id}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Breed</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{animal.breed || 'N/A'}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Age</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {animal.age ? `${animal.age} years` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-sidebar-primary uppercase tracking-wider flex items-center gap-2 dark:text-sidebar-primary">
                  <div className="w-1 h-4 bg-sidebar-primary rounded-full" />
                  Additional Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <PigIcon className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Sex</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 capitalize dark:text-white">{animal.sex || 'N/A'}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <Shield className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Cover Type</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 capitalize dark:text-white">{animal.cover_type || 'N/A'}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2 dark:bg-gray-700/50">
                    <div className="flex items-center gap-2 text-sidebar-primary mb-1">
                      <Stethoscope className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase tracking-wider dark:text-sidebar-primary">Veterinarian</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {animal.veterinarian_name || 'Not assigned'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Status Summary */}
            {animal.veterinary_report_id && (
              <>
                <Separator className="my-4 dark:bg-gray-700" />
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500" />
                    <span>Report Generated</span>
                  </div>
                  <div className="text-gray-300 dark:text-gray-600">|</div>
                  <div className="flex items-center gap-1 text-sidebar-primary">
                    <FileText className="w-4 h-4" />
                    <span>Ready for signature</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Veterinary Report Card */}
        <Card className="border-sidebar-primary/20 shadow-md pt-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="h-2 bg-sidebar-primary" />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sidebar-primary/10 rounded-lg dark:bg-sidebar-primary/20">
                  <FileText className="w-5 h-5 text-sidebar-primary" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Disease Report</CardTitle>
              </div>
              {animal.veterinary_report_id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditReport}
                  className="flex items-center gap-2 border-sidebar-primary/20 text-sidebar-primary hover:bg-sidebar-primary/10 dark:border-sidebar-primary/30 dark:text-sidebar-primary dark:hover:bg-sidebar-primary/20"
                >
                  <FileEdit className="w-4 h-4" />
                  Edit Report
                </Button>
              )}
            </div>
            <CardDescription className="dark:text-gray-400">
              Veterinary disease report document with signature placement
            </CardDescription>
          </CardHeader>

          <CardContent>
            {animal.veterinary_report_id && userSignature ? (
              <div className="relative min-h-[800px] border rounded-lg overflow-hidden shadow-inner dark:border-gray-700 dark:bg-gray-900">
                <SignatureEditor
                  signaturePath={`/storage/${userSignature}`}
                  initialX={ 50}
                  initialY={20}
                  initialWidth={signature?.width || 301}
                  initialHeight={signature?.height || 120}
                  pdfId={animal.veterinary_report_id}
                  onSave={handleSaveSignature}
                  onClose={() => setEditingSignature(false)}
                  isModal={false}
                />
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 dark:bg-gray-700/30 dark:border-gray-600">
                {!animal.veterinary_report_id ? (
                  <>
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4 dark:text-gray-600" />
                    <p className="text-gray-500 text-lg dark:text-gray-400">No veterinary report found</p>
                    <p className="text-sm text-gray-400 mt-2 dark:text-gray-500">
                      This animal doesn't have any disease report yet.
                    </p>
                  </>
                ) : (
                  <>
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4 dark:text-gray-600" />
                    <p className="text-gray-500 text-lg dark:text-gray-400">Signature Required</p>
                    <p className="text-sm text-gray-400 mt-2 dark:text-gray-500">
                      Please upload your digital signature to edit the report.
                    </p>
                    {!userSignature && (
                      <Button
                        onClick={() => router.get('/profile')}
                        variant="outline"
                        className="mt-4 border-sidebar-primary/20 text-sidebar-primary hover:bg-sidebar-primary/10 dark:border-sidebar-primary/30 dark:text-sidebar-primary dark:hover:bg-sidebar-primary/20"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Upload Signature
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ViewAnimalReport;
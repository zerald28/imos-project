import React, { useState } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Upload, User, Mail, Signature, 
  FileText, Stethoscope, Calendar, 
  Eye,  ChevronRight, 
  FileSpreadsheet, ClipboardList 
} from "lucide-react";
import AppLayout from "@/layouts/admin-layout";
import { format } from "date-fns";
import { Link } from "@inertiajs/react";
import { PigIcon } from "@/components/icons";

interface UserInformation {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  profile_picture?: string;
}

interface DigitalSignature {
  id: number;
  signature: string;
}

interface VeterinaryReport {
  id: number;
  policy_holder: string;
  diagnosis: string;
  created_at: string;
  animal_count: number;
  farmer_name: string;
}

interface InsuranceApplication {
  id: number;
  farmer_name: string;
  cover_type: string;
  number_of_heads: number;
  created_at: string;
  animals_with_reports: number;
  total_animals: number;
}

interface ProfileProps {
  user: {
    id: number;
    email: string;
    role: string;
    user_information: UserInformation;
    digital_signature: DigitalSignature | null;
  };
  veterinaryReports: VeterinaryReport[];
  insuranceApplications: InsuranceApplication[];
}

interface PageProps extends Record<string, any> {
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function Profile({ user, veterinaryReports, insuranceApplications }: ProfileProps) {
  const { data, setData, post, processing, errors } = useForm({
    signature: null as File | null,
  });

  const [preview, setPreview] = useState(
    user.digital_signature ? `/storage/${user.digital_signature.signature}` : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("signature", file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/imos_admin/profile/signature", {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  const { flash } = usePage<PageProps>().props;
  const userInfo = user.user_information;
  const fullName = `${userInfo.firstname}${userInfo.middlename ? ` ${userInfo.middlename}` : ''} ${userInfo.lastname}`;

  const handleViewReport = (reportId: number) => {
    router.get(`/veterinary-disease-report/${reportId}/view`);
  };

  const handleViewApplication = (applicationId: number) => {
    router.get(`/insurance/application/${applicationId}`);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <Head title="Admin Profile" />
        
        <div className="container mx-auto sm:p-6 p-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account information and view your activity</p>
          </div>

          {/* Flash Messages */}
          {flash?.success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                {flash.success}
              </AlertDescription>
            </Alert>
          )}
          {flash?.error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {flash.error}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Your personal details and account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex items-start gap-6">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                      <AvatarImage 
                        src={userInfo.profile_picture ? `/storage/${userInfo.profile_picture}` : undefined}
                        alt={fullName}
                      />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {userInfo.firstname?.[0]}{userInfo.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {user.email.split('@')[0]}
                        </h2>
                        <Badge variant="outline" className="ml-2">
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-700 font-medium">{fullName}</p>
                      <div className="flex items-center gap-2 mt-4 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* User Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                    <div>
                      <label className="text-sm font-medium text-gray-500">First Name</label>
                      <p className="mt-1 text-gray-900">{userInfo.firstname}</p>
                    </div>
                    {userInfo.middlename && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Middle Name</label>
                        <p className="mt-1 text-gray-900">{userInfo.middlename}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Name</label>
                      <p className="mt-1 text-gray-900">{userInfo.lastname}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">User ID</label>
                      <p className="mt-1 text-gray-900">{user.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Your Activity
                  </CardTitle>
                  <CardDescription>
                    View your veterinary reports and insurance applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="veterinary" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="veterinary" className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" />
                        Veterinary Reports ({veterinaryReports.length})
                      </TabsTrigger>
                      <TabsTrigger value="insurance" className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Insurance Applications ({insuranceApplications.length})
                      </TabsTrigger>
                    </TabsList>

                    {/* Veterinary Reports Tab */}
                    <TabsContent value="veterinary" className="mt-4">
                      {veterinaryReports.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Stethoscope className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No veterinary reports found</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Reports you create as a veterinarian will appear here
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {veterinaryReports.map((report) => (
                            <div
                              key={report.id}
                              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleViewReport(report.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-blue-50">
                                      Report #{report.id}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      <Calendar className="w-3 h-3 inline mr-1" />
                                      {format(new Date(report.created_at), 'MMM d, yyyy')}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-gray-900">
                                    {report.farmer_name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Diagnosis:</span> {report.diagnosis || 'Not specified'}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span>{report.animal_count} animal(s)</span>
                                    <span>•</span>
                                    <span>{report.policy_holder}</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Insurance Applications Tab */}
                    <TabsContent value="insurance" className="mt-4">
                      {insuranceApplications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No insurance applications found</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Applications where you are the proponent will appear here
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {insuranceApplications.map((application) => (
                            <div
                              key={application.id}
                              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleViewApplication(application.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                      {application.cover_type}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      <Calendar className="w-3 h-3 inline mr-1" />
                                      {format(new Date(application.created_at), 'MMM d, yyyy')}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-gray-900">
                                    {application.farmer_name}
                                  </h4>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <PigIcon className="w-3 h-3" />
                                      {application.number_of_heads} heads
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <FileText className="w-3 h-3" />
                                      {application.animals_with_reports}/{application.total_animals} with reports
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Digital Signature */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Signature className="w-5 h-5" />
                    Digital Signature
                  </CardTitle>
                  <CardDescription>
                    Upload or update your digital signature
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* File Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Upload Signature Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="signature-upload"
                        />
                        <label
                          htmlFor="signature-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 2MB
                          </span>
                        </label>
                      </div>
                      {errors.signature && (
                        <p className="text-sm text-red-600">{errors.signature}</p>
                      )}
                    </div>

                    {/* Preview */}
                    {preview && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Preview
                        </label>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <img
                            src={preview}
                            alt="Signature Preview"
                            className="h-32 object-contain mx-auto"
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing || !data.signature}
                      className="w-full"
                    >
                      {processing ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Uploading...
                        </>
                      ) : (
                        'Upload Signature'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
// resources/js/pages/vetmed/create.tsx

import React, { useState, useRef } from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Upload, 
  X, 
  AlertCircle,
  Calendar,
  User,
  Building,
  FileSignature,
  Maximize2,
  Download,
} from 'lucide-react';

export default function CreateVetmedClearance() {
  const { data, setData, post, processing, errors, reset } = useForm({
    clearance_number: '',
    document_type: 'Veterinary Clearance',
    veterinarian_name: '',
    license_number: '',
    issued_by: '',
    issue_date: '',
    expiry_date: '',
    remarks: '',
    file: null as File | null,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('File size must be less than 10MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError('Only PDF, JPG, JPEG, and PNG files are allowed');
        return;
      }
      
      setData('file', file);
      setSubmitError(null);
      
      // Preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setData('file', null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate required fields
    if (!data.file) {
      setSubmitError('Please select a file to upload');
      return;
    }
    
    // Submit the form
    post('/vetmed-clearance', {
      forceFormData: true,
      onSuccess: () => {
        // Reset form on success
        reset();
        setFilePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      onError: (errors) => {
        console.error('Submission errors:', errors);
        if (errors.file) {
          setSubmitError(errors.file);
        } else if (errors.document_type) {
          setSubmitError(errors.document_type);
        } else {
          setSubmitError('An error occurred while submitting. Please try again.');
        }
      },
    });
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Submit Vetmed Clearance
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Upload your veterinary health certificate for verification
                </p>
              </div>
            </div>
          </div>

          {/* Display submit error */}
          {submitError && (
            <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-sm text-red-700 dark:text-red-300">
                {submitError}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={submit} className="space-y-6">
            {/* Main Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Clearance Information</CardTitle>
                <CardDescription>
                  Provide the details from your veterinary health certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Type */}
                <div>
                  <Label htmlFor="document_type">Document Type *</Label>
                  <select
                    id="document_type"
                    value={data.document_type}
                    onChange={(e) => setData('document_type', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 
                             bg-white dark:bg-gray-800 shadow-sm focus:border-green-500 
                             focus:ring-green-500 sm:text-sm"
                  >
                    <option value="Veterinary Clearance">Veterinary Clearance</option>
                    <option value="Health Certificate">Health Certificate</option>
                    <option value="Vaccination Record">Vaccination Record</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.document_type && (
                    <p className="mt-1 text-sm text-red-600">{errors.document_type}</p>
                  )}
                </div>

                {/* Clearance Number */}
                <div>
                  <Label htmlFor="clearance_number">Clearance Number</Label>
                  <Input
                    id="clearance_number"
                    type="text"
                    placeholder="e.g., VET-2024-00123"
                    value={data.clearance_number}
                    onChange={(e) => setData('clearance_number', e.target.value)}
                  />
                  {errors.clearance_number && (
                    <p className="mt-1 text-sm text-red-600">{errors.clearance_number}</p>
                  )}
                </div>

                {/* Veterinarian Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="veterinarian_name">Veterinarian Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="veterinarian_name"
                        className="pl-10"
                        placeholder="Dr. Juan Dela Cruz"
                        value={data.veterinarian_name}
                        onChange={(e) => setData('veterinarian_name', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="license_number">License Number</Label>
                    <div className="relative">
                      <FileSignature className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="license_number"
                        className="pl-10"
                        placeholder="PRC License #"
                        value={data.license_number}
                        onChange={(e) => setData('license_number', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Issued By */}
                <div>
                  <Label htmlFor="issued_by">Issued By (Clinic/Hospital)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="issued_by"
                      className="pl-10"
                      placeholder="Name of Veterinary Clinic"
                      value={data.issued_by}
                      onChange={(e) => setData('issued_by', e.target.value)}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issue_date">Issue Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="issue_date"
                        type="date"
                        className="pl-10"
                        value={data.issue_date}
                        onChange={(e) => setData('issue_date', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="expiry_date"
                        type="date"
                        className="pl-10"
                        value={data.expiry_date}
                        onChange={(e) => setData('expiry_date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Additional Remarks</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Any additional information about this clearance..."
                    rows={3}
                    value={data.remarks}
                    onChange={(e) => setData('remarks', e.target.value)}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label>Upload Document *</Label>
                  <div className="mt-1">
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    
                    {!data.file ? (
                      <div 
                        onClick={triggerFileUpload}
                        className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 
                                  border-dashed rounded-lg hover:border-green-500 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <span className="rounded-md font-medium text-green-600 hover:text-green-500">
                              Click to upload
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border-2 border-green-500 p-4 bg-green-50 dark:bg-green-900/20">
                        {filePreview ? (
                          <div className="relative group">
                            <img
                              src={filePreview}
                              alt="Preview"
                              className="max-h-64 mx-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
                              onClick={openFullScreen}
                            />
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={openFullScreen}
                                className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition"
                                title="View full screen"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition"
                                title="Remove image"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-2">
                              Click image to view full screen
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-green-600" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {data.file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(data.file.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                            >
                              <X className="w-5 h-5 text-red-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.file && (
                    <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                  )}
                </div>

                {/* Info Alert */}
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">📋 Important Information:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Clearance will be reviewed by our team within 2-3 business days</li>
                      <li>Only verified clearances can be used for marketplace listings</li>
                      <li>Make sure all information matches your document</li>
                      <li>Keep your clearance updated before expiry date</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Link href="/vetmed-clearance">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={processing || !data.file}>
                {processing ? 'Submitting...' : 'Submit Clearance'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && filePreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeFullScreen}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <a
              href={filePreview}
              download={data.file?.name || 'image.jpg'}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition z-10"
              title="Download image"
            >
              <Download className="w-6 h-6" />
            </a>
            
            <img
              src={filePreview}
              alt="Full screen preview"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm">
              Click anywhere to close • {data.file?.name}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
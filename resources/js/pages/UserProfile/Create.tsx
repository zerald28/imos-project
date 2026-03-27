// File: resources/js/Pages/UserProfile/Create.tsx

import React, { useState, useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import axios from "axios";
import { route } from "ziggy-js";
import { Toaster, toast } from "sonner";

import AuthLayout from '@/layouts/auth-layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Head } from '@inertiajs/react';

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon, Menu, X, Home, UserPlus, LogIn, Shield } from "lucide-react"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Create() {
  const { props } = usePage();
  const userInformation = (props as any).userInformation || null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Terms agreement state
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [values, setValues] = useState({
    firstname: userInformation?.firstname || "",
    middlename: userInformation?.middlename || "",
    lastname: userInformation?.lastname || "",
    extension: userInformation?.extension || "",
    contact: userInformation?.contact || "",
    birthdate: userInformation?.birthdate || "",
    gender: userInformation?.gender || "",
    civil_status: userInformation?.civil_status || "",
    occupation: userInformation?.occupation || "",
    profile_picture: null as File | null,
    province_id: userInformation?.province_id ? String(userInformation.province_id) : "",
    municipal_id: userInformation?.municipal_id ? String(userInformation.municipal_id) : "",
    barangay_id: userInformation?.barangay_id ? String(userInformation.barangay_id) : "",
    purok: userInformation?.purok || "",
    street: userInformation?.street || "",
    farming_type: userInformation?.farming_type || "",
  });

  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [municipals, setMunicipals] = useState<{ id: number; name: string }[]>([]);
  const [barangays, setBarangays] = useState<{ id: number; name: string }[]>([]);

  // Check session storage for terms agreement on mount
  useEffect(() => {
    const hasAgreedToTermsSession = sessionStorage.getItem('hasAgreedToTerms');
    if (hasAgreedToTermsSession === 'true') {
      setHasAgreedToTerms(true);
    }
  }, []);

  // Check if user is new (no existing data) and show terms modal
  useEffect(() => {
    // Check if this is a new user (no userInformation or empty userInformation)
    const isNewUser = !userInformation || Object.keys(userInformation).length === 0;
    
    // Check if user has already agreed to terms in this session
    const hasAgreedToTermsSession = sessionStorage.getItem('hasAgreedToTerms');
    
    if (isNewUser && !hasAgreedToTermsSession) {
      // Small delay to ensure smooth UX
      const timer = setTimeout(() => {
        setShowTermsModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [userInformation]);

  // Load provinces
  useEffect(() => {
    axios.get("/provinces").then((res) => setProvinces(res.data));
  }, []);

  // Load municipals when province changes
  useEffect(() => {
    if (!values.province_id) return;
    axios.get(`/municipalities/${values.province_id}`).then((res) => setMunicipals(res.data));
  }, [values.province_id]);

  // Load barangays when municipal changes
  useEffect(() => {
    if (!values.municipal_id) return;
    axios.get(`/barangays/${values.municipal_id}`).then((res) => setBarangays(res.data));
  }, [values.municipal_id]);

  const handleChange = (field: string, value: string | File | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (userInformation) {
      setValues((prev) => ({
        ...prev,
        ...userInformation,
        province_id: userInformation.province_id ? String(userInformation.province_id) : "",
        municipal_id: userInformation.municipal_id ? String(userInformation.municipal_id) : "",
        barangay_id: userInformation.barangay_id ? String(userInformation.barangay_id) : "",
      }));
    }
  }, [userInformation]);

  // Handle agree button click from modal
  const handleAgreeToTerms = () => {
    if (termsAgreed) {
      // Mark that user has agreed to terms in this session
      sessionStorage.setItem('hasAgreedToTerms', 'true');
      setHasAgreedToTerms(true);
      setShowTermsModal(false);
    }
  };

  // Handle modal close when clicking outside or escape
  const handleModalClose = (open: boolean) => {
    // Only allow closing if user has agreed
    if (!open && !termsAgreed) {
      return;
    }
    setShowTermsModal(open);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if terms are agreed
    if (!hasAgreedToTerms) {
      toast.error("Please agree to the Terms and Conditions first");
      setShowTermsModal(true);
      return;
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== "" && !(key === "profile_picture" && !(value instanceof File))) {
        formData.append(key, value as string | Blob);
      }
    });

    router.post("/user-informations", formData, {
      forceFormData: true,
      onSuccess: () => {
        console.log("User info saved successfully");
        // Clear session storage on success since user now has data
        sessionStorage.removeItem('hasAgreedToTerms');
      },
      onError: (errors) => {
        console.error("Validation errors:", errors);
      },
    });
  };

  const flash = (props && (props as any).flash) || {};
  const errors = (props as any).errors || {};

  useEffect(() => {
    if (!flash && !errors) return;

    if (flash?.success) toast.success(String(flash.success));
    if (flash?.error) toast.error(String(flash.error));
    if (flash?.warning) toast(String(flash.warning));
    if (flash?.info) toast(String(flash.info));

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        toast.error(`${field}: ${String(message)}`);
      });
    }
  }, [flash, errors]);

  const navItems = [
    { name: 'Back to Main', href: route('cms.exit'), icon: LogIn },
    { name: 'Register', href: route('register'), icon: UserPlus, active: true },
  ];

  return (
    <div className="relative min-h-screen w-full dark:bg-gray-900">
      <Head title="Complete Your Profile" />
      
      {/* Terms and Conditions Modal */}
      <Dialog 
        open={showTermsModal} 
        onOpenChange={handleModalClose}
      >
        <DialogContent 
          className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700"
          onEscapeKeyDown={(e) => {
            // Prevent closing with Escape key if not agreed
            if (!termsAgreed) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            // Prevent closing by clicking outside if not agreed
            if (!termsAgreed) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
              <Shield className="h-5 w-5" />
              Terms and Conditions
            </DialogTitle>
            <DialogDescription className="text-left pt-4">
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Please read and accept the following <strong>Terms and Conditions</strong> to proceed with your registration.
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800 max-h-[300px] overflow-y-auto">
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Terms of Use:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>All information provided must be accurate and truthful</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to receive communications from the livestock system</li>
                    <li>The system reserves the right to modify or terminate services at any time</li>
                    <li>You must comply with all applicable laws and regulations</li>
                    <li>Misuse of the system may result in account termination</li>
                    <li>Your data will be handled in accordance with our Privacy Policy</li>
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>The system is for legitimate livestock farming purposes only</li>
                    <li>You may not use the system for any illegal or unauthorized purpose</li>
                  </ul>
                </div>

                <p className="text-sm">
                  By clicking "I Agree", you confirm that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-start space-x-2 py-4">
            <Checkbox 
              id="terms-agree" 
              checked={termsAgreed}
              onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
              className="mt-1 dark:border-gray-600"
            />
            <label
              htmlFor="terms-agree"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
            >
              I have read and agree to the Terms and Conditions
            </label>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleAgreeToTerms} 
              disabled={!termsAgreed}
              className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white dark:bg-green-600 dark:hover:bg-green-700"
            >
              I Agree
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Background Image with dark mode fallback */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 filter blur-sm"
        style={{
          backgroundImage: `url('/485800765_1117928273470191_4976529546870698484_n.jpg')`,
        }}
      ></div>

      {/* Optional overlay for darker effect - dark mode adjusted */}
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-0"></div>

      {/* Responsive Header - Dark Green Theme with dark mode */}
      <header className="sticky top-0 z-50 w-full bg-green-900/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-green-800 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-green-200 dark:text-gray-100 dark:hover:text-green-400 transition-colors">
                <span className="text-green-300 dark:text-green-500">Livestock</span> System
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium
                    ${item.active 
                      ? 'bg-green-700 dark:bg-green-800 text-white shadow-lg border border-green-600 dark:border-green-700' 
                      : 'text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white border border-transparent hover:border-green-600 dark:hover:border-gray-700'
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-800 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                      ${item.active 
                        ? 'bg-green-700 dark:bg-green-800 text-white border border-green-600 dark:border-green-700' 
                        : 'text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white border border-transparent hover:border-green-600 dark:hover:border-gray-700'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* Page Header - Updated to match theme with dark mode */}
        <div className="w-full bg-gradient-to-b from-green-900/30 to-green-800/10 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm py-10 border-b border-green-800/20 dark:border-gray-700/20">
          <div className="max-w-5xl mx-auto text-center px-4 relative">
            <h1 className="text-3xl md:text-4xl font-bold text-green-100 dark:text-gray-100 mb-3">Complete Your Profile</h1>
            <p className="text-green-200/90 dark:text-gray-300 max-w-2xl mx-auto">
              Please fill out your profile information to continue with the registration process.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="flex min-h-[60vh] w-full items-center justify-center p-4 md:p-10">
          <Toaster position="top-right" richColors />

          <Card className="mb-0 shadow-xl w-full max-w-3xl border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
            <CardContent className="pt-8 pb-8">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* 🔹 Name Fields: First, Middle, Last */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">First Name</Label>
                    <Input
                      value={values?.firstname || ""}
                      onChange={(e) => handleChange("firstname", e.target.value)}
                      placeholder="First Name"
                      required
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Middle Name</Label>
                    <Input
                      value={values?.middlename || ""}
                      onChange={(e) => handleChange("middlename", e.target.value)}
                      placeholder="Middle Name"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Last Name</Label>
                    <Input
                      value={values?.lastname || ""}
                      onChange={(e) => handleChange("lastname", e.target.value)}
                      placeholder="Last Name"
                      required
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-500"
                    />
                  </div>
                </div>

                {/* 🔹 Extension, Contact, Birthdate, Gender */}
                <div className="flex flex-wrap gap-4 items-end">

                  {/* Extension: small width */}
                  <div className="flex-none w-[100px]">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Extension</Label>
                    <Input
                      value={values?.extension || ""}
                      onChange={(e) => handleChange("extension", e.target.value)}
                      placeholder="Jr/Sr"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Contact Number: medium width */}
                  <div className="flex-1 min-w-[150px]">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Contact Number</Label>
                    <Input
                      value={values?.contact || ""}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        handleChange("contact", numericValue);
                      }}
                      placeholder="09XXXXXXXXX"
                      maxLength={11}
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Birthdate with Calendar: widest */}
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Birthdate</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-base border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-600 text-green-900 dark:text-gray-100"
                        >
                          {values.birthdate
                            ? new Date(values.birthdate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                            : "Select date"}
                          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="center"
                        className="w-auto max-w-xs p-0 rounded-lg shadow-lg border border-green-200 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={values.birthdate ? new Date(values.birthdate) : undefined}
                          className="w-62 rounded-lg shadow-md border-green-100 dark:border-gray-700
                            [&_.rdp-day]:w-8 [&_.rdp-day]:h-7
                            [&_.rdp-day_selected]:bg-green-700 dark:[&_.rdp-day_selected]:bg-green-600
                            [&_.rdp-day_selected]:text-white
                            dark:[&_.rdp-day]:text-gray-200
                            dark:[&_.rdp-head_cell]:text-gray-400"
                          onSelect={(date) => {
                            if (date) {
                              const formatted = date.toISOString().split("T")[0];
                              handleChange("birthdate", formatted);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Gender: small width */}
                  <div className="flex-none w-[120px]">
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Gender</Label>
                    <Select
                      value={values?.gender || ""}
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="z-50 max-w-[120px] border-green-200 dark:border-gray-700 dark:bg-gray-800">
                        <SelectItem value="male" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">Male</SelectItem>
                        <SelectItem value="female" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">Female</SelectItem>
                        <SelectItem value="other" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                {/* 🔹 Civil Status, Occupation, Profile Picture */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Civil Status</Label>
                    <Input
                      value={values?.civil_status || ""}
                      onChange={(e) => handleChange("civil_status", e.target.value)}
                      placeholder="Civil Status"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Occupation</Label>
                    <Input
                      value={values?.occupation || ""}
                      onChange={(e) => handleChange("occupation", e.target.value)}
                      placeholder="Occupation"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Profile Picture</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        handleChange("profile_picture", e.target.files?.[0] || null)
                      }
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500 file:text-green-900 dark:file:text-gray-200 file:border-green-200 dark:file:border-gray-600"
                    />
                  </div>
                </div>

                {/* 🔹 Province, Municipal, Barangay */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Province */}
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Province</Label>
                    <Select
                      value={values?.province_id || ""}
                      onValueChange={(value) => handleChange("province_id", value)}
                    >
                      <SelectTrigger className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="z-50 max-h-60 overflow-y-auto border-green-200 dark:border-gray-700 dark:bg-gray-800"
                      >
                        {provinces.map((p) => (
                          <SelectItem key={p.id} value={String(p.id)} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Municipality */}
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Municipality</Label>
                    <Select
                      value={values?.municipal_id || ""}
                      onValueChange={(value) => handleChange("municipal_id", value)}
                    >
                      <SelectTrigger className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select Municipality" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="z-50 max-h-60 overflow-y-auto border-green-200 dark:border-gray-700 dark:bg-gray-800"
                      >
                        {municipals.map((m) => (
                          <SelectItem key={m.id} value={String(m.id)} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Barangay */}
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Barangay</Label>
                    <Select
                      value={values?.barangay_id || ""}
                      onValueChange={(value) => handleChange("barangay_id", value)}
                    >
                      <SelectTrigger className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select Barangay" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="z-50 max-h-60 overflow-y-auto border-green-200 dark:border-gray-700 dark:bg-gray-800"
                      >
                        {barangays.map((b) => (
                          <SelectItem key={b.id} value={String(b.id)} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 🔹 Purok & Street */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Purok</Label>
                    <Input
                      value={values?.purok || ""}
                      onChange={(e) => handleChange("purok", e.target.value)}
                      placeholder="Purok"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Street</Label>
                    <Input
                      value={values?.street || ""}
                      onChange={(e) => handleChange("street", e.target.value)}
                      placeholder="Street"
                      className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label className="text-green-900 dark:text-gray-200 font-medium">Type of LIVESTOCK FARMING</Label>
                    <Select
                      value={values.farming_type}
                      onValueChange={(value) => handleChange("farming_type", value)}
                    >
                      <SelectTrigger className="border-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select Farming Type" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="z-50 border-green-200 dark:border-gray-700 dark:bg-gray-800">
                        <SelectItem value="backyard" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">Backyard Farming</SelectItem>
                        <SelectItem value="commercial" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100">Commercial Farming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 🔹 Terms and Conditions Checkbox - Visible below the form */}
                <div className="mt-6 pt-4 border-t border-green-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms-checkbox"
                      checked={hasAgreedToTerms}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          // If checking, show the modal with full terms
                          setShowTermsModal(true);
                        } else {
                          // If unchecking, update state and clear session storage
                          setHasAgreedToTerms(false);
                          sessionStorage.removeItem('hasAgreedToTerms');
                        }
                      }}
                      className="mt-1 dark:border-gray-600"
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="terms-checkbox"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        I have read and agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setShowTermsModal(true)}
                          className="text-green-700 dark:text-green-500 hover:underline font-semibold"
                        >
                          Terms and Conditions
                        </button>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By checking this box, you confirm that you accept our terms of service and agree to comply with them.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 🔹 Submit Button */}
                <div className="mt-8 text-center">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto px-10 py-3 text-lg bg-gradient-to-r from-green-700 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-800 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!hasAgreedToTerms}
                  >
                    Save Profile
                  </Button>
                  {!hasAgreedToTerms && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                      Please agree to the Terms and Conditions to continue
                    </p>
                  )}
                </div>
              </form>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
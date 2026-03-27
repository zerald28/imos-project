import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { route } from "ziggy-js";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { User, MapPin, Phone, Mail, Camera, Leaf, Shield, PiggyBank, AlertCircle } from "lucide-react";
import { PigIcon } from '@/components/icons';

interface SellerProfileProps {
  user: {
    id: number;
    username: string;
    email: string;
    contact: string;
    profile_picture: string | null;
    full_name: string;
    address?: {
      province?: string;
      municipal?: string;
      barangay?: string;
      purok?: string;
      street?: string;
      province_id?: number;
      municipal_id?: number;
      barangay_id?: number;
    };
  };
}

export default function Edit({ user }: SellerProfileProps) {
  // Provide fallback empty object for address
  const userAddress = user.address || {};
  
  const { data, setData, post, processing } = useForm({
    name: user.username || "",
    email: user.email || "",
    contact: user.contact || "",
    province_id: userAddress.province_id || "",
    municipal_id: userAddress.municipal_id || "",
    barangay_id: userAddress.barangay_id || "",
    purok: userAddress.purok || "",
    street: userAddress.street || "",
    profile_picture: null as File | null,
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [municipals, setMunicipals] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [contactError, setContactError] = useState<string>("");

  const handleChange = (key: string, value: any) => {
    setData(key as any, value);
    if (!hasChanges) setHasChanges(true);
  };

  // Handle contact number input - only allow digits
  const handleContactChange = (value: string) => {
    // Remove any non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 11 digits (standard Philippine mobile number)
    const limitedDigits = digitsOnly.slice(0, 11);
    
    setData("contact", limitedDigits);
    
    // Validate contact number format
    if (limitedDigits.length > 0 && limitedDigits.length < 10) {
      setContactError("Contact number should be at least 10 digits");
    } else if (limitedDigits.length > 0 && !limitedDigits.startsWith('09')) {
      setContactError("Contact number should start with '09'");
    } else if (limitedDigits.length > 0 && limitedDigits.length !== 10 && limitedDigits.length !== 11) {
      setContactError("Contact number should be 10 or 11 digits");
    } else {
      setContactError("");
    }
    
    if (!hasChanges) setHasChanges(true);
  };

  // 🧠 Fetch provinces on mount
  useEffect(() => {
    const loadAddressData = async () => {
      try {
        // 1️⃣ Load provinces
        const provRes = await axios.get("/provinces");
        setProvinces(provRes.data);

        // 2️⃣ If user has a saved province, load municipals
        if (userAddress.province_id) {
          const munRes = await axios.get(`/municipalities/${userAddress.province_id}`);
          setMunicipals(munRes.data);

          // 3️⃣ If user has a saved municipal, load barangays
          if (userAddress.municipal_id) {
            const brgyRes = await axios.get(`/barangays/${userAddress.municipal_id}`);
            setBarangays(brgyRes.data);
          }
        }
      } catch (err) {
        console.error("Failed to load address data:", err);
        toast.error("Failed to load location data");
      }
    };

    loadAddressData();
  }, []);

  // 🧠 Province watcher
  useEffect(() => {
    if (data.province_id && data.province_id !== userAddress.province_id) {
      axios.get(`/municipalities/${data.province_id}`).then((res) => {
        setMunicipals(res.data);
        setData("municipal_id", "");
        setBarangays([]);
        setData("barangay_id", "");
      }).catch(() => {
        toast.error("Failed to load municipalities");
      });
    }
  }, [data.province_id]);

  // 🧠 Municipal watcher
  useEffect(() => {
    if (data.municipal_id && data.municipal_id !== userAddress.municipal_id) {
      axios.get(`/barangays/${data.municipal_id}`).then((res) => {
        setBarangays(res.data);
        setData("barangay_id", "");
      }).catch(() => {
        toast.error("Failed to load barangays");
      });
    }
  }, [data.municipal_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate contact number before submission
    if (data.contact && data.contact.length > 0) {
      if (data.contact.length < 10) {
        toast.error("Contact number must be at least 10 digits");
        return;
      }
      if (!data.contact.startsWith('09')) {
        toast.error("Contact number should start with '09'");
        return;
      }
    }

    post(route("marketplace.seller.profile.update"), {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        setHasChanges(false);
        setImageError(false);
        setContactError("");
      },
      onError: (errors) => {
        console.error(errors);
        toast.error("Update failed. Please check your inputs.");
      },
    });
  };

  // Function to get profile picture URL with fallback
  const getProfilePictureUrl = () => {
    if (!user.profile_picture || imageError) {
      return null;
    }
    // Check if it's a full URL or needs storage path
    if (user.profile_picture.startsWith('http')) {
      return user.profile_picture;
    }
    return `/storage/${user.profile_picture}`;
  };

  const profilePictureUrl = getProfilePictureUrl();

  return (
    <div className="min-h-screen relative">
      {/* FIXED BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
        }}
      />
      
      {/* COLOR OVERLAY */}
      <div className="fixed inset-0 z-0 bg-sidebar-primary/70" />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce opacity-20">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-1000 opacity-20">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse opacity-10">
          <PiggyBank className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-spin-slow opacity-10">
          <PigIcon className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 dark:border-gray-700">
          <CardContent className="space-y-6 p-6">
            {/* Profile Header with Fallback */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative w-24 h-24 flex-shrink-0">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl}
                    alt={user.full_name || "Profile"}
                    className="w-24 h-24 rounded-full object-cover border-2 border-sidebar-primary dark:border-sidebar-primary shadow-md"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 border-2 border-sidebar-primary dark:border-sidebar-primary flex items-center justify-center shadow-md">
                    <User className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                {!profilePictureUrl && (
                  <div className="absolute -bottom-1 -right-1 bg-sidebar-primary rounded-full p-1.5 border-2 border-white dark:border-gray-800">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {user.full_name || "Farmer"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <Mail className="w-3 h-3" />
                  {user.email || "No email provided"}
                </p>
                {user.contact && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {user.contact}
                  </p>
                )}
              </div>
            </div>

            {/* Editable Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 3-Column Grid for Username / Contact / Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Farmer Username</Label>
                  <Input
                    value={data.name}
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter username"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Contact Number</Label>
                  <Input
                    type="tel"
                    value={data.contact}
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) => handleContactChange(e.target.value)}
                    placeholder="09XXXXXXXXX"
                    className={`border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary ${
                      contactError ? "border-red-500 dark:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {contactError && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {contactError}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter 10-11 digit mobile number (e.g., 09123456789)
                  </p>
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    type="email"
                    value={data.email}
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div>
                <Label className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
                  {/* Province */}
                  <Select
                    onValueChange={(value) => {
                      handleChange("province_id", Number(value));
                      // Reset dependent fields
                      setData("municipal_id", "");
                      setData("barangay_id", "");
                      setMunicipals([]);
                      setBarangays([]);
                    }}
                    value={data.province_id ? String(data.province_id) : ""}
                  >
                    <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder={userAddress.province || "Select Province"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      {provinces.length > 0 ? (
                        provinces.map((prov: any) => (
                          <SelectItem
                            key={prov.id}
                            value={String(prov.id)}
                            className="text-sm py-1.5 dark:text-gray-300 dark:focus:bg-gray-700"
                          >
                            {prov.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400">Loading provinces...</div>
                      )}
                    </SelectContent>
                  </Select>

                  {/* Municipality */}
                  <Select
                    onValueChange={(value) => {
                      handleChange("municipal_id", Number(value));
                      setData("barangay_id", "");
                      setBarangays([]);
                    }}
                    value={data.municipal_id ? String(data.municipal_id) : ""}
                    disabled={!data.province_id}
                  >
                    <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 disabled:opacity-50">
                      <SelectValue
                        placeholder={userAddress.municipal || "Select Municipality"}
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      {municipals.length > 0 ? (
                        municipals.map((mun: any) => (
                          <SelectItem
                            key={mun.id}
                            value={String(mun.id)}
                            className="text-sm py-1.5 dark:text-gray-300 dark:focus:bg-gray-700"
                          >
                            {mun.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
                          {data.province_id ? "No municipalities found" : "Select province first"}
                        </div>
                      )}
                    </SelectContent>
                  </Select>

                  {/* Barangay */}
                  <Select
                    onValueChange={(value) => handleChange("barangay_id", Number(value))}
                    value={data.barangay_id ? String(data.barangay_id) : ""}
                    disabled={!data.municipal_id}
                  >
                    <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 disabled:opacity-50">
                      <SelectValue
                        placeholder={userAddress.barangay || "Select Barangay"}
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      {barangays.length > 0 ? (
                        barangays.map((brgy: any) => (
                          <SelectItem
                            key={brgy.id}
                            value={String(brgy.id)}
                            className="text-sm py-1.5 dark:text-gray-300 dark:focus:bg-gray-700"
                          >
                            {brgy.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
                          {data.municipal_id ? "No barangays found" : "Select municipality first"}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Input
                    value={data.purok}
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) => handleChange("purok", e.target.value)}
                    placeholder="Purok (optional)"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                  />
                  <Input
                    value={data.street}
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) => handleChange("street", e.target.value)}
                    placeholder="Street (optional)"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                  />
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Profile Picture</Label>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onFocus={() => setHasChanges(true)}
                    onChange={(e) =>
                      handleChange("profile_picture", e.target.files?.[0] || null)
                    }
                    className="flex-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sidebar-primary file:text-white hover:file:bg-sidebar-primary/80"
                  />
                  {data.profile_picture && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleChange("profile_picture", null)}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Choose image with typical size
                </p>
              </div>

              {/* Confirm Update Button */}
              <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className={`border-gray-400 dark:border-gray-600 transition-all duration-200 ${
                    hasChanges 
                      ? "hover:bg-gray-100 dark:hover:bg-gray-700" 
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!hasChanges}
                  onClick={() => {
                    if (!hasChanges) return;
                    setData({
                      name: user.username || "",
                      email: user.email || "",
                      contact: user.contact || "",
                      province_id: userAddress.province_id || "",
                      municipal_id: userAddress.municipal_id || "",
                      barangay_id: userAddress.barangay_id || "",
                      purok: userAddress.purok || "",
                      street: userAddress.street || "",
                      profile_picture: null,
                    });
                    setHasChanges(false);
                    setImageError(false);
                    setContactError("");
                    toast.info("Changes canceled");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className={`bg-sidebar-primary hover:bg-sidebar-primary/90 text-white transition-all duration-200 ${
                    !hasChanges || contactError ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!hasChanges || processing || !!contactError}
                >
                  {processing ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
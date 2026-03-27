// File: resources/js/Pages/User/Create.tsx

import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import { route } from "ziggy-js";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import HeadingSmall from '@/components/heading-small';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Profile Information', href: '/create' }, // <-- typo and dot at end
];
type Props = {
  onSuccess?: () => void;
};

// Add the type for props
interface CreateProps {
  onSuccess?: (user: any) => void; // optional callback
    onError?: () => void; // make optional if you want
}

export default function Create({ onSuccess, onError }: CreateProps) {

  const [values, setValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    extension: "",
    contact: "",
    birthdate: "",
    gender: "",
    civil_status: "",
    occupation: "",
    profile_picture: null as File | null,
    province_id: "",
    municipal_id: "",
    barangay_id: "",
    purok: "",
    street: "",
  });

  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [municipals, setMunicipals] = useState<{ id: number; name: string }[]>([]);
  const [barangays, setBarangays] = useState<{ id: number; name: string }[]>([]);

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

  // ----------------------
  // Inside Create.tsx
  // ----------------------


  // Send to your Laravel store route
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as string | Blob);
    });

    router.post("/profile-information/store", formData, {
      forceFormData: true,
      onSuccess: (page) => {
        if (onSuccess) {
          onSuccess(page.props.user); // send updated user data to parent
        }
      },
      onError: (errors) => {
        console.error("❌ Validation failed", errors);
      },
    });


  };

  return (

    <ScrollArea className="max-h-74 w-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 pb-4">
        {/* Name Fields */}
        <HeadingSmall title="Profile Information" description="You don't have information. Fill it in" />

        <div className="grid gap-2">
          <Label>First Name</Label>
          <Input
            value={values.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
            placeholder="First Name"
            required
            className="mt-1 block w-full"
          />
        </div>
        <div className="grid gap-2">
          <Label>Middle Name</Label>
          <Input
            value={values.middlename}
            onChange={(e) => handleChange("middlename", e.target.value)}
            placeholder="Middle Name"
            className="mt-1 block w-full"
          />
        </div>
        <div className="grid gap-2">
          <Label>Last Name</Label>
          <Input
            value={values.lastname}
            onChange={(e) => handleChange("lastname", e.target.value)}
            placeholder="Last Name"
            className="mt-1 block w-full"
            required
          />
        </div>


        {/* Extension & Contact */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Extension (e.g., Jr, Sr)</Label>
            <Input
              value={values.extension}
              onChange={(e) => handleChange("extension", e.target.value)}
              placeholder="Extension"
            />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input
              value={values.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              placeholder="Contact"
            />
          </div>
        </div>

        {/* Birthdate */}
        <div>
          <Label>Birthdate</Label>
          <Input
            type="date"
            required
            value={values.birthdate}
            onChange={(e) => handleChange("birthdate", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <Label>Gender</Label>
          <Select
            value={values.gender}
            onValueChange={(value: string) => handleChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-50">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Civil Status & Occupation */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Civil Status</Label>
            <Input
              value={values.civil_status}
              onChange={(e) => handleChange("civil_status", e.target.value)}
              placeholder="Civil Status"
            />
          </div>
          <div>
            <Label>Occupation</Label>
            <Input
              value={values.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              placeholder="Occupation"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <Label>Profile Picture</Label>
          <Input
            type="file"
            onChange={(e) => handleChange("profile_picture", e.target.files?.[0] || null)}
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1  lg:grid-cols-1 xl:grid-cols-1">
          <div>
            <Label>Province</Label>
            <Select
              value={values.province_id}
              onValueChange={(value: string) => handleChange("province_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                {provinces.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Municipality</Label>
            <Select
              value={values.municipal_id}
              onValueChange={(value: string) => handleChange("municipal_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50 p-1">

                <ScrollArea className="max-h-74">
                  {municipals.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                  ))}
                </ScrollArea>

              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Barangay</Label>
            <Select
              value={values.barangay_id}
              onValueChange={(value: string) => handleChange("barangay_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Barangay" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                {barangays.map((b) => (
                  <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Purok & Street */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Purok</Label>
            <Input
              value={values.purok}
              onChange={(e) => handleChange("purok", e.target.value)}
              placeholder="Purok"
            />
          </div>
          <div>
            <Label>Street</Label>
            <Input
              value={values.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street"
            />
          </div>
        </div>
        {/* Submit Button */}

        <Button type="submit" className="w-full md:w-auto">
          Save Profile
        </Button>

      </form>

    </ScrollArea>
  );
}

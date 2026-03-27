import React, { useState, useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import HeadingSmall from "@/components/heading-small";
import axios from "axios";
import { type BreadcrumbItem, type SharedData } from "@/types";
import Create from './create'
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Profile Information", href: "/profileInformation" },
];

interface ProfileFormData {
  firstname: string;
  middlename: string;
  lastname: string;
  extension: string;
  contact: string;
  birthdate: string;
  gender: string;
  civil_status: string;
  occupation: string;
  street: string;
  purok: string;
  barangay_id: string;
  municipal_id: string;
  province_id: string;
}

export default function ProfileInformation({ user }: { user: any }) {
  const { auth } = usePage<SharedData>().props;

  const form = useForm<ProfileFormData>({
    firstname: user?.firstname ?? "",
    middlename: user?.middlename ?? "",
    lastname: user?.lastname ?? "",
    extension: user?.extension ?? "",
    contact: user?.contact ?? "",
    birthdate: user?.birthdate ?? "",
    gender: user?.gender ?? "",
    civil_status: user?.civil_status ?? "",
    occupation: user?.occupation ?? "",
    street: user?.street ?? "",
    purok: user?.purok ?? "",
    barangay_id: user?.barangay_id?.toString() ?? "",
    municipal_id: user?.municipal_id?.toString() ?? "",
    province_id: user?.province_id?.toString() ?? "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [municipals, setMunicipals] = useState<{ id: number; name: string }[]>([]);
  const [barangays, setBarangays] = useState<{ id: number; name: string }[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Toast timer
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Load provinces
  useEffect(() => {
    axios.get("/provinces").then(res => setProvinces(res.data));
  }, []);

  // Load municipals when province changes
  useEffect(() => {
    if (!form.data.province_id) return;
    axios.get(`/municipalities/${form.data.province_id}`).then(res => setMunicipals(res.data));
  }, [form.data.province_id]);

  // Load barangays when municipal changes
  useEffect(() => {
    if (!form.data.municipal_id) return;
    axios.get(`/barangays/${form.data.municipal_id}`).then(res => setBarangays(res.data));
  }, [form.data.municipal_id]);

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Use the correct foreign key for updating
    form.put(`/user-informations/${user.user_id}`, {
      onSuccess: () => {
        // -----------------------------cuztomize toast message
        // setShowToast(true);
        // setToastMessage("Profile updated successfully!");
        // setToastType("success");
        toast.success("Swine updated successfully!");
      },
      onError: () => {
        // setShowToast(true);
        // setToastMessage("Failed to update profile.");
        // setToastType("error");
        toast.error("Please fix the errors in the form.");
      },
    });
  };

  // Inside ProfileInformation component
  const handleCreateSuccess = (updatedUser: ProfileFormData) => {
    // Update the form state with the new user data
    form.setData(updatedUser);

    // Show success toast
    // setShowToast(true);
    // setToastMessage("Profile saved successfully!");
    // setToastType("success");
    toast.success("Swine registered successfully!");


    // Close the Create modal
    setIsOpen(false);
  };

  // ✅ Move check outside of handleSubmit 
  if (!user)
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Profile Information" />
        <SettingsLayout>


          <Create
            onSuccess={handleCreateSuccess}
            onError={() => {
              setShowToast(true);
              setToastMessage("Failed to save profile.");
              setToastType("error");
            }}
          />

        </SettingsLayout>
      </AppLayout>
    );

  return (
    <div>
      <Head title="Profile Information" />

      <SettingsLayout>
        {showToast && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
          >
            {toastMessage}
          </div>
        )}

        <div className="relative space-y-6">
          <Button onClick={() => setIsDisabled(!isDisabled)} className="absolute right-2">
            {isDisabled ? "Enable" : "Disable"}
          </Button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <HeadingSmall title="Profile Information" description="You can update your information." />

            <fieldset disabled={isDisabled} className={`${isDisabled ? "opacity-90" : ""}`}>
              {/* First Name */}
              <div className="grid gap-2">
                <Label>First Name</Label>
                <input
                  name="firstname"
                  value={form.data.firstname}
                  onChange={e => form.setData('firstname', e.target.value)}
                  className="mt-1 block w-full mb-5"
                />
              </div>

              {/* Middle Name */}
              <div className="grid gap-2">
                <Label>Middle Name</Label>
                <input
                  name="middlename"
                  value={form.data.middlename}
                  onChange={e => form.setData('middlename', e.target.value)}
                  placeholder="Middle Name"
                  className="mt-1 block w-full mb-5"
                />
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <input
                  name="lastname"
                  value={form.data.lastname}
                  onChange={e => form.setData('lastname', e.target.value)}
                  placeholder="e.g., Cruz"
                  className="mt-1 block w-full mb-5"
                />
              </div>

              {/* Extension & Contact */}
              <div className="grid sm:grid-cols-5 gap-4">
                <div className="sm:col-span-1">
                  <Label>Extension</Label>
                  <input
                    name="extension"
                    value={form.data.extension}
                    onChange={e => form.setData('extension', e.target.value)}
                    placeholder="Jr, Sr"
                    className="mb-5"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Label>Contact Number</Label>
                  <input
                    type="tel"
                    value={form.data.contact}
                    placeholder="09XXXXXXXXX"
                    maxLength={11} // Philippine mobile number
                    onChange={e => {
                      let val = e.target.value;
                      // Remove any non-digit characters
                      val = val.replace(/\D/g, "");
                      // Ensure it starts with "09"
                      if (!val.startsWith("09")) {
                        val = "09" + val.slice(2);
                      }
                      form.setData("contact", val);
                    }}
                  />
                </div>
              </div>

              {/* Birthdate */}
              <div>
                <Label>Birthdate</Label>
                <input
                  type="date"
                  value={form.data.birthdate}
                  onChange={e => form.setData('birthdate', e.target.value)}
                  className="mb-5"
                />
              </div>

              {/* Gender */}
              <div>
                <Label>Gender</Label>
                <Select
                  value={form.data.gender}
                  onValueChange={value => form.setData("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="mb-5">
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
                  <input
                    value={form.data.civil_status}
                    onChange={e => form.setData("civil_status", e.target.value)}
                    placeholder="Civil Status"
                    className="mb-5"
                  />
                </div>
                <div>
                  <Label>Occupation</Label>
                  <input
                    value={form.data.occupation}
                    onChange={e => form.setData("occupation", e.target.value)}
                    placeholder="Occupation"
                    className="mb-5"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="mb-5">
                  <Label>Province</Label>
                  <Select
                    value={form.data.province_id}
                    onValueChange={value => form.setData("province_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(p => (
                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Municipality</Label>
                  <Select
                    value={form.data.municipal_id}
                    onValueChange={value => form.setData("municipal_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Municipality" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-50">
                      <ScrollArea className="max-h-72">
                        {municipals.map(m => (
                          <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Barangay</Label>
                  <Select
                    value={form.data.barangay_id}
                    onValueChange={value => form.setData("barangay_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Barangay" />
                    </SelectTrigger>
                    <SelectContent className="mb-5 max-h-72 w-full">
                      {barangays.map(b => (
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
                  <input
                    value={form.data.purok}
                    onChange={e => form.setData("purok", e.target.value)}
                    placeholder="Purok"
                    className="mb-5"
                  />
                </div>
                <div>
                  <Label>Street</Label>
                  <input
                    value={form.data.street}
                    onChange={e => form.setData("street", e.target.value)}
                    placeholder="Street"
                    className="mb-5"
                  />
                </div>
              </div>

              <Button type="submit" disabled={form.processing} className="mb-5">
                Update Profile
              </Button>
            </fieldset>
          </form>
        </div>
      </SettingsLayout>
    </div>
  );
}

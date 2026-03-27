import React, { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import AppLayout from "@/layouts/admin-layout";

export default function CreateUser() {
 const { errors, authRole } = usePage().props as { 
    errors: any; 
    authRole: string; 
};


  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [municipals, setMunicipals] = useState<{ id: number; name: string }[]>([]);
  const [barangays, setBarangays] = useState<{ id: number; name: string }[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "farmer",
    firstname: "",
    middlename: "",
    lastname: "",
    purok: "",
    province_id: "1",
    municipal_id: "2",
    barangay_id: "",
  });

  const [editLocation, setEditLocation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Load provinces
  useEffect(() => {
    axios.get("/provinces").then((res) => setProvinces(res.data));
  }, []);

  // Load municipals for selected province
  useEffect(() => {
    if (!form.province_id) return;
    axios.get(`/municipalities/${form.province_id}`).then((res) => setMunicipals(res.data));
  }, [form.province_id]);

  // Load barangays for selected municipal
  useEffect(() => {
    if (!form.municipal_id) return;
    axios.get(`/barangays/${form.municipal_id}`).then((res) => setBarangays(res.data));
  }, [form.municipal_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/facilitate/users", form);
  };

  

  return (
    <AppLayout>
      <Head title="Create User" />
      <div className="p-4 md:p-8">
        <Card className="max-w-4xl mx-auto shadow-lg border dark:border-gray-700">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">User Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input name="password" type="password" value={form.password} onChange={handleChange} required />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Password Confirmation */}
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <Input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} required />
              </div>

              {/* Role */}
              <div>
  <label className="block text-sm font-medium mb-1">Role</label>
  <Select
    onValueChange={(val) => setForm({ ...form, role: val })}
    defaultValue={form.role}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Role" />
    </SelectTrigger>

    <SelectContent className="max-h-60 overflow-y-auto">

      {/* Only show Admin to true admin users */}
      {authRole === "admin" && (
        <SelectItem value="admin">Admin</SelectItem>
      )}

      <SelectItem value="farmer">Farmer</SelectItem>
      <SelectItem value="buyer">Buyer</SelectItem>
      <SelectItem value="enforcer">Enforcer</SelectItem>
    </SelectContent>
  </Select>

  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
</div>


              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input name="firstname" value={form.firstname} onChange={handleChange} required />
                {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input name="lastname" value={form.lastname} onChange={handleChange} required />
                {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Middle Name</label>
                <Input name="middlename" value={form.middlename} onChange={handleChange} />
              </div>

              {/* Purok */}
              <div>
                <label className="block text-sm font-medium mb-1">Purok</label>
                <Input name="purok" value={form.purok} onChange={handleChange} />
                {errors.purok && <p className="text-red-500 text-sm mt-1">{errors.purok}</p>}
              </div>

              {/* Location Edit Trigger */}
              <div className="md:col-span-2">
                <Button type="button" onClick={() => setEditLocation(!editLocation)} variant="outline">
                  {editLocation ? "Hide Location" : "Full Location"}
                </Button>
              </div>

              {editLocation && (
                <>
                  {/* Province */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Province</label>
                    <Select
                      onValueChange={(val) => setForm({ ...form, province_id: val, municipal_id: "", barangay_id: "" })}
                      defaultValue={String(form.province_id)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {provinces.map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Municipal */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Municipal</label>
                    <Select
                      onValueChange={(val) => setForm({ ...form, municipal_id: val, barangay_id: "" })}
                      defaultValue={String(form.municipal_id)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Municipal" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {municipals.map((m) => (
                          <SelectItem key={m.id} value={String(m.id)}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Barangay */}
              <div>
                <label className="block text-sm font-medium mb-1">Barangay</label>
                <Select
                  onValueChange={(val) => setForm({ ...form, barangay_id: val })}
                  defaultValue={String(form.barangay_id)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Barangay" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {barangays.map((b) => (
                      <SelectItem key={b.id} value={String(b.id)}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.barangay_id && <p className="text-red-500 text-sm mt-1">{errors.barangay_id}</p>}
              </div>

              {/* Submit */}
              <div className="md:col-span-2 mt-4">
                <Button type="submit" className="w-full">Create User</Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Shield, 
  Key, 
  User, 
  MapPin, 
  CheckCircle,
  Save,
  XCircle,
  Info,
  Briefcase
} from "lucide-react";
import AppLayout from "@/layouts/admin-layout";

interface UserProps {
  user: any;
  authRole: string;
}

export default function EditUser({ user, authRole }: UserProps) {
  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [municipals, setMunicipals] = useState<{ id: number; name: string }[]>([]);
  const [barangays, setBarangays] = useState<{ id: number; name: string }[]>([]);
  const [editLocation, setEditLocation] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: "",
    password_confirmation: "",
    role: user.role,
    email_verified: !!user.email_verified_at,
    firstname: user.userInformation?.firstname || "",
    middlename: user.userInformation?.middlename || "",
    lastname: user.userInformation?.lastname || "",
    description: user.userInformation?.description || "",
    purok: user.userInformation?.purok || "",
    province_id: user.userInformation?.province_id || "",
    municipal_id: user.userInformation?.municipal_id || "",
    barangay_id: user.userInformation?.barangay_id || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Load all provinces
  useEffect(() => {
    axios.get("/provinces").then((res) => setProvinces(res.data));
  }, []);

  // Load municipals for current province
  useEffect(() => {
    if (!form.province_id) return;
    axios.get(`/municipalities/${form.province_id}`).then((res) => setMunicipals(res.data));
  }, [form.province_id]);

  // Load barangays for current municipal
  useEffect(() => {
    if (!form.municipal_id) return;
    axios.get(`/barangays/${form.municipal_id}`).then((res) => setBarangays(res.data));
  }, [form.municipal_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/admin/facilitate/users/${user.id}`, form);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not verified";
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if user is admin or enforcer
  const isAdminOrEnforcer = user.role === 'admin' || user.role === 'enforcer';
  const canEditDescription = authRole === 'admin' || (authRole === 'enforcer' && user.role === 'enforcer');

  // Custom toggle button component to replace Switch
  const ToggleButton = ({ 
    checked, 
    onChange 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void 
  }) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-green-500' : 'bg-gray-300'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    );
  };

  return (
    <AppLayout>
      <Head title={`Edit User | ${user.name}`} />
      <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Edit User
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update user details and permissions
          </p>
        </div>

        <Card className="shadow-lg border dark:border-gray-700">
          <CardHeader className="border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                  {user.email_verified_at && (
                    <Badge variant="outline" className="ml-2 gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                <Shield className="w-3 h-3 mr-1" />
                {user.role}
              </Badge>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Account Information Section */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-semibold">Account Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">User Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="pl-10"
                          placeholder="user@example.com"
                        />
                      </div>
                    </div>

                    {/* Email Verification */}
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div>
                          <Label htmlFor="email_verified" className="text-base font-medium">
                            Email Verification Status
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Mark this user's email as verified or unverified
                          </p>
                          {user.email_verified_at && (
                            <p className="text-xs text-gray-500 mt-1">
                              Previously verified on: {formatDate(user.email_verified_at)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {form.email_verified ? (
                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              Unverified
                            </span>
                          )}
                          <ToggleButton
                            checked={form.email_verified}
                            onChange={(checked: boolean) => 
                              setForm({ ...form, email_verified: checked })
                            }
                          />
                        </div>
                      </div>
                      
                      {form.email_verified ? (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md mt-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Email will be marked as verified upon saving</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md mt-2">
                          <XCircle className="w-4 h-4" />
                          <span>Email will be marked as unverified upon saving</span>
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role">User Role</Label>
                      <Select
                        onValueChange={(val: string) => setForm({ ...form, role: val })}
                        defaultValue={form.role}
                      >
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <SelectValue placeholder="Select Role" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {authRole === "admin" && <SelectItem value="admin">Admin</SelectItem>}
                          <SelectItem value="farmer">Farmer</SelectItem>
                          <SelectItem value="buyer">Buyer</SelectItem>
                          <SelectItem value="enforcer">Enforcer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Password Section */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Key className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-semibold">Password</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <div className="relative">
                        <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Leave blank to keep current"
                        />
                      </div>
                      <p className="text-xs text-gray-500">At least 8 characters recommended</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password_confirmation">Confirm Password</Label>
                      <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Personal Information Section */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        // required
                        placeholder="First name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        id="lastname"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        // required
                        placeholder="Last name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="middlename">Middle Name (Optional)</Label>
                      <Input
                        id="middlename"
                        name="middlename"
                        value={form.middlename}
                        onChange={handleChange}
                        placeholder="Middle name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purok">Purok/Zone</Label>
                      <Input
                        id="purok"
                        name="purok"
                        value={form.purok}
                        onChange={handleChange}
                        placeholder="Purok or zone number"
                      />
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Description Section - Only for Admin/Enforcer */}
                {isAdminOrEnforcer && canEditDescription && (
                  <>
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <Info className="w-5 h-5 text-gray-500" />
                        <h2 className="text-lg font-semibold">Description / About</h2>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Professional Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          placeholder={`Enter description for this ${user.role}...`}
                          rows={4}
                          className="resize-none"
                        />
                        <p className="text-xs text-gray-500">
                          This description will be visible to users viewing {user.role === 'admin' ? 'admin' : 'enforcer'} profiles.
                        </p>
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Location Section - Change title based on role */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <h2 className="text-lg font-semibold">
                        {isAdminOrEnforcer ? 'Assign to' : 'Location'}
                      </h2>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setEditLocation(!editLocation)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      {editLocation ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Full Location
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Edit Full Location
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Barangay - Always visible */}
                    <div className="space-y-2">
                      <Label htmlFor="barangay">
                        {isAdminOrEnforcer ? 'Assigned Barangay' : 'Barangay'}
                      </Label>
                      <Select
                        onValueChange={(val: string) =>
                          setForm({ ...form, barangay_id: val })
                        }
                        defaultValue={String(form.barangay_id)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isAdminOrEnforcer ? "Select Assigned Barangay" : "Select Barangay"} />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {barangays.map((b) => (
                            <SelectItem key={b.id} value={String(b.id)}>
                              {b.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isAdminOrEnforcer && (
                        <p className="text-xs text-gray-500 mt-1">
                          Select the barangay where this {user.role} is assigned
                        </p>
                      )}
                    </div>

                    {/* Expanded location fields */}
                    {editLocation && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="province">Province</Label>
                          <Select
                            onValueChange={(val: string) =>
                              setForm({ 
                                ...form, 
                                province_id: val, 
                                municipal_id: "", 
                                barangay_id: "" 
                              })
                            }
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

                        <div className="space-y-2">
                          <Label htmlFor="municipal">Municipality/City</Label>
                          <Select
                            onValueChange={(val: string) =>
                              setForm({ 
                                ...form, 
                                municipal_id: val, 
                                barangay_id: "" 
                              })
                            }
                            defaultValue={String(form.municipal_id)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Municipality" />
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
                  </div>

                  {!editLocation && (
                    <p className="text-sm text-gray-500 mt-4">
                      Click "Edit Full Location" to modify province and municipality
                    </p>
                  )}

                  {isAdminOrEnforcer && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            {user.role === 'admin' ? 'Admin Assignment' : 'Enforcer Assignment'}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            {user.role === 'admin' 
                              ? 'Admins oversee multiple areas and have system-wide responsibilities.'
                              : 'Enforcers are typically assigned to specific barangays for field operations.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </CardContent>

            <CardFooter className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 pt-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gap-2 sm:ml-auto sm:w-auto"
                >
                  <Save className="w-4 h-4" />
                  Update User
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
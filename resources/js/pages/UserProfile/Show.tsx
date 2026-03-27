import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from "react";
import { useEffect } from 'react';
import Create from '@/pages/settings/create';
import HeadingSmall from "@/components/heading-small";
import { X } from "lucide-react";


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "User Profile",
    href: "/profile",
  },
];

export default function Show({ user }: { user: any }) {
  // If user information is missing
  const [form, setForm] = useState({
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
    const [isVisible, setIsVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');


    useEffect(() => {
  if (showToast) {
    setIsVisible(true); // fade in immediately

    const timer = setTimeout(() => {
      setIsVisible(false); // start fade out
      setTimeout(() => setShowToast(false), 500); // remove after fade duration
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [showToast]);

 

  if (!user) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-0 text-center space-y-4">
          <p className="text-lg font-semibold text-gray-700">
            You have not completed your profile yet.
          </p>
               <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button size="lg" className="mt-4">
      Complete Profile
      
    </Button>
    
  </DialogTrigger>

  {/* ✅ Responsive & scrollable modal */}
  <DialogContent
    className="
      w-[95vw]
      sm:max-w-lg 
      md:max-w-xl 
      lg:max-w-xl 
      max-h-[120vh]
      overflow-y-auto 
      rounded-2xl 
       p-0 
    "
  >
    <DialogHeader className="sticky top-0 bg-white z-10 ">
       <button className="absolute top-3 left-2" onClick={() => setIsOpen(false)}>
        <X className="h-5 w-5" />
      </button>
      <DialogTitle className="text-xl font-bold  text-center">Complete Information</DialogTitle>
      <DialogDescription className="text-gray-500 text-center">
        Complete your information to continue using the marketplace.
      </DialogDescription>
    </DialogHeader>

    <div className="mt-2 p-10 ">
      {/* ✅ The Create component should be scrollable inside modal */}
      <Create
        onSuccess={(updatedUser: any) => {
          setForm(updatedUser);
          setShowToast(true);
          setToastMessage("Profile saved successfully!");
          setToastType("success");
          setIsOpen(false);
        }}
      />
    </div>

    <DialogFooter >
     
    </DialogFooter>
  </DialogContent>
</Dialog>

        </div>
      </AppLayout>
    );
  }

  return (

    
    <AppLayout breadcrumbs={breadcrumbs}>
       {showToast && (
  <div
    className={`fixed top-4 right-4  rounded-lg text-white shadow-lg transition-opacity duration-500
      ${isVisible ? "opacity-100" : "opacity-0"}
      ${toastType === "success" ? "bg-green-500" : "bg-red-500"}`}
  >
    {toastMessage}
  </div>
)}
      <div className=" bg-gray-50 flex items-center justify-center p-0">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Full Name:</p>
              <p>{`${user.firstname} ${user.middlename ?? ""} ${user.lastname} ${user.extension ?? ""}`}</p>
            </div>
            <div>
              <p className="font-semibold">Contact:</p>
              <p>{user.contact ?? "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Birthdate:</p>
              <p>{user.birthdate ?? "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Gender:</p>
              <p>{user.gender ?? "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Civil Status:</p>
              <p>{user.civil_status ?? "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Occupation:</p>
              <p>{user.occupation ?? "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">Address:</p>
              <p>
                {user.street ? user.street + ", " : ""}
                {user.purok ? user.purok + ", " : ""}
                {user.barangay?.name ? user.barangay.name + ", " : ""}
                {user.municipal?.name ? user.municipal.name + ", " : ""}
                {user.province?.name ?? ""}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">Status:</p>
              <p>{user.status ?? "N/A"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

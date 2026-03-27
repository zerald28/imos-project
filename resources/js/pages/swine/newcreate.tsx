// File: resources/js/Pages/Swine/Create.tsx
import AppLogoIcon from '@/components/app-logo-icon';
import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';// File: resources/js/Pages/Swine/Index.tsx
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type BreadcrumbItem } from '@/types';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Swine/Add',
    href: '/swine',
  },
];


interface ToastProps {
  title?: string;
  description?: string;
}

interface ToastContextValue {
  toast: (props: ToastProps) => void;
}
const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);
interface PageProps {
  breeds?: { id: number; name: string }[]; // optional
}

export default function Create({ breeds }: PageProps) {
  const { data, setData, post,reset, processing, errors } = useForm({
    tag_number: "",
    sex: "",
    birthdate: "",
    breed_id: "",
    cuztom_breed: "",
    category: "",
    purpose: "undecided",
    weight: "",
    description: "",
  });

const [showModal, setShowModal] = React.useState(false)
const [modalStep, setModalStep] = React.useState(0)


  const [open, setOpen] = React.useState(false)

const missingFields = {
  category: !data.category,
  sex: !data.sex,
}


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (missingFields.category || missingFields.sex) {
    setShowModal(true); // show modal if required fields are missing
    return;
  }

  post("/swine", {
    onSuccess: () => {
      reset('category','birthdate','breed_id','cuztom_breed'); // reset form fields
      setShowModal(false);
      setModalStep(0);
     
    },
  });
};





  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Register Swine" />

      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-2xl flex-col gap-6">


          <div className="flex flex-col gap-2">
            <Card className="rounded-xl">
              <Link href={home()} className="flex items-center gap-2 self-center font-medium">
                <div className="flex h-9 w-9 items-center justify-center">
                  <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                </div>
              </Link>
              <CardHeader className="px-10 pb-0 text-center">
                <CardTitle className="text-xl">Register New Swine </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="px-10 py-4">

                <form onSubmit={handleSubmit} className="flex flex-col gap-6"  >
                  {/* Category */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Category:</label>
                    </div>

                    {/* Select */}
                    <div className="sm:col-span-5">
                      <Select
                        value={data.category}
                        onValueChange={(value) => setData("category", value)}
                      >
                        <SelectTrigger className="w-full border rounded px-3 py-2 h-12 cols-span-2">
                          <SelectValue placeholder="Category of your swine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="piglet">Piglet</SelectItem>
                          <SelectItem value="barrow">Barrow</SelectItem>
                          <SelectItem value="gilt">Gilt</SelectItem>
                          <SelectItem value="sow">Sow</SelectItem>
                          <SelectItem value="boar">Boar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>



                  {/* Tag number */}

                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Tag Number (optional):</label>
                    </div>
                    <div className="sm:col-span-5">
                      <input
                        placeholder="ex. 001"
                        type="text"
                        value={data.tag_number}
                        onChange={(e) => setData("tag_number", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                      {errors.tag_number && (
                        <p className="text-red-500 text-sm">{errors.tag_number}</p>
                      )}
                    </div>
                  </div>

                  {/* Sex */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Sex:</label>
                    </div>
                    <div className="sm:col-span-5">
                      <Select
                        value={data.sex}
                        onValueChange={(value) => setData("sex", value)}
                      >
                        <SelectTrigger className="w-full border rounded px-3 py-2 h-12 cols-span-2">
                          <SelectValue placeholder="Male or Female" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.sex && (
                        <p className="text-red-500 text-sm">{errors.sex}</p>
                      )}
                    </div>
                  </div>

                  {/* Birthdate */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Birthdate:</label>
                    </div>
                    <div className="sm:col-span-5">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between text-base opacity-60"
                          >
                            {data.birthdate
                              ? new Date(data.birthdate).toLocaleDateString()
                              : "Select date"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            className="w-60
                   text-lg [&_.rdp-nav_button]:mt-2"
                            mode="single"
                            selected={data.birthdate ? new Date(data.birthdate) : undefined}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (date) {
                                // Save ISO format (YYYY-MM-DD) for database compatibility
                                const formatted = date.toISOString().split("T")[0]
                                setData("birthdate", formatted)
                              }
                              setOpen(false)
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <div className="sm:col-span-5">
                      </div>
                      {errors.birthdate && (
                        <p className="text-red-500 text-sm">{errors.birthdate}</p>
                      )}
                    </div>
                  </div>


                  {/* Breed */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Breeding:</label>
                    </div>

                    <div className="sm:col-span-5">
                    <Select
                      value={data.breed_id}
                      onValueChange={(value) => setData("breed_id", value)}
                    >
                      <SelectTrigger className="w-full border rounded px-3 py-2">
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {breeds?.map((b) => (
                          <SelectItem key={b.id} value={String(b.id)}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.breed_id && (
                      <p className="text-red-500 text-sm">{errors.breed_id}</p>
                    )}
                  </div></div>


                  {/* Custom Breed */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Custom Breeding:</label>
                    </div>
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={data.cuztom_breed}
                        onChange={(e) => setData("cuztom_breed", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>


                  {/* Purpose */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Purpose:</label>
                    </div>

                    {/* Select */}
                    <div className="sm:col-span-5">
                      <Select
                        value={data.purpose}
                        onValueChange={(value) => setData("purpose", value)}
                      >
                        <SelectTrigger className="w-full border rounded px-3 py-2 h-12 cols-span-2">
                          <SelectValue placeholder="Category of your swine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fattening">Fattening</SelectItem>
                          <SelectItem value="slaughter">Slaughter</SelectItem>
                          <SelectItem value="sale_as_piglet">Sale as Piglet</SelectItem>
                          <SelectItem value="breeding_sow">Breeding Sow</SelectItem>
                          <SelectItem value="breeding_boar">Breeding Boar</SelectItem>
                          <SelectItem value="undecided">Undecided</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Weight (kg):</label>
                    </div>
                    <div className="sm:col-span-5">
                      <input
                        type="number"
                        step="0.01"
                        value={data.weight}
                        onChange={(e) => setData("weight", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-10 items-center ">
                    {/* Label */}
                    <div className="sm:col-span-3">
                      <label className="block mb-1 sm:text-right sm:mr-2">Description:</label>
                    </div>
                    <div className="sm:col-span-5">

                      <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div></div>

                  {/* Submit */}
                  <div className="flex justify-end">
                   <button
      type="submit" // important!
      disabled={processing}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      {processing ? "Saving..." : "Save Swine"}
    </button>
                  </div>

                  <Button  disabled={processing}
  type="button"
  onClick={() => {
    if (missingFields.category || missingFields.sex) {
      setShowModal(true) // open modal if any required field is empty
    } else {
      post("/swine") // submit directly if nothing missing
    }
  }}
>
  {processing ? "Saving..." : "Save Swine"}
</Button>

                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </AppLayout>
  );
}

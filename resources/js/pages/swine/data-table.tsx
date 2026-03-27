// File: resources/js/Pages/Swine/Create.tsx
import AppLogoIcon from '@/components/app-logo-icon';
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import  { useRef, useEffect, useState} from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type BreadcrumbItem } from '@/types';
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { isToday } from 'date-fns';
import { useRemember } from "@inertiajs/react";


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Swine/Add',
    href: '/swine',
  },
];

interface PageProps {
  breeds?: { id: number; name: string }[];
}


type FormRowProps = {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
};

// ✅ forwardRef so `ref` works
const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ label, id, children, error }, ref) => {
    return (
      <div ref={ref} className="mb-2  grid grid-cols-1 lg:grid-cols-10 items-center">
        <div className="lg:col-span-3">
          <label
            htmlFor={id}
            className="block mb-1 font-semibold md:text-md sm:text-sm lg:text-right sm:mr-2"
          >
            {label}
          </label>
        </div>
        <div className="lg:col-span-7">
          {children}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);

// ✅ For better debugging in React DevTools
FormRow.displayName = "FormRow";




export default function Create({ breeds, today }: PageProps & { today: string }) {
  const { data, setData, post, reset, processing, errors } = useForm({
    tag_number: "",
    sex: "male",
    birthdate: today,
    breed_id: "",
    cuztom_breed: "",
    category: "piglet",
    purpose: "fattening",
    weight: "",
    description: "",
  });

  


  const [open, setOpen] = React.useState(false);
  
  const pageRef = useRef<HTMLDivElement | null>(null);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  post("/swine-management/swine", {
    onSuccess: () => {
      reset("sex", "weight", "tag_number", "description", "purpose");
      toast.success("Swine registered successfully!");
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo(0, 0);
      }
    },
    onError: () => {
      toast.error("Please fix the errors in the form.");
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
  });
};



  // State toggle
  const [showCustomBreed, setShowCustomBreed] = React.useState(false);
const customBreedRef = useRef<HTMLInputElement | null>(null);



// Keep track of refs by field name
const fieldRefs = {
  category: useRef<HTMLDivElement | null>(null),
  tag_number: useRef<HTMLInputElement | null>(null),
  sex: useRef<HTMLDivElement | null>(null),
  birthdate: useRef<HTMLDivElement | null>(null),
  purpose: useRef<HTMLDivElement | null>(null),
  weight: useRef<HTMLInputElement | null>(null),
  breed_id: useRef<HTMLDivElement | null>(null),
  cuztom_breed: useRef<HTMLInputElement | null>(null),
  description: useRef<HTMLTextAreaElement | null>(null),
};




// Handle breed selection

const handleBreedChange = (value: string) => {
  if (value === "custom") {
    setShowCustomBreed(true);
    setData("breed_id", ""); // clear breed id

    // wait a short moment for input to mount, then focus
    // 20-100ms usually enough; increase if necessary
    window.setTimeout(() => {
      customBreedRef.current?.focus();
      // optionally select existing text if any:
      customBreedRef.current?.select?.();
    }, 50);
  } else {
    setShowCustomBreed(false);
    setData("breed_id", value);
    setData("cuztom_breed", ""); // clear custom breed
  }
};


// When showCustomBreed changes to true → focus input
useEffect(() => {
  if (showCustomBreed && customBreedRef.current) {
    customBreedRef.current.focus();
  }
}, [showCustomBreed]);

//Scrollable when routed


const mainContentRef = useRef<HTMLDivElement | null>(null);
const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Only scroll the first time this page loads
    if (!hasScrolled && mainContentRef.current) {
      const top = mainContentRef.current.getBoundingClientRect().top + window.scrollY - 90; // adjust offset for navbar
      window.scrollTo({
        top,
        behavior: "smooth",
      });
      setHasScrolled(true); // mark as scrolled so next time we don't auto-scroll
    }
  }, [hasScrolled]);



// Handle custom breed typing
const handleCustomBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setData("cuztom_breed", e.target.value);
  setData("breed_id", ""); // clear breed_id if user is typing custom breed
};


const formWrapperRef = useRef<HTMLDivElement | null>(null);



// --- Birthdate & Age interlink logic ---
const [ageInDays, setAgeInDays] = useState<number | string>("");
const [stage, setStage] = useState<string>(""); // 👈 add this

// Auto-update age when birthdate changes
useEffect(() => {
  if (data.birthdate) {
    const birth = new Date(data.birthdate);
    const today = new Date();
    const diffTime = today.getTime() - birth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Only show if valid (not negative)
    if (diffDays >= 0) {
      setAgeInDays(diffDays);
    } else {
      setAgeInDays("");
    }
  }
}, [data.birthdate]);

// Auto-update birthdate when age changes
const handleAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const days = parseInt(e.target.value);
  setAgeInDays(e.target.value);

  if (!isNaN(days) && days >= 0) {
    const today = new Date();
    const birth = new Date(today);
    birth.setDate(today.getDate() - days);
    const formatted = birth.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    setData("birthdate", formatted);
  } else {
    setData("birthdate", "");
  }
};



  return (


    // <div  className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    // <div className="flex w-full max-w-2xl flex-col gap-6">
     <div ref={pageRef} className="flex flex-col  ">
      <Card className="rounded-xl dark:bg-sidebar">
        <Link href={home()} className="flex items-center gap-1 self-center font-medium">
          <div className="flex h-9 w-9 items-center justify-center">
            <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
          </div>
        </Link>
        <CardHeader className="px-10 pb-0 text-center">
          <CardTitle className="text-xl">Register New Swine</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 ">
          <form onSubmit={handleSubmit}  className="flex flex-col gap-6 grid font-mediumsm:grid-cols-2  ">
             
                          {/* Birthdate (now shown first) */}
<FormRow label="Birthdate:" id="birthdate" error={errors.birthdate}>
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        id="birthdate"
        className="w-full justify-between text-base opacity-60 select-trigger"
      >
        {data.birthdate
          ? new Date(data.birthdate).toLocaleDateString()
          : "Select date"}
        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto overflow-hidden p-0" align="center">
      <Calendar
        className="w-75 rounded-lg shadow-md bg-white dark:bg-gray-900 
          [&_.rdp-day]:w-10 [&_.rdp-day]:h-10  
          [&_.rdp-day_selected]:bg-green-500 
          [&_.rdp-day_selected]:text-white
          [&_.rdp-day]:text-base [&_.rdp-nav_button]:mt-2"
        mode="single"
        selected={data.birthdate ? new Date(data.birthdate) : undefined}
        captionLayout="dropdown"
        onSelect={(date) => {
          if (date) {
            const formatted = date.toLocaleDateString("sv-SE");
            setData("birthdate", formatted);
          }
          setOpen(false);
        }}
      />
    </PopoverContent>
  </Popover>
</FormRow>

{/* Age in Days */}
<FormRow label="Age (days):" id="age">
  <input
    id="age"
    type="number"
    min="0"
    placeholder="Enter age in days"
    value={ageInDays}
    onChange={handleAgeInput}
    className="w-full border rounded px-3 py-2"
  />
</FormRow>

  {/* Sex */}
                            <FormRow label="Sex Classification:" id="sex" error={errors.sex}>
                              <Select
                                value={data.sex}
                                onValueChange={(value) => setData("sex", value)}
                              >
                                <SelectTrigger id="sex"   className="select-trigger w-full border rounded px-3 py-2 h-12">
                                  <SelectValue placeholder="Male or Female" />
                                </SelectTrigger>
                                <SelectContent className='dark:bg-gray-800'>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormRow>

{/* Category (moved below birthdate now) */}
<FormRow label="Category:" id="category" error={errors.category}>
  <Select
    value={data.category}
    onValueChange={(value) => setData("category", value)}
  >
    <SelectTrigger id="category" className="select-trigger w-full border rounded px-3 py-2 h-12">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className='dark:bg-gray-800'>
      <SelectItem value="piglet">Piglet</SelectItem>
      <SelectItem value="barrow">Barrow</SelectItem>
      <SelectItem value="gilt">Gilt</SelectItem>
      <SelectItem value="sow">Sow</SelectItem>
      <SelectItem value="boar">Boar</SelectItem>
    </SelectContent>
  </Select>
</FormRow>


                            {/* Tag Number */}
                            <FormRow label="Tag Number (optional):" id="tag_number" error={errors.tag_number}>
                              <input
                                id="tag_number"
                                placeholder="ex. 001"
                                type="text"
                                value={data.tag_number}
                                onChange={(e) => setData("tag_number", e.target.value)}
                                className="w-full border rounded text-bold px-3 py-2"
                              />
                            </FormRow>

                          

                           
                        

                             
                                
                                                       {/* Purpose */}
                            <FormRow label="Purpose:" id="purpose" ref={fieldRefs.purpose}  error={errors.purpose}>
                              <Select
                                value={data.purpose}
                                onValueChange={(value) => setData("purpose", value)}
                              >
                                <SelectTrigger id="purpose"     className="select-trigger w-full border rounded px-3 py-2 h-12">
                                  <SelectValue className="" placeholder="Ex. Sale for Fattening" />
                                </SelectTrigger>
                                <SelectContent className='dark:bg-gray-800'>
                                  <SelectItem value="fattening">Fattening</SelectItem>
                                  <SelectItem value="slaughter">Slaughter</SelectItem>
                                  <SelectItem value="sale_as_piglet">Sale as Piglet</SelectItem>
                                  <SelectItem value="breeding_sow">Breeding Sow</SelectItem>
                                  <SelectItem value="breeding_boar">Breeding Boar</SelectItem>
                                  <SelectItem value="undecided">Undecided</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormRow>

                            {/* Weight */}
                            <FormRow label="Weight (kg):" id="weight" error={errors.weight}>
                              <input
                               placeholder='ex. 30'
                                id="weight"
                                type="number"
                                step="0.01"
                                value={data.weight}
                                onChange={(e) => setData("weight", e.target.value)}
                                className="w-full border rounded px-3 py-2"
                              />
                            </FormRow>

                                        {/* Breed */}
                            <div className="mb-4 grid grid-cols-1 lg:grid-cols-10 items-center ">
                              <div className="md:col-span-3">
                                <label className="block mb-1 lg:text-right font-semibold sm:mr-2 md:text-md sm:text-sm">Breed:</label>
                              </div>

                              <div className="md:col-span-7 " ref={mainContentRef} >
                                <Select
                                  value={data.breed_id || (showCustomBreed ? "custom" : "")}
                                  onValueChange={handleBreedChange}
                                >
                                  <SelectTrigger   className="select-trigger w-full border rounded px-3 py-2 h-12">
                                    <SelectValue placeholder="Select breed" />
                                  </SelectTrigger>
                                  <SelectContent className='dark:bg-gray-800'>
                                    {breeds?.map((b) => (
                                      <SelectItem key={b.id} value={String(b.id)}>
                                        {b.name}
                                      </SelectItem>
                                    ))}
                                    {/* Option to enable custom breed */}
                                    <SelectItem value="custom">Other (Custom Breed)</SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors.breed_id && (
                                  <p className="text-red-500 text-sm">{errors.breed_id}</p>
                                )}
                              </div>
                            </div>

                            {/* Custom Breed (only appears if user chooses custom) */}
                            {showCustomBreed && (
                              <div className="mb-4 grid grid-cols-1 lg:grid-cols-10 items-center ">
                                <div className="md:col-span-3">
                                  <label className="block mb-1 font-semibold lg:text-right sm:mr-2 md:text-md sm:text-sm">Custom Breed:</label>
                                </div>
                                <div className="md:col-span-7">
                                    <input
      ref={customBreedRef}
      type="text"
      placeholder="Enter custom breed (e.g., crossbreed)"
      value={data.cuztom_breed}
      onChange={handleCustomBreedChange}
      // hide visually but keep in DOM; toggle tabIndex/aria-hidden for accessibility
      className={`w-full border rounded px-3 py-2 transition-all 
        ${showCustomBreed ? "opacity-100 max-h-40 visible" : "opacity-0 max-h-0 invisible"}`}
      aria-hidden={!showCustomBreed}
      tabIndex={showCustomBreed ? 0 : -1}
    />
                                </div>
                              </div>
                            )}





                            <div className="sm:col-span-2">
                                 <div className="mb-4 grid grid-cols-1 lg:grid-cols-20 items-center ">
                                <div className="sm:col-span-3">
                                  <label className="block mb-1 lg:text-right font-semibold sm:mr-2 md:text-md sm:text-sm">Description</label>
                                  
                                </div>
                                <div className="sm:col-span-17  ">
                                    <textarea
                                   
                                      id="description"
                                      value={data.description}
                                      onChange={(e) => setData("description", e.target.value)}
                                      className="w-full border rounded px-3 py-2 select-trigger"
                                    />
                                 </div></div>
                               
</div>
                            {/* Submit */}
                            <div className=" ">
                              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 items-center ">
                              <Button
                                type="submit"
                                disabled={processing}
                                className="bg-sidebar-primary hover:bg-sidebar-primary/70 text-white px-4 py-2 rounded"
                              >
                                {processing ? "Saving..." : "Save Swine"}
                              </Button>
                              </div>
                            </div>

                            
          </form>
        </CardContent>
      </Card>
   
</div>


  );
}

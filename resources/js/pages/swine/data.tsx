// File: resources/js/Pages/Swine/Create.tsx
import AppLogoIcon from '@/components/app-logo-icon';
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useEffect, useState } from "react";
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
  ownerTagNumbers?: string[];
  nextTag?: string | number;
  maxSwineLimit?: number;
}

interface CreateProps extends PageProps {
  today: string;
}

type FormRowProps = {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
};

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ label, id, children, error }, ref) => {
    return (
      <div ref={ref} className="mb-2 grid grid-cols-1 lg:grid-cols-10 items-center">
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

FormRow.displayName = "FormRow";

export default function Create({ breeds = [], today, ownerTagNumbers = [], nextTag, maxSwineLimit = 50 }: CreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    total_swine: 0, // Start at 0, will be calculated from male + female
    male_count: 0,
    female_count: 0,
    tag_numbers: [] as string[],
    sex: "male",
    birthdate: today,
    breed_id: "",
    cuztom_breed: "",
    purpose: "fattening",
    weight: "",
    description: "",
  });

  const [open, setOpen] = React.useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [showCustomBreed, setShowCustomBreed] = React.useState(false);
  const customBreedRef = useRef<HTMLInputElement | null>(null);
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Calculate total from male and female counts
  useEffect(() => {
    const total = (data.male_count || 0) + (data.female_count || 0);
    setData("total_swine", total);
  }, [data.male_count, data.female_count]);

  // Auto-generate tag numbers when total changes
  useEffect(() => {
    if (data.total_swine > 0) {
      generateTagNumbers();
    } else {
      setData("tag_numbers", []);
    }
  }, [data.total_swine]);

  const generateTagNumbers = () => {
    const existing = new Set(ownerTagNumbers ?? []);
    const newTags: string[] = [];
    let num = 1;
    
    if (nextTag && !Number.isNaN(Number(nextTag))) {
      num = parseInt(nextTag as string, 10);
    }

    let safety = 0;
    while (newTags.length < data.total_swine && safety < 5000) {
      const tagNumber = `SWN-${String(num).padStart(3, "0")}`;
      if (!existing.has(tagNumber)) {
        newTags.push(tagNumber);
      }
      num++;
      safety++;
    }

    setData("tag_numbers", newTags);
    
    if (newTags.length > 0) {
      toast.success(`Generated ${newTags.length} new tag number(s).`, {
        id: "swine-tags",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.total_swine === 0) {
      toast.error("Please add at least one swine.");
      return;
    }

    const duplicates = data.tag_numbers.filter(tag =>
      (ownerTagNumbers ?? []).includes(tag)
    );

    if (duplicates.length > 0) {
      toast.error(`Duplicate tag number(s) detected: ${duplicates.join(", ")}`);
      mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    post("/swine-management/swine/multicreate", {
      onSuccess: () => {
        reset("sex", "weight", "tag_numbers", "description", "purpose");
        toast.success("Swine registered successfully!");
        mainContentRef.current?.scrollTo(0, 0);
      },
      onError: (err) => {
        toast.error("Please fix the errors in the form.");
        mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    });
  };

  const handleBreedChange = (value: string) => {
    if (value === "custom") {
      setShowCustomBreed(true);
      setData("breed_id", "");
      window.setTimeout(() => {
        customBreedRef.current?.focus();
        customBreedRef.current?.select?.();
      }, 50);
    } else {
      setShowCustomBreed(false);
      setData("breed_id", value);
      setData("cuztom_breed", "");
    }
  };

  useEffect(() => {
    if (showCustomBreed && customBreedRef.current) {
      customBreedRef.current.focus();
    }
  }, [showCustomBreed]);

  useEffect(() => {
    if (!hasScrolled && mainContentRef.current) {
      const top = mainContentRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  const handleCustomBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("cuztom_breed", e.target.value);
    setData("breed_id", "");
  };

  const [ageInDays, setAgeInDays] = useState<number | string>("");

  useEffect(() => {
    if (data.birthdate) {
      const birth = new Date(data.birthdate);
      const today = new Date();
      const diffTime = today.getTime() - birth.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0) {
        setAgeInDays(diffDays);
      } else {
        setAgeInDays("");
      }
    }
  }, [data.birthdate]);

  const handleAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value);
    setAgeInDays(e.target.value);

    if (!isNaN(days) && days >= 0) {
      const today = new Date();
      const birth = new Date(today);
      birth.setDate(today.getDate() - days);
      const formatted = birth.toLocaleDateString("sv-SE");
      setData("birthdate", formatted);
    } else {
      setData("birthdate", "");
    }
  };

  // Category preview for both male and female
  const getCategoryForSex = (sex: 'male' | 'female') => {
    if (!data.birthdate) return null;
    
    const birth = new Date(data.birthdate);
    const today = new Date();
    const ageInDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    
    if (ageInDays <= 70) {
      return "Piglet";
    } else if (sex === 'male') {
      return ageInDays <= 150 ? "Barrow" : "Boar";
    } else {
      return ageInDays <= 150 ? "Gilt" : "Sow";
    }
  };

  const maleCategory = getCategoryForSex('male');
  const femaleCategory = getCategoryForSex('female');

  return (
    <div ref={pageRef} className="flex flex-col dark:bg-gray-900 gap-4 p-4 md:p-4">
      <Card className="rounded-xl dark:bg-gray-900">
        <CardHeader className="px-10 pb-0 text-center">
          <CardTitle className="text-xl">Register New Swine</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 grid font-mediumsm:grid-cols-2">

          

            {/* Male / Female distribution */}
            <div className="relative w-full">
              <div className="grid grid-cols-2 gap-4">
                <FormRow label="Male:" id="male_count">
                  <input
                    type="number"
                    min={0}
                    max={maxSwineLimit}
                    value={data.male_count === 0 ? "" : data.male_count}
                    onChange={(e) => {
                      let val = e.target.value.replace(/^0+/, "");
                      if (!/^\d*$/.test(val)) return;
                      
                      let maleCount = val === "" ? 0 : parseInt(val);
                      const totalAfterChange = maleCount + (data.female_count || 0);
                      
                      if (totalAfterChange > maxSwineLimit) {
                        toast.error(`Total cannot exceed ${maxSwineLimit} swine.`);
                        maleCount = maxSwineLimit - (data.female_count || 0);
                        if (maleCount < 0) maleCount = 0;
                      }
                      
                      setData("male_count", maleCount);
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") setData("male_count", 0);
                    }}
                    className="w-full border rounded px-3 py-2"
                  />
                </FormRow>
                
                <FormRow label="Female:" id="female_count">
                  <input
                    type="number"
                    min={0}
                    max={maxSwineLimit}
                    value={data.female_count === 0 ? "" : data.female_count}
                    onChange={(e) => {
                      let val = e.target.value.replace(/^0+/, "");
                      if (!/^\d*$/.test(val)) return;
                      
                      let femaleCount = val === "" ? 0 : parseInt(val);
                      const totalAfterChange = (data.male_count || 0) + femaleCount;
                      
                      if (totalAfterChange > maxSwineLimit) {
                        toast.error(`Total cannot exceed ${maxSwineLimit} swine.`);
                        femaleCount = maxSwineLimit - (data.male_count || 0);
                        if (femaleCount < 0) femaleCount = 0;
                      }
                      
                      setData("female_count", femaleCount);
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") setData("female_count", 0);
                    }}
                    className="w-full border rounded px-3 py-2"
                  />
                </FormRow>
              </div>
            </div>

              {/* Total Swine - Read-only display */}
            <FormRow label="Total Swine:" id="total_swine" error={errors.total_swine}>
              <div className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800">
                {data.total_swine}
              </div>
            </FormRow>

            {/* Birthdate */}
            <FormRow label="Birthdate:" id="birthdate" error={errors.birthdate}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="birthdate"
                    className="w-full justify-between text-base bg-sidebar opacity-60 select-trigger"
                  >
                    {data.birthdate
                      ? new Date(data.birthdate).toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden bg-sidebar p-0" align="center">
                  <Calendar
                    className="w-80 rounded-lg shadow-md bg-white dark:bg-sidebar
                      [&_.rdp-day]:w-10 [&_.rdp-day]:h-10  
                      [&_.rdp-day_selected]:bg-sidebar-primary
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

            {/* Category Preview - Now shows both male and female categories */}
            {(maleCategory || femaleCategory) && data.total_swine > 0 && (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded col-span-2">
                <p className="text-sm font-medium mb-2">Auto-assigned categories:</p>
                <div className="grid grid-cols-2 gap-4">
                  {data.male_count > 0 && maleCategory && (
                    <div className="text-sm">
                      <span className="font-medium">Male ({data.male_count}):</span>{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {maleCategory}
                      </span>
                    </div>
                  )}
                  {data.female_count > 0 && femaleCategory && (
                    <div className="text-sm">
                      <span className="font-medium">Female ({data.female_count}):</span>{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {femaleCategory}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tag Numbers - Auto-generated based on total */}
            <FormRow label="Tag Numbers:" id="tag_numbers">
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={generateTagNumbers}
                  className="mb-2"
                >
                  Regenerate Tag Numbers
                </Button>

                {Array.from({ length: data.total_swine }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-8">{i + 1}.</span>
                    <input
                      type="text"
                      placeholder={`SWN-${String(i + 1).padStart(3, "0")}`}
                      value={data.tag_numbers[i] || ""}
                      onChange={(e) => {
                        const updated = [...data.tag_numbers];
                        updated[i] = e.target.value;
                        setData("tag_numbers", updated);
                      }}
                      className={`flex-1 border rounded px-3 py-2 ${
                        errors[`tag_numbers.${i}`] ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </FormRow>

            {/* Purpose */}
            <FormRow label="Purpose:" id="purpose" error={errors.purpose}>
              <Select
                value={data.purpose}
                onValueChange={(value) => setData("purpose", value)}
              >
                <SelectTrigger id="purpose" className="select-trigger w-full border rounded px-3 py-2 h-12">
                  <SelectValue placeholder="Ex. Sale for Fattening" />
                </SelectTrigger>
                <SelectContent className='dark:bg-gray-800'>
                  <SelectItem value="fattening">Fattening (ibenta ang karne)</SelectItem>
                  <SelectItem value="slaughter">Slaughter (pang sariling konsumo)</SelectItem>
                  <SelectItem value="sale_as_piglet">Sale as Piglet</SelectItem>
                  <SelectItem value="breeding_sow">Breeding Sow (inahing pang‑palahi)</SelectItem>
                  <SelectItem value="breeding_boar">Breeding Boar (barakong pang‑palahi)</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>

            {/* Weight */}
            <FormRow label="Weight (kg):" id="weight" error={errors.weight}>
              <input
                placeholder='(optional) ex. 30'
                id="weight"
                type="number"
                step="0.01"
                value={data.weight}
                onChange={(e) => setData("weight", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </FormRow>

            {/* Breed */}
            <div className="mb-4 grid grid-cols-1 lg:grid-cols-10 items-center">
              <div className="md:col-span-3">
                <label className="block mb-1 lg:text-right font-semibold sm:mr-2 md:text-md sm:text-sm">Breed:</label>
              </div>
              <div className="md:col-span-7" ref={mainContentRef}>
                <Select
                  value={data.breed_id || (showCustomBreed ? "custom" : "")}
                  onValueChange={handleBreedChange}
                >
                  <SelectTrigger className="select-trigger w-full border rounded px-3 py-2 h-12">
                    <SelectValue placeholder="breed ng baboy" />
                  </SelectTrigger>
                  <SelectContent className='dark:bg-gray-800'>
                    {breeds?.map((b) => (
                      <SelectItem key={b.id} value={String(b.id)}>
                        {b.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Other (ilagay ang angkop na breeding)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.breed_id && (
                  <p className="text-red-500 text-sm">{errors.breed_id}</p>
                )}
              </div>
            </div>

            {/* Custom Breed */}
            {showCustomBreed && (
              <div className="mb-4 grid grid-cols-1 lg:grid-cols-10 items-center">
                <div className="md:col-span-3">
                  <label className="block mb-1 font-semibold lg:text-right sm:mr-2 md:text-md sm:text-sm">Custom Breed:</label>
                </div>
                <div className="md:col-span-7">
                  <input
                    ref={customBreedRef}
                    type="text"
                    placeholder="ilagay ang angkop na breeding (e.g., crossbreed)"
                    value={data.cuztom_breed}
                    onChange={handleCustomBreedChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="sm:col-span-2">
              <div className="mb-4 grid grid-cols-1 lg:grid-cols-20 items-center">
                <div className="sm:col-span-3">
                  <label className="block mb-1 lg:text-right font-semibold sm:mr-2 md:text-md sm:text-sm">Description</label>
                </div>
                <div className="sm:col-span-17">
                  <textarea
                    placeholder='Mag bigay ng deskription ng baboy (kulay ng balat at iba pang palatandaan) - optional'
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="w-full border rounded px-3 py-2 select-trigger"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="">
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-center">
                <Button
                  type="submit"
                  disabled={processing || data.total_swine === 0}
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
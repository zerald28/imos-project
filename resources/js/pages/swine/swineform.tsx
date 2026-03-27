import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

/* --------------------
   TYPE DEFINITIONS
--------------------- */
type Swine = {
  id: number;
  tag_number: string;
  sex: "male" | "female";
  stage: string;
  breed_id?: string | null;
  cuztom_breed?: string | null;
  purpose: string;
  category: string;
  weight?: string;
  description?: string;
  birthdate: string;
  breed?: { name: string } | null;
};

interface Props {
  swine: Swine;
  breeds?: { id: number; name: string }[];
  open: boolean;
  onClose: () => void;
  onUpdate?: (data: any) => void;
}

// Valid category-sex mappings (by sex)
const sexCategoryMapping: Record<"male" | "female", string[]> = {
  male: ['piglet', 'barrow', 'boar'], // Male can be piglet, barrow, or boar
  female: ['piglet', 'gilt', 'sow']    // Female can be piglet, gilt, or sow
};

// Get allowed categories for a given sex
const getAllowedCategoriesForSex = (sex: string): string[] => {
  if (!sex) return ['piglet', 'barrow', 'gilt', 'sow', 'boar']; // All if no sex selected
  return sexCategoryMapping[sex as "male" | "female"] || [];
};

// Check if a sex-category combination is valid
const isValidSexCategoryCombination = (sex: string, category: string): boolean => {
  if (!sex || !category) return true; // Don't validate if either is empty
  const allowedCategories = getAllowedCategoriesForSex(sex);
  return allowedCategories.includes(category);
};

export default function SwineFormModal({
  swine,
  breeds,
  open,
  onClose,
  onUpdate,
}: Props) {
  const { data, setData, put, processing, errors } = useForm({
    tag_number: swine.tag_number || "",
    sex: swine.sex || "",
    birthdate: swine.birthdate || "",
    breed_id: swine.breed_id || "",
    cuztom_breed: swine.cuztom_breed || "",
    category: swine.category || "",
    purpose: swine.purpose || "",
    weight: swine.weight || "",
    description: swine.description || "",
  });

  const [showCustomBreed, setShowCustomBreed] = useState(
    !!swine.cuztom_breed
  );
  const [validationError, setValidationError] = useState<string>("");

  const customBreedRef = useRef<HTMLInputElement | null>(null);

  // Validate sex-category combination whenever either changes
  useEffect(() => {
    if (data.sex && data.category) {
      if (!isValidSexCategoryCombination(data.sex, data.category)) {
        setValidationError(`${data.category} is not a valid category for ${data.sex}. Please select a different category.`);
      } else {
        setValidationError("");
      }
    } else {
      setValidationError("");
    }
  }, [data.sex, data.category]);

  // Re-sync form data whenever the swine prop changes
  useEffect(() => {
    setData({
      tag_number: swine.tag_number || "",
      sex: (swine.sex as "male" | "female") || "",
      birthdate: swine.birthdate || "",
      breed_id: swine.breed_id || "",
      cuztom_breed: swine.cuztom_breed || "",
      category: swine.category || "",
      purpose: swine.purpose || "",
      weight: swine.weight || "",
      description: swine.description || "",
    } as typeof data);

    setShowCustomBreed(!!swine.cuztom_breed);
  }, [swine]);

  // Automatically focus custom breed input when it appears
  useEffect(() => {
    if (showCustomBreed && customBreedRef.current) {
      customBreedRef.current.focus();
    }
  }, [showCustomBreed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submit
    if (data.sex && data.category && !isValidSexCategoryCombination(data.sex, data.category)) {
      toast.error(`Invalid combination: ${data.category} is not valid for ${data.sex}`);
      return;
    }

    put(`/swine-management/swine/${swine.id}`, {
      onSuccess: () => {
        toast.success(`Swine ${swine.tag_number || swine.id} updated successfully!`);
        onClose();
        if (onUpdate) onUpdate(data);
      },
      onError: () => {
        toast.error("Please fix the errors in the form.");
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

  const handleSexChange = (value: "male" | "female") => {
    setData("sex", value);
    
    // If current category is not allowed for the new sex, clear it
    if (data.category && !isValidSexCategoryCombination(value, data.category)) {
      setData("category", "");
      toast.info(`Category cleared. Please select a valid category for ${value}.`);
    }
  };

  // Get available categories based on current sex
  const getAvailableCategories = () => {
    return getAllowedCategoriesForSex(data.sex);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Swine</DialogTitle>
        </DialogHeader>
         
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
          <ScrollArea className="h-[70vh]">
            {/* Sex - Select this first */}
            <label htmlFor="sex">Sex:</label>
            <Select
              value={data.sex}
              onValueChange={handleSexChange}
            >
              <SelectTrigger
                id="sex"
                className="w-[80%] m-5 h-12 border rounded px-3 py-2 select-trigger"
              >
                <SelectValue placeholder="Select sex first" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            {/* Category - Filtered based on selected sex */}
            <label htmlFor="category">Category:</label>
            <Select
              value={data.category}
              onValueChange={(v) => setData("category", v)}
              disabled={!data.sex} // Disable if no sex selected
            >
              <SelectTrigger id="category" className="w-full m-5 w-[80%] justify-between text-base opacity-60 select-trigger">
                <SelectValue placeholder={data.sex ? "Select category" : "Select sex first"} />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                {getAvailableCategories().map((category) => {
                  // Map category to display names
                  const categoryLabels: Record<string, string> = {
                    piglet: "Piglet (baktin)",
                    barrow: "Barrow (lalaking baboy)",
                    gilt: "Gilt (batang inahing baboy)",
                    sow: "Sow (inahing baboy)",
                    boar: "Boar (barako)"
                  };
                  
                  return (
                    <SelectItem key={category} value={category}>
                      {categoryLabels[category] || category}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Show validation error if sex and category don't match */}
            {validationError && (
              <p className="text-red-500 text-sm mt-1 ml-5">{validationError}</p>
            )}

            {/* Tag Number */}
            <label htmlFor="tag_number">Tag Number:</label>
            <div className="m-5 w-[80%]">
              <input
                id="tag_number"
                type="text"
                value={data.tag_number}
                onChange={(e) => setData("tag_number", e.target.value)}
                className="border w-full rounded px-3 py-3"
              />
            </div>
            {errors.tag_number && (
              <p className="text-red-500">{errors.tag_number}</p>
            )}

            {/* Birthdate */}
            <label htmlFor="birthdate">Birthdate:</label>
            <div className="m-5 w-[80%]">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="border rounded px-3 py-2 w-full text-left h-12 select-trigger"
                  >
                    {data.birthdate
                      ? new Date(data.birthdate).toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon className="inline ml-8 w-4 h-4" />
                  </button>
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
                    defaultMonth={data.birthdate ? new Date(data.birthdate) : undefined}
                    onSelect={(date) =>
                      date && setData("birthdate", date.toISOString().split("T")[0])
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Purpose */}
            <label htmlFor="purpose">Purpose:</label>
            <Select
              value={data.purpose}
              onValueChange={(v) => setData("purpose", v)}
            >
              <SelectTrigger id="purpose" className="w-[80%] h-12 border m-5 rounded select-trigger">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                <SelectItem value="fattening">Fattening (ibenta ang karne)</SelectItem>
                <SelectItem value="slaughter">Slaughter (pang sariling konsumo)</SelectItem>
                <SelectItem value="sale_as_piglet">Sale as Piglet</SelectItem>
                <SelectItem value="breeding_sow">Breeding Sow (inahing pang‑palahi)</SelectItem>
                <SelectItem value="breeding_boar">Breeding Boar (barakong pang‑palahi)</SelectItem>
                <SelectItem value="undecided">Undecided</SelectItem>
              </SelectContent>
            </Select>

            {/* Weight */}
            <label htmlFor="weight">Weight (kg):</label>
            <div className="m-5 w-[80%]">
              <input
                id="weight"
                type="number"
                value={data.weight}
                onChange={(e) => setData("weight", e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            {/* Breed */}
            <label htmlFor="breed">Breed:</label>
            <Select
              value={showCustomBreed ? "custom" : data.breed_id || ""}
              onValueChange={handleBreedChange}
            >
              <SelectTrigger
                id="breed"
                className="w-full h-12 border m-5 w-[80%] rounded px-3 py-2 select-trigger"
              >
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                {breeds?.map((b) => (
                  <SelectItem key={b.id} value={String(b.id)}>
                    {b.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Other (Custom)</SelectItem>
              </SelectContent>
            </Select>

            {showCustomBreed && (
              <>
                <label htmlFor="cuztom_breed">Custom Breed:</label>
                <div className="m-5 w-[80%]">
                  <input
                    ref={customBreedRef}
                    id="cuztom_breed"
                    type="text"
                    value={data.cuztom_breed}
                    onChange={(e) => setData("cuztom_breed", e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                </div>
              </>
            )}

            {/* Description */}
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="border rounded px-3 py-2"
            />
          </ScrollArea>
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={processing || !!validationError}
            >
              {processing ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
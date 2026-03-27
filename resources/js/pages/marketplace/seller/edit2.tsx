import React, { useState } from "react";
import { useForm, } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";

interface Swine {
  id: number;
  name: string;
  tag_number: string;
  breed_name?: string;
  weight?: number;
}

interface Listing {
  id: number;
  title: string;
  category: string;
  description: string;
  price_per_unit: number;
  price_unit_type: string;
  swine_ids: number[];
  sex_summary?: string;
  breed?: string;
  age_range?: string;
  barangay?: { name?: string };
  seller: {
    name: string;
    email: string;
    user_information?: {
      address?: string;
      contact_number?: string;
    };
  };
}

interface Props {
  listing: Listing;
  availableSwine: Swine[];
}

const EditListing: React.FC<Props> = ({ listing, availableSwine }) => {
  const [activeTab, setActiveTab] = useState<"swine" | "details">("swine");

  const { data, setData, put, errors, processing } = useForm({
    title: listing.title || "",
    category: listing.category || "fattening",
    description: listing.description || "",
    price_per_unit: listing.price_per_unit || "",
    price_unit_type: listing.price_unit_type || "per_head",
    swine_ids: listing.swine_ids || [],
  });

  const toggleSwine = (id: number) => {
    const newSelected = data.swine_ids.includes(id)
      ? data.swine_ids.filter((s) => s !== id)
      : [...data.swine_ids, id];
    setData("swine_ids", newSelected);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/marketplace/seller/${listing.id}`, {
      onSuccess: () => Inertia.get("/marketplace/seller"),
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
      {/* Left — Marketplace Card Preview */}
      <div>
        <h2 className="text-lg font-bold mb-2">Listing Preview</h2>
       <Card className="shadow-md py-0 border border-gray-200 dark:border-gray-800 overflow-hidden">
  <div className="relative">
    {/* Image placeholder */}
    <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full rounded-t-md"></div>

    {/* Horizontal overlay */}
    <div className="absolute top-0 left-0 right-0 bg-sidebar-primary/50 text-white text-xs flex justify-between items-center px-3 py-1">
      {/* Left group: sex, breed, age */}
      <div className="flex space-x-3">
        <span>{listing.sex_summary || "Sex: N/A"}</span>
        <span>{listing.breed || "Breed: N/A"}</span>
        <span>{listing.age_range || "Age: N/A"}</span>
      </div>

      {/* Right group: location */}
      <div className="flex items-center space-x-1">
        <MapPin className="w-4 h-4" />
        <span>{listing.barangay?.name || "Location: N/A"}</span>
      </div>
    </div>
  </div>

  <CardContent className="space-y-0 pt-0 px-4 pb-4">
    <p className="text-sm text-gray-500">{listing.category}</p>
    <p className="text-gray-700 dark:text-gray-200 leading-snug line-clamp-3">
      {data.description || "No description provided."}
    </p>
    <p className="pt-1 font-medium text-primary dark:text-green-400">
      ₱{data.price_per_unit} ({data.price_unit_type})
    </p>
  </CardContent>
</Card>

      </div>

      {/* Right — Edit Form */}
      <div>
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "swine"
                      ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab("swine")}
                >
                  Swine List
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "details"
                      ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Edit Details
                </button>
              </div>
      
              {/* Tab Content */}
              {activeTab === "swine" && (
                <Card className="shadow-md border border-gray-200 dark:border-gray-800">
                  <CardContent>
                    {availableSwine.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 max-h-[32rem] overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/50 p-1">
                        {availableSwine.map((s) => {
                          const isSelected = data.swine_ids.includes(s.id);
                          return (
                            <div
                              key={s.id}
                              onClick={() => toggleSwine(s.id)}
                              className={`grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600"
                                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSwine(s.id)}
                                className="w-4 h-4 ml-[2px] accent-green-600"
                              />
                              <div className="flex flex-col leading-tight">
                                <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {s.name || "Unnamed Swine"}
                                </span>
                                {s.tag_number && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    Tag: {s.tag_number}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No available swine to list.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
      
              {activeTab === "details" && (
                <Card className="shadow-md border border-gray-200 dark:border-gray-800">
                  <CardContent>
                    <form onSubmit={submit} className="space-y-4 pb-6">
                      {/* Title */}
                      <Input
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                      />
                      {errors.title && <p className="text-red-500">{errors.title}</p>}
      
                      {/* Category */}
                      <Select
                        value={data.category}
                        onValueChange={(value) => setData("category", value)}
                      >
                        <SelectTrigger className="w-full select-trigger">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breeder">Breeder</SelectItem>
                          <SelectItem value="piglet">Piglet</SelectItem>
                          <SelectItem value="fattening">Fattening</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-red-500">{errors.category}</p>}
      
                      {/* Description */}
                      <Textarea
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                      />
      
                      {/* Price */}
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Price per unit"
                          value={data.price_per_unit}
                          onChange={(e) => setData("price_per_unit", e.target.value)}
                        />
                        <Select
                          value={data.price_unit_type}
                          onValueChange={(value) => setData("price_unit_type", value)}
                        >
                          <SelectTrigger className="w-full select-trigger">
                            <SelectValue placeholder="Select price unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="per_head">Per Head</SelectItem>
                            <SelectItem value="per_kg">Per Kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.price_per_unit && (
                        <p className="text-red-500">{errors.price_per_unit}</p>
                      )}
      
                      <div className="flex justify-between pt-4">
                        <Button type="submit" disabled={processing}>
                          {processing ? "Saving..." : "Update Listing"}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            Inertia.delete(`/marketplace/seller/${listing.id}`)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
    </div>
  );
};

export default EditListing;

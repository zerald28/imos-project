import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Mars, Venus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Create from './data-table'

type Swine = {
  id: number;
  tag_number: string;
  sex: "Male" | "Female";
  stage: string;
  purpose: string;
  category: string;
  breed?: { name: string } | null;
  cuztom_breed?: string | null;
  weight?: number;
  age_days?: number; // ✅ added
};

type SwineProps = {
  swine: Swine;
  onDelete: (id: number) => void;
};

export default function SwineCard({ swine, onDelete }: SwineProps) {
  const breedName = swine.breed?.name ?? swine.cuztom_breed ?? "Unknown";

  return (
    <Card className="relative rounded-xl shadow-md 
      bg-gradient-to-r from-green-100 to-green-200 
      dark:from-green-900 dark:to-green-800 
      transition-all hover:shadow-lg w-full  ">
      
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            🐷 {swine.tag_number || `Swine #${swine.id}`}
            {swine.sex === "Male" ? (
              <Mars className="w-4 h-4 text-blue-500" />
            ) : (
              <Venus className="w-4 h-4 text-pink-500" />
            )}
          </h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(swine.id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <p><span className="font-medium">Stage:</span> {swine.stage}</p>
          <p><span className="font-medium">Category:</span> {swine.category}</p>
          <p><span className="font-medium">Breed:</span> {breedName}</p>
          <p><span className="font-medium">Purpose:</span> {swine.purpose}</p>
          {swine.weight && (
            <p><span className="font-medium">Weight:</span> {swine.weight} kg</p>
          )}
          {swine.age_days && (
            <p><span className="font-medium">Age:</span> {swine.age_days} days</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}




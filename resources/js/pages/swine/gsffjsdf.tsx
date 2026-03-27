import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { Head } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SwineCard() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5">
      <div className="col-span-1"></div>
      <div className="lg:w-[460px] sm:w-md md:w-xl grid col-span-3">
        <Card className="w-full max-w-xl shadow-lg rounded-2xl overflow-hidden p-0 bg-transparent mb-2">
          {/* Remove CardContent background and padding */}
          <CardContent className="p-0 bg-transparent h-60">
            <div className="h-full flex flex-col">
              {/* Top 80% = green from the very top */}

              <div className="flex-[8] bg-green-500 p-4 text-white relative">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">Tag Number</h2>
                <p>Days: 120</p>
                <p>Stage: Grower</p>
                

                <div className="absolute top-2 right-2 flex space-x-2">
                  <button className="p-2 rounded-full bg-green-100 hover:bg-green-200">
                    <Plus className="h-5 w-5 text-green-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-green-700 bg-green-500/30">
                    <MoreVertical className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Bottom 20% = white */}
              <div className="flex-[2] bg-white p-4">
                <p className="text-gray-700 font-medium">Add Note</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1"></div>
      </div>

    </div>

  );
}

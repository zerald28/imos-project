import React from "react";
import { Loader2 } from "lucide-react"; // built-in shadcn/lucide spinner

/**
 * A fullscreen overlay loader with spinner and system branding.
 */
export default function LoadingOverlay() {
  
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-[9999] transition-opacity duration-300">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="mt-3 text-gray-700 font-medium">Loading Marketplace...</p>
    </div>
  );
}

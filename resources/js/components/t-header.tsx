"use client"

import React from "react";
import { ArrowLeft } from "lucide-react";
import { router } from "@inertiajs/react";

interface TemporaryHeaderProps {
  title: string;
  backUrl?: string; // fallback Inertia or plain URL
  useInertia?: boolean; // whether to use Inertia for fallback
}

export default function TemporaryHeader({
  title,
  backUrl,
  useInertia = true,
}: TemporaryHeaderProps) {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (backUrl) {
      if (useInertia) {
        router.visit(backUrl);
      } else {
        window.location.href = backUrl;
      }
    } else {
      if (useInertia) {
        router.visit("/");
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-green-900 text-white px-4 py-2 rounded-b-md shadow-md z-50">
      <button
        onClick={handleBack}
        className="flex items-center gap-1 text-white hover:text-gray-200 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      <h1 className="text-lg font-bold">{title}</h1>
      <div>{/* optional right-side space */}</div>
    </div>
  );
}

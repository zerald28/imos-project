import React from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { Leaf, Shield, PiggyBank, ShoppingBag, Tractor, ArrowRight } from "lucide-react";
import { PigIcon } from '@/components/icons';

export default function RoleSelection() {

  const chooseRole = async (role: "buyer" | "farmer") => {
    try {
      const response = await axios.post("/user/choose-role", { role });
      const redirectUrl = response.data.redirect;
      router.visit(redirectUrl);
    } catch (error: any) {
      console.error(error);
      alert("Failed to update role. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* FIXED BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
        }}
      />
      
      {/* COLOR OVERLAY */}
      <div className="fixed inset-0 z-0 bg-sidebar-primary/70" />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce opacity-20">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-1000 opacity-20">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse opacity-10">
          <PiggyBank className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-spin-slow opacity-10">
          <PigIcon className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur rounded-full">
                <PigIcon className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Choose Your Role
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Select how you want to participate in the Integrated Monitoring System for Swine Farming
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Buyer Card */}
            <div
              onClick={() => chooseRole("buyer")}
              className="group cursor-pointer bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Buyer
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  Browse products and purchase swine easily from our marketplace. Access verified listings, connect with trusted farmers, and secure your livestock needs.
                </p>
                
                {/* Features List */}
                <div className="w-full pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Browse available swine listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Secure transaction process</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Direct communication with sellers</span>
                  </div>
                </div>
                
                {/* Button */}
                <div className="pt-4 w-full">
                  <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                    Continue as Buyer
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer/Seller Card */}
            <div
              onClick={() => chooseRole("farmer")}
              className="group cursor-pointer bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div className="p-4 rounded-full bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-800/50 group-hover:scale-110 transition-transform duration-300">
                  <Tractor className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Farmer / Seller
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  Manage your swine, post listings, and grow your farming business. Access insurance programs, veterinary support, and government assistance.
                </p>
                
                {/* Features List */}
                <div className="w-full pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>List and sell your swine</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>Access livestock insurance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>Sell and leverage livestock products</span>
                  </div>
                </div>
                
                {/* Button */}
                <div className="pt-4 w-full">
                  <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                    Continue as Farmer
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-sm text-white/60">
              You can change your role later from your account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
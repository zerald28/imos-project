import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  CheckCircle2,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Copy,
  Check,
  AlertCircle,
  User
} from "lucide-react";
import { useState } from "react";

interface BookingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any;
  onConfirm: () => void;
  onContact: () => void;
  isProcessing: boolean;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  open,
  onOpenChange,
  service,
  onConfirm,
  onContact,
  isProcessing
}) => {
  const [copied, setCopied] = useState(false);

  if (!service) return null;

  const handleCopyContact = () => {
    if (service.user.contact) {
      navigator.clipboard.writeText(service.user.contact);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient - sticky on mobile */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6 rounded-t-lg z-10">
          <DialogHeader className="space-y-2">
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Calendar className="w-5 h-5 text-green-100" />
              <span>Confirm Your Booking</span>
            </DialogTitle>
            <DialogDescription className="text-green-100 text-sm">
              You're about to book: <span className="font-semibold text-white block sm:inline mt-1 sm:mt-0">
                {service.title}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* 🔴 HIGHLIGHTED CONTACT SECTION - FIRST THING USERS SEE */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 sm:p-5 -mt-1 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600 animate-pulse" />
              <h3 className="font-bold text-blue-800 text-base sm:text-lg">
                📞 CONTACT PROVIDER DIRECTLY
              </h3>
            </div>
            
            <p className="text-sm text-blue-700 mb-4 font-medium">
              For faster service, please contact the provider immediately using the information below:
            </p>

            {/* Provider Info Avatar/Name */}
            <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-lg border border-blue-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {service.user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 truncate">{service.user.name}</p>
                <p className="text-xs text-gray-500">Service Provider</p>
              </div>
            </div>

            {/* Contact Number - Highly Visible */}
            {service.user.contact ? (
              <div className="bg-white rounded-lg p-4 mb-3 border-2 border-blue-300 shadow-sm">
                <div className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">
                  Mobile Number
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-800 break-all">
                      {service.user.contact}
                    </span>
                  </div>
                  <div className="flex gap-2 sm:flex-col lg:flex-row">
                    <Button
                      size="sm"
                      onClick={handleCopyContact}
                      variant="outline"
                      className="flex-1 sm:flex-none border-blue-300 hover:bg-blue-50"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.location.href = `tel:${service.user.contact}`}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-100 rounded-lg p-4 mb-3 border border-yellow-300">
                <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  No contact number provided. Please message the provider instead.
                </p>
              </div>
            )}

            {/* Email if available */}
            {service.user.email && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 break-all flex-1">{service.user.email}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 h-8 px-2"
                    onClick={() => window.location.href = `mailto:${service.user.email}`}
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                onClick={onContact}
                className="bg-blue-600 hover:bg-blue-700 text-white col-span-2 sm:col-span-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              {service.user.contact && (
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 col-span-2 sm:col-span-1"
                  onClick={() => window.location.href = `https://wa.me/${service.user.contact.replace(/\D/g, '')}`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              )}
            </div>
          </div>


          {/* Booking Summary - Compact */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Booking Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium text-right ml-4">{service.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium text-right ml-4">{service.user.name}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-1">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600 text-lg">
                  ₱{Number(service.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* What happens next - Collapsible on mobile? No, keep compact */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2 text-sm">
              <Star className="w-4 h-4" />
              After Booking:
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-purple-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Provider will be notified of your request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>They'll accept within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Rate the service after completion</span>
              </li>
            </ul>
          </div>

          {/* Important Notes - Simplified */}
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-yellow-700 flex items-start gap-2">
              <AlertCircle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-semibold">Remember:</span> Contact the provider directly for 
                faster arrangement. The booking system is for tracking and ratings.
              </span>
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex-col sm:flex-row gap-2 p-4 sm:p-6 border-t bg-gray-50 sticky bottom-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isProcessing}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 order-1 sm:order-2"
          >
            {isProcessing ? (
              <>⏳ Processing...</>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirm Booking
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
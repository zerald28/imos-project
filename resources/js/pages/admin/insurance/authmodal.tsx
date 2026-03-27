import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Shield, User, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { router } from "@inertiajs/react";

interface VeterinaryAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: any;
  currentUser: any;
  onContinue: () => void;
  onStay: () => void;
}

const VeterinaryAuthModal: React.FC<VeterinaryAuthModalProps> = ({
  isOpen,
  onClose,
  reportData,
  currentUser,
  onContinue,
  onStay,
}) => {
  if (!reportData) return null;

  const isAuthorized = currentUser?.id === reportData.veterinary_id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            Veterinary Authorization Required
          </DialogTitle>
          <DialogDescription>
            You are attempting to access a disease report that was created by another veterinarian.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="p-3 bg-amber-100 rounded-full">
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Report Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Report Information
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Report ID:</span>
                <span className="font-medium">#{reportData.id}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Policy Holder:</span>
                <span className="font-medium">{reportData.policy_holder}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Diagnosis:</span>
                <span className="font-medium truncate max-w-[200px]">
                  {reportData.q4_diagnosis || 'Not specified'}
                </span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Veterinarian:</span>
                </div>
                <div className="flex items-center justify-between ml-6">
                  <span className="font-medium">{reportData.veterinarian_name}</span>
                  {isAuthorized ? (
                    <Badge className="bg-green-100 text-green-800">You</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600">
                      ID: {reportData.veterinary_id}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Authorization Message */}
          <div className="text-center text-sm text-gray-600">
            {!isAuthorized ? (
              <p>
                You are not the veterinarian who created this report. 
                Would you like to continue viewing it?
              </p>
            ) : (
              <p className="text-green-600">
                You are authorized to manage this report.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-center">
          <Button variant="outline" onClick={onStay} className="gap-2">
            Stay on Page
          </Button>
          <Button 
            onClick={onContinue} 
            variant={isAuthorized ? "default" : "secondary"}
            className="gap-2"
          >
            Continue to Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VeterinaryAuthModal;
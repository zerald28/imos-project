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
import { AlertCircle, Shield, User, FileEdit, Building, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApplicationAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationData: any;
  currentUser: any;
  onContinue: () => void;
  onStay: () => void;
}

const ApplicationAuthModal: React.FC<ApplicationAuthModalProps> = ({
  isOpen,
  onClose,
  applicationData,
  currentUser,
  onContinue,
  onStay,
}) => {
  if (!applicationData) return null;

  const isProponent = currentUser?.id === applicationData.proponent_user_id;
  const isFarmer = currentUser?.id === applicationData.farmer_id;
  const isAuthorized = isProponent || isFarmer;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-1 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            Edit Required
          </DialogTitle>
          <DialogDescription>
      <div className="text-center text-sm">
            {!isAuthorized ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Limited Access</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  You are not the farmer or proponent who created this application.
                  Editing this application may affect the insurance coverage and claims.
                </p>
               
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Authorized Access</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  You are authorized to edit this application as the {isProponent ? "proponent" : "farmer"}.
                </p>
              </div>
            )}
          </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="p-3 bg-amber-100 rounded-full">
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-gray-50 p-0 rounded-lg space-y-3 dark:bg-gray-800">
            <h4 className="font-semibold flex items-center gap-2">
              <FileEdit className="w-4 h-4" />
              Application Information
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Application ID:</span>
                <span className="font-medium dark:text-white">#{applicationData.id}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cover Type:</span>
                <span className="font-medium dark:text-white">{applicationData.cover_type}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Number of Heads:</span>
                <span className="font-medium dark:text-white">{applicationData.number_of_heads}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <Badge variant="outline" className="dark:border-gray-600">
                  {applicationData.status}
                </Badge>
              </div>
              
              <div className="border-t pt-2 mt-2 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Farmer:</span>
                </div>
                <div className="flex items-center justify-between ml-6">
                  <span className="font-medium dark:text-white">{applicationData.farmer_name}</span>
                  {isFarmer ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      You (Farmer)
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                      ID: {applicationData.farmer_id}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="border-t pt-2 mt-2 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Proponent:</span>
                </div>
                <div className="flex items-center justify-between ml-6">
                  <span className="font-medium dark:text-white">{applicationData.proponent_name || "—"}</span>
                  {isProponent ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      You (Proponent)
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                      ID: {applicationData.proponent_user_id || "N/A"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Authorization Message */}
          
        </div>

        <DialogFooter className="flex gap-2 sm:justify-center">
       
          <Button 
            onClick={onContinue} 
            variant={isAuthorized ? "default" : "destructive"}
            className="gap-2"
          >
            Continue to Edit if you are assign and with consent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationAuthModal;
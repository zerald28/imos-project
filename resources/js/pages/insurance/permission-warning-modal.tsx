import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PermissionWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  action: string;
  veterinarianName: string;
  animalIdentifier: string;
}

const PermissionWarningModal: React.FC<PermissionWarningModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  action,
  veterinarianName,
  animalIdentifier,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md z-10">
        <div className="p-6">
          {/* Warning Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-center mb-2 dark:text-gray-100">
            Permission Warning
          </h3>

          {/* Message */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              You are about to <span className="font-semibold text-yellow-600 dark:text-yellow-400">{action}</span> for livestock{" "}
              <span className="font-semibold">{animalIdentifier}</span>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              This livestock is assigned to Veterinarian:{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {veterinarianName}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
              You are not the assigned veterinarian for this livestock. Proceeding may affect records managed by another veterinarian.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 dark:border-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onProceed();
                onClose();
              }}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Proceed Anyway
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionWarningModal;
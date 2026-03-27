import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

type Group = {
  id: number;
  name: string;
  description?: string;
  group_type: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  swineIds: number[]; // 🐖 multiple swine IDs
  groups: Group[];
};

export default function AssignGroupMultipleModal({
  isOpen,
  onClose,
  swineIds,
  groups,
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const handleAssignMultiple = () => {
    if (!selectedGroup || swineIds.length === 0) {
      toast.error("Please select a group and swine.");
      return;
    }

    router.post(
      "/swine/bulk-assign",
      { swine_ids: swineIds, group_id: selectedGroup },
      {
        onSuccess: (page) => {
          const props = page.props as any;
          toast.success(props?.flash?.success || "Swine assigned to group!");
          onClose();
        },
        onError: () => toast.error("Failed to assign swine."),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-md md:max-w-lg rounded-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>Assign Multiple Swine to a Group</DialogTitle>
        </DialogHeader>

        <div>
          <h3 className="font-semibold text-sm mb-2">Available Groups</h3>
          {groups.length > 0 ? (
            <div className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
                    selectedGroup === group.id
                      ? "bg-green-100 border-green-400"
                      : ""
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <p className="font-semibold">{group.name}</p>
                  <p className="text-sm text-gray-600">
                    {group.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No groups available.</p>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssignMultiple} disabled={!selectedGroup}>
            Assign to Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

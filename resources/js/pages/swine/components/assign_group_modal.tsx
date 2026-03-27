import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

type Group = {
  id: number;
  name: string;
  description?: string;
  group_type: string;
};



type Props = {
  isOpen: boolean;
  onClose: () => void;
  swineId: number | null;
  groups: Group[];
    assignedGroups: Group[];
  availableGroups: Group[];
};

export default function AssignGroupModal({
  isOpen,
  onClose,
  swineId,
  groups,
    assignedGroups,
  availableGroups,
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    group_type: "feeding",
  });

  // Assign swine to an existing group
  // const handleAssign = () => {


  //   router.post(
  //     `/swine/${swineId}/assign-group`,
  //     { group_id: selectedGroup },
  //     {
  //       onSuccess: (page) => {
  //         const props = page.props as any;
  //         toast.success(props?.flash?.success || "Swine assigned!");
  //         onClose();
  //       },
  //       onError: () => toast.error("Failed to assign swine."),
  //     }
  //   );
  // };

  // Create new group + assign swine
  const handleCreateGroup = () => {
    if (!form.name.trim() || !swineId) return;

    router.post(
      `/swine-groups`,
      { ...form, swine_id: swineId }, // backend should also attach swine
      {
        onSuccess: (page) => {
          const props = page.props as any;
          const newGroup = props?.newGroup;
          if (newGroup) {
            toast.success(
              `Group "${newGroup.name}" created and swine added!`
            );
          } else {
            toast.success("Group created!");
          }
          setShowCreateForm(false);
          setForm({ name: "", description: "", group_type: "feeding" });
          onClose();
        },
        onError: () => toast.error("Failed to create group."),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full  sm:max-w-md  md:max-w-lg  lg:max-w-xl rounded-2xl  space-y-4">
        <DialogHeader>
          <DialogTitle>Assign Swine to Group</DialogTitle>
        </DialogHeader>

        {showCreateForm ? (
          <div className="space-y-1 ">
            <Input
              placeholder="Group Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              className="border rounded px-2 py-1 w-full"
              value={form.group_type}
              onChange={(e) =>
                setForm({ ...form, group_type: e.target.value })
              }
            >
              <option value="feeding">Feeding</option>
              <option value="breeding">Breeding</option>
              <option value="quarantine">Quarantine</option>
              <option value="expense-sharing">Expense Sharing</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>Save</Button>
            </div>
          </div>
        ) : (
          <>
           <div className="mt-4 space-y-4">
  {/* Assigned Groups */}
  <div>
    <h3 className="font-semibold text-sm mb-2">Already in Groups</h3>
    {assignedGroups.length > 0 ? (
      <div className="space-y-2 ml-2">
        {assignedGroups.map((group) => (
          <div
            key={group.id}
            className="p-2 border rounded bg-white-100 opacity-70 cursor-not-allowed"
          >
            <p className="font-semibold">{group.name}</p>
            <p className="text-sm text-black-600">
              {group.description || "No description"}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">
        This swine is not in any group yet.
      </p>
    )}
  </div>

  {/* Available Groups */}
  <div>
    <h3 className="font-semibold text-sm mb-2">Available Groups</h3>
    {availableGroups.length > 0 ? (
      <div className="space-y-2 ml-2 h-52 overflow-y-auto">
        {availableGroups.map((group) => (
          <div
            key={group.id}
            className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
              selectedGroup === group.id ? "bg-green-100 border-green-400" : ""
            }`}
            onClick={() => {
                  setSelectedGroup(group.id);
                  // 👇 Immediately assign on click
                  router.post(
                    `/swine/${swineId}/assign-group`,
                    { group_id: group.id },
                    {
                      onSuccess: (page) => {
                        const props = page.props as any;
                        toast.success(props?.flash?.success || "Swine assigned!");
                        onClose();
                      },
                      onError: () => toast.error("Failed to assign swine."),
                    }
                  );
                }}>
            <p className="font-semibold">{group.name}</p>
            <p className="text-sm text-gray-600">
              {group.description || "No description"}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">No more groups to assign.</p>
    )}
  </div>
</div>



            <Button
              variant="ghost"
              className="flex items-center  text-blue-600 mt-3"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="h-4 w-4" /> Create New Group
            </Button>

            {/* <DialogFooter className="flex justify-between"> */}
              {/* <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAssign} disabled={!selectedGroup}>
                Assign
              </Button> */}
            {/* </DialogFooter> */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

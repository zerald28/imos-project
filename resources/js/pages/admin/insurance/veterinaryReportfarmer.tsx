// File: resources/js/Pages/VeterinaryRequests/index.tsx

import { useState } from "react";
import axios from "axios";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { MessageCircleMore } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface VeterinaryRequest {
  id: number;
  request_type: string;
  description?: string | null;
  status?: string | null;
  user_id: string;
  created_at: string;
  user?: {
    firstname: string;
    middlename?: string | null;
    lastname: string;
    contact?: string | null;
    purok?: string | null;
    barangay: string;
  } | null;
}

export default function VeterinaryRequestList() {
  const { props } = usePage<any>();
  const [veterinaryRequests, setVeterinaryRequests] = useState<VeterinaryRequest[]>(
    props.veterinaryRequests?.data ?? []
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(
    props.selectedStatus ?? null
  );

  const formalStatus: Record<string, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const updateStatus = async (id: number, status: keyof typeof formalStatus) => {
    try {
      const res = await axios.put(`/veterinary-request/${id}/update-status`, { status });
      setVeterinaryRequests((prev) =>
        prev.map((vr) => (vr.id === id ? { ...vr, status: res.data.status } : vr))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const startConversation = async (r: VeterinaryRequest) => {
    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: r.user_id,
        veterinary_request_id: r.id,
      });
      const conversation = res.data.data;
      Inertia.visit(`/messenger?conversation=${conversation.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to start conversation");
    }
  };

  const filteredRequests = statusFilter
    ? veterinaryRequests.filter((r) => r.status === statusFilter)
    : veterinaryRequests;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            className={statusFilter === null ? "bg-sidebar-primary text-white" : ""}
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          {Object.keys(formalStatus).map((key) => (
            <Button
              key={key}
              variant={statusFilter === key ? "default" : "outline"}
              className={statusFilter === key ? "bg-sidebar-primary text-white" : ""}
              onClick={() => setStatusFilter(key)}
            >
              {formalStatus[key]}
            </Button>
          ))}
        </div>

        {/* Veterinary Requests as single row cards */}
        <div className="space-y-4">
          {filteredRequests.length === 0 && (
            <p className="text-gray-500 text-center">No veterinary requests found.</p>
          )}

          {filteredRequests.map((r) => (
            <Card key={r.id} className="flex flex-col md:flex-row justify-between items-start md:items-center border">
              {/* Left Section: Info */}
              <CardContent className="flex-1 space-y-1 md:space-y-0 md:space-x-4 md:flex md:items-center">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold">{r.request_type}</CardTitle>
                  <p className="text-gray-600">{r.description || "No description"}</p>
                  <p className="text-sm text-gray-500">
                    Requested by: {r.user ? `${r.user.firstname} ${r.user.middlename ?? ""} ${r.user.lastname}` : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: Purok-{r.user?.purok ?? "-"}, {r.user?.barangay ?? "-"} / {r.user?.contact ?? "-"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${statusColors[r.status ?? "pending"]} mt-2 md:mt-0`}>
                  {formalStatus[r.status ?? "pending"]}
                </Badge>
              </CardContent>

              {/* Right Section: Actions */}
              {/* <CardFooter className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center">
                <Select
                  value={r.status ?? "pending"}
                  onValueChange={(val: string) =>
                    updateStatus(r.id, val as keyof typeof formalStatus)
                  }
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(formalStatus).map((key) => (
                      <SelectItem key={key} value={key}>
                        {formalStatus[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="w-full md:w-auto flex items-center gap-2 border-sidebar-primary text-sidebar-primary hover:bg-sidebar-primary/10"
                  onClick={() => startConversation(r)}
                >
                  <MessageCircleMore size={18} />
                  Chat
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

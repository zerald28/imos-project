// File: resources/js/Pages/Swine/List.tsx
import React from "react";
import { Link, router } from "@inertiajs/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Breed {
  id: number;
  name: string;
}

interface Swine {
  id: number;
  tag_number: string | null;
  sex: string;
  category: string;
  breed?: Breed | null;
  cuztom_breed?: string | null;
  birthdate?: string;
  weight?: number | null;
  purpose: string;
  stage: string;
  description?: string | null;
}

interface Props {
  swines: Swine[];
}

export default function List({ swines }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Swine Records</h1>
        <Button asChild>
          <Link href="/swine/create">
            <Plus className="w-4 h-4 mr-2" /> Register Swine
          </Link>
        </Button>
      </div>

      <Card className="rounded-xl flex ">
        <CardContent>
          <Table>
            <TableCaption>
              A list of all swine registered under this farmer.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Tag #</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Birthdate</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {swines.length > 0 ? (
                swines.map((swine) => (
                  <TableRow key={swine.id}>
                    <TableCell>{swine.tag_number || "-"}</TableCell>
                    <TableCell>{swine.sex}</TableCell>
                    <TableCell>{swine.category}</TableCell>
                    <TableCell>
                      {swine.breed?.name ?? swine.cuztom_breed ?? "N/A"}
                    </TableCell>
                    <TableCell>
                      {swine.birthdate
                        ? new Date(swine.birthdate).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{swine.weight ?? "-"}</TableCell>
                    <TableCell>{swine.purpose}</TableCell>
                    <TableCell>{swine.stage}</TableCell>
                    <TableCell>{swine.description ?? "-"}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/swine/${swine.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to delete swine with tag #${swine.tag_number}?`
                            )
                          ) {
                            router.delete(`/swine/${swine.id}`);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-6">
                    No swine records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

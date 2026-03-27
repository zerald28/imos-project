// // // File: resources/js/Pages/Swine/Index.tsx
// // import React from "react";
// // import List from "./list";
// // import Create from './data-table'
// // import { Head } from '@inertiajs/react';

// // import AppearanceTabs from '@/components/appearance-tabs';
// // import HeadingSmall from '@/components/heading-small';
// // import { type BreadcrumbItem } from '@/types';
// // import Heading from '@/components/heading';
// // import AppLayout from '@/layouts/app-layout';
// // import SettingsLayout from '@/layouts/management-layout';
// // import { appearance } from '@/routes';

// // const breadcrumbs: BreadcrumbItem[] = [
// //   {
// //     title: 'Appearance settings',
// //     href: appearance().url,
// //   },
// // ];

// // interface Breed {
// //   id: number;
// //   name: string;
// // }

// // interface Swine {
// //   id: number;
// //   tag_number: string | null;
// //   sex: "Male" | "Female";
// //   breed?: Breed;
// //   cuztom_breed?: string | null;
// //   category: string;
// //   purpose: string;
// //   weight: number;
// //   stage: string;
// //   status: string;
// // }

// // interface PageProps {
// //   swine: {   // singular
// //     data: Swine[];
// //     links: any;
// //     meta: any;
// //   };
// // }

// // export default function Index({ swine }: PageProps) {
// //   return (
// //     <AppLayout breadcrumbs={breadcrumbs}>


// //       <Head title="My Swine" />
// //       <SettingsLayout>
// //         <div className="space-y-6">


// //           <List swines={swine.data} /> {/* ✅ passes swine.data */}

// //         </div>
// //       </SettingsLayout>

// //     </AppLayout>
// //   );
// // }
// // File: resources/js/Pages/Swine/Index.tsx

// import { useRef, useEffect } from "react";
// import { type BreadcrumbItem } from "@/types";
// import Heading from "@/components/heading";
// import AppLayout from "@/layouts/app-layout";
// import SettingsLayout from "@/layouts/management-layout";
// import { Head, usePage, router, Link } from "@inertiajs/react";
// import SwineCard from "./components/swine-card-index"; // ✅ one swine card
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";
// import { useForm } from "@inertiajs/react";
// import { toast } from "sonner";
// import { useScrollToRef } from "@/hooks/useScrollToRef"; // ✅ import hook
// import AssignGroupModal from "./components/assign_group_modal";
// import { useState } from "react";

// const breadcrumbs: BreadcrumbItem[] = [
//   {
//     title: "Swine",
//     href: "/swine/index",
//   },
// ];

// // ✅ Matches the SwineCard props
// // Type for a single swine
// type Swine = {
//   id: number;
//   tag_number: string;
//   sex: "male" | "female";
//   stage: string;
//   breed?: { name: string } | null; // <-- fix here
//   cuztom_breed?: string | null;
//   purpose: string;
//   category: string;
//   birthdate: string;
//    created_at: string; // <--- needed
//      assignedGroups: Group[];
//   availableGroups: Group[];


// };

// type Group = {
//   id: number;
//   name: string;
//   description?: string;
//   group_type: string;
// };


// type PageProps = {
//   swine?: Swine[];
//   breeds?: { id: number; name: string }[];
//    groups: Group[]; // add groups here
//      isSelected?: boolean; // ✅ new
//   onSelect?: (id: number) => void; // ✅ new
// };


// export default function Index() {
//   const { swine = [], breeds = [], groups = [], isSelected=[], onSelect=[]} = usePage<PageProps>().props;
//    const [selected, setSelected] = useState<number[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

//   const toggleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//     );
//   };

//   const handleBulkAssign = () => {
//     if (!selectedGroup) {
//       toast.error("Please select a group first.");
//       return;
//     }

//     router.post(
//       "/swine/bulk-assign",
//       { swine_ids: selected, group_id: selectedGroup },
//       {
//         onSuccess: () => {
//           toast.success("Swine assigned to group successfully.");
//           setSelected([]); // reset selection
//         },
//         onError: () => {
//           toast.error("Failed to assign swine.");
//         },
//       }
//     );
//   };


//   const handleDelete = (id: number) => {
//     if (confirm("Are you sure you want to delete this swine record?")) {
//       router.delete(`/swines/${id}`);
//     }
//   };
// const [selectedSwineIds, setSelectedSwineIds] = useState<number[]>([]);
// const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);

// // const toggleSelect = (id: number, checked: boolean) => {
// //   setSelectedSwineIds((prev) =>
// //     checked ? [...prev, id] : prev.filter((swineId) => swineId !== id)
// //   );
// // };
//   const currentPath = window.location.pathname;

//   const mainContentRef = useRef<HTMLDivElement>(null);
//   useScrollToRef(mainContentRef as React.RefObject<HTMLElement>, 70);
// const [isAssignOpen, setIsAssignOpen] = useState(false);
// console.log(breeds); // should log list of breeds
//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <Head title="My Swine" />
//       <SettingsLayout>
        
//         <div className="space-y-6">
//           {/* Add Button */}
//           <Link href="/swine/create"
//             preserveScroll={true} >
//             <Button>
//               <PlusCircle className="w-4 h-4 mr-2" />
//               Add Swine
//             </Button>
//           </Link >

//              {/* Bulk Action Bar */}
//       {selected.length > 0 && (
//         <div className="flex items-center gap-4 mb-4 p-2 bg-gray-100 rounded-lg">
//           <select
//             className="border rounded p-2"
//             value={selectedGroup ?? ""}
//             onChange={(e) => setSelectedGroup(Number(e.target.value))}
//           >
//             <option value="">Select Group</option>
//             {groups.map((g) => (
//               <option key={g.id} value={g.id}>
//                 {g.name}
//               </option>
//             ))}
//           </select>
//           <Button onClick={handleBulkAssign}>Assign {selected.length} Swine</Button>
//         </div>
//       )}

//           {/* Swine List */}
//           <div ref={mainContentRef}>
//             {swine.length === 0 ? (
//               <p className="text-gray-500">No swine records yet.</p>
//             ) : (
//               <div >
//                 {swine.map((swine) => (
//                   <SwineCard key={swine.id} groups={groups} swine={swine} breeds={breeds}  isSelected={selected.includes(swine.id)}
//             onSelect={toggleSelect}/>
//                 ))}
//               </div>
//             )}
//           </div>

        

//         </div>
//       </SettingsLayout>
//     </AppLayout>
//   );
// }

// // import { Card, CardContent } from "@/components/ui/card";
// // import { Plus, MoreVertical } from "lucide-react";
// // import { Head } from "@inertiajs/react";
// // import { Separator } from '@/components/ui/separator';

// // export default function SwineCard() {
// //   return (
// //     <div className="w-full">
// //       {/* Responsive container */}
// //       <div className="w-full lg:w-4/5 lg:mx-auto mt-5">
// //         <Card className="w-full shadow-lg rounded-2xl overflow-hidden p-0 bg-transparent mb-2">
// //           <CardContent className="p-0 bg-transparent h-48 md:h-50 lg:h-55">
// //             <div className="h-full flex flex-col">
// //               {/* Top 80% green */}
// //               <div className="flex-[8] bg-green-500 p-4 pb-0 text-white relative flex flex-col">
// //                 {/* Top Section */}
// //                 <div>
// //                   <div className="grid md:grid-cols-2 grid-cols-5">
// //                   <h2 className="text-lg md:text-4xl lg:text-2xl font-bold leading-tight col-span-2">
// //                     Tag Number
// //                       </h2>
// //                     {/* i want to assign if the swine is male the venus display icon if female the mars icon */}
// //                     <h2 className="text-sm md:text-lg lg:text-xl font-bold text-black leading-tight  col-span-3">
// //                       Expenses: Data
// //                     </h2>

// //                   </div>
// //                   <div className="grid grid-cols-6 mt-5 ">
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Age:days</p></div>
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Stage: Data</p></div>
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Breed: Data</p></div>
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Category: Data</p></div>
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Purpose: Data</p></div>
// //                     <div><p className="text-xs sm:text-sm md:text-md lg:text-md">Stage: Data</p></div>
// //                   </div>
// //                 </div>
// //                 <Separator className=" lg:hidden" />

// //                 {/* Bottom Section */}

// //                 <div className="absolute top-2 right-2 flex space-x-2">
// //                   <button className="p-1 md:p-2 rounded-full bg-green-100 hover:bg-green-200">
// //                     <Plus className="h-5 w-5 text-green-600" />
// //                   </button>
// //                   <button className="p-1 md:p-2 rounded-full hover:bg-green-700 bg-green-500/30">
// //                     <MoreVertical className="h-5 w-5 text-white" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Bottom 20% white */}
// //               <div className="flex-[2] bg-white p-4">
// //                 <p className="text-gray-700 font-medium">Add Note</p>

// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { router } from "@inertiajs/react";
// import { toast } from "sonner";
// // inside SwineCard component:


// import AssignGroupModal from "./assign_group_modal";


// import { Card, CardContent } from "@/components/ui/card";
// import { CalendarPlus2, Group } from "lucide-react";
// import { Plus, MoreVertical, Mars, Venus, Trash2, Pencil, Banknote } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button"
// import { BanknoteArrowDown } from "lucide-react";
// import { useRef, useEffect, useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import SwineFormModal from "../swineform"; // adjust path if needed
// // Type for a single swine
// import { Checkbox } from "@/components/ui/checkbox";

// type Swine = {
//   id: number;
//   tag_number: string;
//   sex: "male" | "female";
//   stage: string;
//   breed?: { name: string } | null; // <-- fix here
//   cuztom_breed?: string | null;
//   purpose: string;
//   category: string;
//   birthdate: string;
//   weight?: string;
//   description?: string;
//   breed_id?: string | null;
//   created_at: string; // <--- needed

// };

// type Group = {
//   id: number;
//   name: string;
//   description?: string;
//   group_type: string;
// };
// type SwineWithGroups = Swine & {
//   assignedGroups: Group[];
//   availableGroups: Group[];
// };


// type Props = {
//   swine: SwineWithGroups;
//   breeds: { id: number; name: string }[];
//   groups: Group[];
//    isSelected?: boolean; // ✅ new
//   onSelect?: (id: number) => void; // ✅ new
// };

// export default function SwineCard({ swine, breeds, groups,isSelected, onSelect }: Props) {
//   // 🧮 Compute age in days

//   const [selectedSwine, setSelectedSwine] = useState<Swine | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   const handleEdit = (swine: Swine) => {
//     setSelectedSwine(swine);
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSelectedSwine(null);
//   };

//   const calculateAgeInDays = (birthday: string) => {
//     const birthDate = new Date(birthday);
//     const today = new Date();
//     const diffTime = today.getTime() - birthDate.getTime();
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
//   };

//   const formatText = (text: string) => {
//     if (!text) return "update";
//     return text
//       .replace(/_/g, " ")
//       .toLowerCase()
//       .replace(/^\w/, (c) => c.toUpperCase());
//   }


//   //delete function
//   const ageInDays = calculateAgeInDays(swine.birthdate);

//   const handleDeleteClick = () => {
//     const createdAt = new Date(swine.created_at);
//     const now = new Date();
//     const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

//     if (diffHours < 24) {
//       // delete immediately
//       router.delete(`/swine/${swine.id}`, {
//         onSuccess: () => {
//           toast.success(
//             `Swine ${swine.tag_number || swine.id} has been deleted.`
//           );
//         },
//         onError: () => {
//           toast.error("Failed to delete swine.");
//         },
//       });
//     } else {
//       // ask confirmation
//       setShowDeleteDialog(true);
//     }
//   };

//   const confirmDelete = () => {
//     router.delete(`/swine/${swine.id}`, {
//       onSuccess: () => {
//         toast.success(`Swine ${swine.tag_number || swine.id} deleted.`);
//         setShowDeleteDialog(false);
//       },
//       onError: () => {
//         toast.error("Failed to delete swine.");
//         setShowDeleteDialog(false);
//       },
//     });
//   };


//   //--------------------fro group assign modal

//   const [isAssignOpen, setIsAssignOpen] = useState(false);



//   return (

//     <div className="w-full" >
//       {/* Responsive container */}
//       <div className="w-full @[925px]:w-4/5 @[925px]:mx-auto mt-5">
//         <Card className="w-full shadow-lg rounded-3xl overflow-hidden p-0 bg-transparent mb-2">
//          <CardContent className="p-0 bg-transparent">
 
//             <div className="h-full flex flex-col">
//               {/* Top 80% green */}
//               <div className="flex-grow bg-green-500 p-4 pb-0 text-white relative flex flex-col">
//                 {/* Top Section */}
//                 <div>
//                   <div className="flex justify-center mt-5 @[511px]:mt-0 mb-0 items-center">
//                      <div className="hidden @[511px]:grid grid-flow-col auto-cols-max gap-4 text-[15px] sm:text-sm md:text-md lg:text-md">
//     <p>{formatText(swine.stage)}</p>
//     <p>
//       {swine.breed?.name
//         ? formatText(swine.breed.name)
//         : swine.cuztom_breed?.trim()
//         ? formatText(swine.cuztom_breed)
//         : "Unknown Breed"}
//     </p>
//     <p>{formatText(swine.category)}</p>
//     <p>{formatText(swine.purpose)}</p>
//   </div>
//                   </div>
//                  <div className="flex items-center mt-0 gap-2 sm:gap-4 flex-wrap">

//   {/* Tag Number + Sex icon */}
//   <h2
//     className="inline-block text-2xl @[759px]:text-4xl font-bold leading-tight flex items-center gap-2 max-w-full whitespace-nowrap"
//   >
//     {swine.tag_number && swine.tag_number.trim() !== ""
//       ? swine.tag_number
//       : `Swine ${swine.id}`}
//   </h2>

//   {/* Sex icon */}
//   {swine.sex === "male" ? (
//     <Mars className="h-5 w-5 text-blue-300" />
//   ) : (
//     <Venus className="h-5 w-5 text-pink-300" />
//   )}

//   {/* Age */}
//   <p className="text-[15px] sm:text-[20px] md:text-md lg:text-md whitespace-nowrap">
//     {ageInDays} {ageInDays > 1 ? "days" : "day"}
//   </p>

//   {/* Expenses for small screens */}
//   <h2 className="block @[370px]:hidden text-sm md:text-xl lg:text-lg text-black whitespace-nowrap">
//     Exp: p 44,444
//   </h2>

//   {/* Expenses for medium screens */}
//   <h2 className="hidden @[370px]:block @[648px]:hidden text-sm md:text-xl lg:text-lg text-black whitespace-nowrap">
//     Expenses: p 44,444
//   </h2>

//   {/* Stage, Breed, Category, Purpose for large screens */}
 
// </div>



                    

//                   {/* <div className="block @[511px]:hidden grid grid-flow-col auto-cols-max gap-2 text-[14px] sm:text-sm md:text-md lg:text-md">
                    
//                      <p className="text-[14px] sm:text-sm md:text-md lg:text-md">
//                       {formatText(swine.stage)}
//                     </p>
//                     <p className="text-[14px] sm:text-sm md:text-md lg:text-md">
//                       {swine.breed?.name
//                         ? formatText(swine.breed.name)
//                         : swine.cuztom_breed?.trim()
//                           ? formatText(swine.cuztom_breed)
//                           : "Unknown Breed"}
//                     </p>
//                     <p className="text-[14px] sm:text-sm md:text-md lg:text-md">
//                       {formatText(swine.category)}</p>
//                     <p className="text-[14px] sm:text-sm md:text-md lg:text-md">
//                       {formatText(swine.purpose)}
//                     </p>
//                   </div> */}

//                   {/* Info Grid */}
//                   <div className="grid grid-cols-4 sm:mt-2 gap-2">

//                     <div>
//                       <p className="text-xs sm:text-sm md:text-base text-bold text-background">
//                         Stage:
//                       </p>
//                       <p className="text-xs sm:text-sm md:text-base lg:text-md">
//                         {formatText(swine.stage)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs sm:text-sm md:text-base text-bold text-background">
//                         Breed:{" "}</p>
//                       <p className="text-xs sm:text-sm md:text-base">
//                         {swine.breed?.name
//                           ? formatText(swine.breed.name)
//                           : swine.cuztom_breed?.trim()
//                             ? formatText(swine.cuztom_breed)
//                             : "Unknown Breed"}
//                       </p>
                     

//                     </div>
                    
//                     <div>
//                       <p className="text-xs sm:text-sm md:text-base text-bold text-background">
//                         Category:
//                       </p>
//                       <p className="text-xs sm:text-sm md:text-base">{formatText(swine.category)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs sm:text-sm md:text-base text-bold text-background">
//                         Purpose:
//                       </p>
//                       <p className="text-xs sm:text-sm md:text-base lg:text-md">
//                         {formatText(swine.purpose)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator className="bg-black mt-2 hidden sm:block" />

//                 <h2 className="hidden @[648px]:block mt-auto text-lg md:text-xl lg:text-lg text-black leading-tight">
//                   Expenses: Data
//                 </h2>
                
//                 {/* Action Icons */}
//                 <div className="absolute top-2 right-2 flex space-x-0">
//                            <Checkbox
//           checked={isSelected}
//           onCheckedChange={() => onSelect?.(swine.id)} // ✅ safe call
//         />
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <button className="p-1 md:p-2 rounded-full hover:bg-green-700 bg-green-500/30 focus:outline-none">
//                         <Plus className="h-6   w-6 text-gray-600 hover:white" />
//                       </button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent align="end" className="bg-white text-black shadow-lg rounded-xl w-10" >
//                       <DropdownMenuLabel className="font-semibold text-sm px-4 py-1">Assign</DropdownMenuLabel>
//                       <DropdownMenuSeparator className="bg-gray-200 my-1 mr-2 ml-2" />
//                       <DropdownMenuItem
//                         className="rounded-lg hover:!bg-green-100 data-[highlighted]:text-black cursor-pointer"
//                       // onClick={onAddExpense}
//                       >
//                         <BanknoteArrowDown className="h-5 w-5 text-orange-600" />Expense
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="rounded-lg hover:!bg-green-100 data-[highlighted]:text-black  cursor-pointer rounded-b-xl"
//                       // onClick={onAddSchedule}
//                       >
//                         <CalendarPlus2 className="h-5 w-5 text-yellow-600 " />
//                         Schedule
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => setIsAssignOpen(true)}
//                         className="rounded-lg hover:!bg-green-100 data-[highlighted]:text-black  cursor-pointer rounded-b-xl"
//                       // onClick={onAddSchedule}
//                       >

//                         <Group className="h-5 w-5 text-blue-600 " />
//                         Group
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <button className="p-1 md:p-2 rounded-full hover:bg-green-700 bg-green-500/30 focus:outline-none">
//                         <MoreVertical className="h-5 w-5 text-white" />
//                       </button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent align="end" className="bg-white text-black shadow-lg rounded-xl w-20">

//                       <DropdownMenuItem onClick={() => handleEdit(swine)}
//                         className="rounded-lg hover:!bg-green-100 data-[highlighted]:text-black rounded-t-xl cursor-pointer"
//                       // onClick={onAddExpense}
//                       >

//                         <Pencil className="h-5 w-5 text-green-600" /> Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator className="bg-gray-200 my-1 mr-2 ml-2" />
//                       <DropdownMenuItem
//                         onClick={handleDeleteClick}
//                         className="rounded-lg hover:!bg-green-100 data-[highlighted]:text-black  rounded-b-xl cursor-pointer"
//                       // onClick={onAddSchedule}
//                       >
//                         <Trash2 className="h-5 w-5 text-destructive" /> Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>



//                 </div>
//               </div>

//               {/* Bottom white */}
//               <div className=" bg-white p-4">
//                 <p className="text-gray-700 font-medium">Add Note</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Modal for Edit */}
//       {selectedSwine && (
//         <SwineFormModal

//           swine={selectedSwine}
//           breeds={breeds}
//           open={isOpen}
//           onClose={handleClose}
//           onUpdate={(updatedData) => {
//             console.log("Updated:", updatedData);
//             // You can trigger refresh or update the table locally
//           }}
//         />
//       )}

//       {/* Modal for assign modal */}
//       <AssignGroupModal
//         assignedGroups={swine.assignedGroups}
//         availableGroups={swine.availableGroups}
//         isOpen={isAssignOpen}
//         onClose={() => setIsAssignOpen(false)}
//         swineId={swine.id}
//         groups={groups}
//       />

//       <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Swine</DialogTitle>
//           </DialogHeader>
//           <p>
//             Are you sure you want to delete{" "}
//             <strong>{swine.tag_number || `Swine ${swine.id}`}</strong>?
//             This action cannot be undone.
//           </p>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDelete}>
//               Yes, Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//     </div>
//   );
// }

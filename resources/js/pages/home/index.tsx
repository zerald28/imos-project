// File: resources/js/Pages/Home/index.tsx// 

import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import Quick from './kpi';

// Breadcrumb example
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Home",
        href: "/home",
    },
];

export default function Homepage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
               <Quick></Quick>


            </div>
        </AppLayout>
    );
}

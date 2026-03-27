import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CalendarView from "@/components/calendar/schedule";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ events, schedules }: any) {
    const { props } = usePage();
  const flash = (props as any).flash || {};

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast(flash.warning);
    if (flash.info) toast(flash.info);
  }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
               <div>
      <h2 className="text-xl font-semibold mb-4">My Dashboard</h2>
      {/* <CalendarView events={events} schedules={schedules} /> */}
    </div>
        </AppLayout>
    );
}

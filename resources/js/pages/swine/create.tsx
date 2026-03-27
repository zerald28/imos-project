import Create from './data-table'
import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/management-layout';
import { appearance } from '@/routes';


const breadcrumbs: BreadcrumbItem[] = [{ title: "Swine Management", href: "#" },
  { title: "Swine", href: "/swine-management/swine" },
  { title: "Create", href: "/create" }
];
interface PageProps {
  breeds?: { id: number; name: string }[];
}



export default function Management({ breeds, today }: PageProps & { today: string }) {
  return (
             <AppLayout breadcrumbs={breadcrumbs}>
                        <Head title="Add Swine" />
            
                        
                            <div className="space-y-6 ">
                                <Heading title="" description="Add new livestock" className="" />
                                 <Create breeds={breeds} today={today} />
                            </div>
                     
                    </AppLayout>
  );
}

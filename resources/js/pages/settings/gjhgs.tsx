import HeadingSmall from '@/components/heading';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { appearance } from '@/routes';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarNavItems: NavItem[] = [
    {
        title: 'List',
        href: '#',
        icon: null,
    },
    {
        title: 'Add Swine',
        href: '/swine/create',
        icon: null,
    },
    {
        title: 'Expenses',
        href: '#',
        icon: null,
    },
  {
    title: 'Profile Information',
   href: '/profile-information', // use absolute path
    icon: null,
}

];


export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
         
            <div className="grid sm:grid-cols-5 m-2 ">
                {/* Children (main content) */}
                 <ScrollArea  className="lg:h-130  flex-1 md:max-w-4xl lg:col-span-4 md:col-span-5 sm:col-span-5  order-2 lg:order-1  ">
                   
                
                    <section className="">{children}</section>
               
                    </ScrollArea>
                {/* Sidebar */}
                <div className="flex flex-col lg:col-span-1 md:col-span-5 sm:col-span-5  order-1 lg:order-2 sm:ml-2 ">
                    <aside className="w-full max-w-xl lg:w-48">
                        <HeadingSmall
                            title="Swine Management"
                            description="Start your business now"
                        />

                        <nav className="flex flex-col space-y-1 space-x-0 ">
                                               {sidebarNavItems.map((item, index) => (
                                                   <Button
                                                       key={`${typeof item.href === 'string' ? item.href : item.href.url}-${index}`}
                                                       size="sm"
                                                       variant="ghost"
                                                       asChild
                                                       className={cn('w-full justify-start', {
                                                           'bg-primary  ': currentPath === (typeof item.href === 'string' ? item.href : item.href.url),
                                                       })}
                                                   >
                                                       <Link href={item.href} prefetch>
                                                           {item.icon && <item.icon className="h-4 w-4" />}
                                                           {item.title}
                                                       </Link>
                                                   </Button>
                                               ))}
                                           </nav>
                    </aside>

                    <Separator className="my-6 lg:hidden" />
                </div>
            </div>
       
    
        
    );
}

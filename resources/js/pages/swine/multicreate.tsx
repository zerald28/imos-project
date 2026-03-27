// pages/swine/multi.tsx
import Create from './data'
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine-management" },
  { title: "Swine", href: "/swine-management/swine" },
  // { title: "Create", href: "/create" }
];

interface PageProps {
  breeds?: { id: number; name: string }[];
  today: string;
  nextTag?: string;
  ownerTagNumbers?: string[];
  maxSwineLimit?: number;
}

export default function Management({
  breeds,
  today,
  nextTag,
  ownerTagNumbers,
  maxSwineLimit,
}: PageProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Create
        breeds={breeds}
        today={today}
        nextTag={nextTag}
        ownerTagNumbers={ownerTagNumbers}
        maxSwineLimit={maxSwineLimit}
      />
    </AppLayout>
  );
}

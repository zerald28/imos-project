// File: resources/js/Layouts/AuthSplitLayout.tsx
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description
}: PropsWithChildren<AuthLayoutProps>) {

    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">

            {/* LEFT SIDE (BG + CENTERED LOGO + NAME) */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r overflow-hidden">

                {/* Background gradient / pattern */}
                <div className="absolute inset-0 bg-sidebar-primary" />

                {/* Soft glowing background decoration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="size-[400px] rounded-full bg-white blur-[100px]" />
                </div>

                {/* CENTERED LOGO + NAME */}
                <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center select-none">
                    <AppLogoIcon className="mb-4 size-24 fill-current text-white drop-shadow-lg" />
                    <h1 className="text-3xl font-semibold tracking-wide drop-shadow-sm">
                        {name}
                    </h1>
                </div>

                {/* QUOTE AT THE BOTTOM */}
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* RIGHT SIDE (FORM PANEL) */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                    {/* MOBILE LOGO */}
                    <Link href={home()} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>

        </div>
    );
}

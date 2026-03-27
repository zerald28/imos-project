// resources/js/layouts/auth-layout.tsx
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { PigIcon } from '@/components/icons';
import { Leaf, Shield, Building2, Home, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen relative">
            {/* FIXED BACKGROUND IMAGE */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
                }}
            />
            
            {/* COLOR OVERLAY */}
            <div className="fixed inset-0 z-0 bg-sidebar-primary/70" />

            {/* Floating decorative elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 animate-bounce opacity-20">
                    <Leaf className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-20 right-10 animate-bounce delay-1000 opacity-20">
                    <Shield className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/3 right-1/4 animate-pulse opacity-10">
                    <Building2 className="w-16 h-16 text-white" />
                </div>
            </div>

         

            {/* Back Button - Top Left (optional, for better navigation) */}
            <div className="fixed top-6 left-6 z-20">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 group shadow-md"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            {/* PAGE CONTENT */}
            <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    
                    {/* Logo and Branding with Link to Home */}
                    <Link href={home()} className="block text-center group">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur rounded-full group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-105">
                                <PigIcon className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-white/80">
                            {description}
                        </p>
                    </Link>

                    {/* Form Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                        {children}
                    </div>

                    {/* Footer Note */}
                    <div className="text-center">
                        <p className="text-xs text-white/60">
                            Integrated Monitoring System for Swine Farming
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
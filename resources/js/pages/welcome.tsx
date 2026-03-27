import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import BlogStatic from "@/pages/cms/BlogStatic";
import { route } from 'ziggy-js';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Building2,
  Leaf,
  Users,
  Shield,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  PiggyBank,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  ShoppingBag,
  Store,
  Calendar,
  TrendingDown,
  Activity,
  UserCheck,
  DollarSign,
  ChevronRight,
  BookOpen,
  PenTool,
  Home
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { PigIcon } from '@/components/icons';

// Define the stats interface locally
interface PageStats {
    farmers_registered?: number;
    insurance_applications?: number;
    marketplace_available?: number;
}

export default function Welcome() {
    const page = usePage<SharedData>();
    const { auth, blogContent } = page.props;
    const stats = page.props.stats as PageStats | undefined;
    const [activeStat, setActiveStat] = useState(0);
    const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

    // Get user role from auth
    const userRole = auth.user?.role;

    // Create stats array with proper fallback values
    const statsData = [
        { 
            value: stats?.farmers_registered ?? 0, 
            label: userRole === 'farmer' ? 'Farmers Registered' : 'Farmers Community', 
            icon: Users, 
            color: 'text-sidebar-primary',
            bgColor: 'bg-sidebar-primary/10',
            borderColor: 'border-sidebar-primary/20',
            hoverColor: 'hover:bg-sidebar-primary/20',
            description: 'Active farmers in the community'
        },
        { 
            value: stats?.insurance_applications ?? 0, 
            label: 'Insurance Applications', 
            icon: FileText, 
            color: 'text-sidebar-primary',
            bgColor: 'bg-sidebar-primary/10',
            borderColor: 'border-sidebar-primary/20',
            hoverColor: 'hover:bg-sidebar-primary/20',
            description: 'Total applications processed'
        },
        { 
            value: stats?.marketplace_available ?? 0, 
            label: 'Marketplace Available', 
            icon: Store, 
            color: 'text-sidebar-primary',
            bgColor: 'bg-sidebar-primary/10',
            borderColor: 'border-sidebar-primary/20',
            hoverColor: 'hover:bg-sidebar-primary/20',
            description: 'Active swine listings'
        },
        { 
            value: 95, 
            label: 'Success Rate', 
            icon: TrendingUp, 
            color: 'text-sidebar-primary',
            bgColor: 'bg-sidebar-primary/10',
            borderColor: 'border-sidebar-primary/20',
            hoverColor: 'hover:bg-sidebar-primary/20',
            suffix: '%',
            description: 'Transaction success rate'
        }
    ];

    // Animate stats on mount
    useEffect(() => {
        const timeouts = statsData.map((stat, index) => {
            return setTimeout(() => {
                setAnimatedStats(prev => {
                    const newStats = [...prev];
                    newStats[index] = stat.value;
                    return newStats;
                });
            }, index * 100);
        });
        
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }, []);

    return (
        <>
            <Head title="Welcome" />

            {/* FIXED BACKGROUND IMAGE */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
                }}
            />
            
            {/* COLOR OVERLAY - sidebar-primary theme */}
            <div className="fixed inset-0 z-0 bg-sidebar-primary/70" />

            {/* PAGE CONTENT */}
            <div className="relative z-10 flex flex-col items-center w-full">

                {/* NAVIGATION */}
                <div className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="flex justify-between items-center py-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <PigIcon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white font-semibold text-lg">IMOSSF</span>
                            </div>
                            <nav className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('cms.exit')}
                                        className="rounded-lg bg-white text-sidebar-primary px-6 py-2 text-sm font-semibold hover:bg-gray-100 shadow transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-lg text-white hover:bg-white/20 px-4 py-2 text-sm transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-white text-sidebar-primary px-6 py-2 text-sm font-semibold hover:bg-gray-100 transition"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                    </div>
                </div>

                {/* HERO SECTION */}
                <div className="w-full py-16 lg:py-24">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-white text-sm">Empowering Swine Backyard Farming</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-xl mb-6">
                            Integrated Monitoring System for Swine Farming
                        </h1>
                        <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                            A modern platform for farmers, buyers, and agricultural personnel to manage
                            livestock insurance, marketplace transactions, and real-time monitoring.
                        </p>
                        <div className="mt-8 flex gap-4 justify-center">
                            <Link
                                href={register()}
                                className="bg-white text-sidebar-primary font-semibold rounded-xl px-8 py-3 shadow-lg hover:shadow-xl hover:bg-gray-100 transition flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href={login()}
                                className="bg-white/20 text-white font-semibold rounded-xl px-8 py-3 backdrop-blur hover:bg-white/30 transition shadow-lg"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FEATURE CARDS - sidebar-primary theme */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-sidebar-primary/10 rounded-lg">
                                    <FileText className="w-5 h-5 text-sidebar-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Insurance Processing</h3>
                            </div>
                            <p className="text-gray-600 mt-2 text-sm">
                                Streamlined insurance application and tracking for livestock owners with DA-backed insurance programs.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-sidebar-primary/10 rounded-lg">
                                    <ShoppingBag className="w-5 h-5 text-sidebar-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Marketplace</h3>
                            </div>
                            <p className="text-gray-600 mt-2 text-sm">
                                Browse and buy available swine listings with DA-verified quality assurance.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-sidebar-primary/10 rounded-lg">
                                    <Activity className="w-5 h-5 text-sidebar-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Monitoring System</h3>
                            </div>
                            <p className="text-gray-600 mt-2 text-sm">
                                Real-time swine condition tracking with DA-approved health indicators and protocols.
                            </p>
                        </div>
                    </div>
                </div>

                {/* MAIN TWO-COLUMN SECTION: QUICK STATS + BLOG */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN - QUICK STATS */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                                    <div className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 px-6 py-4">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" />
                                            Quick Statistics
                                        </h2>
                                        <p className="text-white/80 text-sm mt-1">Real-time platform metrics</p>
                                    </div>
                                    
                                    <div className="p-6 space-y-4">
                                        {statsData.map((stat, index) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div 
                                                    key={index}
                                                    className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${stat.bgColor} ${stat.hoverColor} border ${stat.borderColor} hover:shadow-md`}
                                                    onMouseEnter={() => setActiveStat(index)}
                                                    onClick={() => setActiveStat(index)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Icon className={`w-5 h-5 ${stat.color}`} />
                                                                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                                                            </div>
                                                            <div className="text-3xl font-bold text-gray-800">
                                                                {animatedStats[index]}
                                                                {stat.suffix || '+'}
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                                                        </div>
                                                        {activeStat === index && (
                                                            <div className="animate-pulse">
                                                                <ChevronRight className={`w-5 h-5 ${stat.color}`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Last updated</span>
                                            <span className="text-gray-800 font-medium">Today</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - BLOG CONTENT with sidebar-primary theme */}
                        <div className="lg:col-span-8">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                                <div className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                                <BookOpen className="w-5 h-5" />
                                                Latest Agricultural Insights
                                            </h2>
                                            <p className="text-white/80 text-sm mt-1">
                                                Expert advice, news, and updates for swine farmers
                                            </p>
                                        </div>
                                        <div className="bg-white/20 rounded-full p-2">
                                            <Leaf className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <BlogStatic content={blogContent as any[]} />
                                </div>
                                
                                {/* Call to action with sidebar-primary theme */}
                                <div className="border-t border-gray-200 px-6 py-4 bg-gradient-to-r from-sidebar-primary/5 to-white">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-sidebar-primary/10 rounded-full">
                                                <PenTool className="w-5 h-5 text-sidebar-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Share your experience</p>
                                                <p className="text-xs text-gray-500">Help other farmers learn from your journey</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={auth.user ? '/cms/blog/create' : register()}
                                            className="inline-flex items-center gap-2 bg-sidebar-primary text-white font-semibold rounded-lg px-6 py-2 hover:bg-sidebar-primary/80 transition whitespace-nowrap shadow-md hover:shadow-lg"
                                        >
                                            Write a Post
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DA FOOTER */}
                <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border-t border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* DA Logo and Description */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Department of Agriculture</h2>
                                        <p className="text-white/80 text-sm">Republic of the Philippines</p>
                                    </div>
                                </div>
                                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                    Committed to sustainable agriculture and modern farming practices 
                                    for the empowerment of Filipino farmers and the nation's food security.
                                </p>
                                <div className="flex gap-3">
                                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                                        <Facebook className="w-5 h-5 text-white" />
                                    </a>
                                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                                        <Twitter className="w-5 h-5 text-white" />
                                    </a>
                                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                                        <Globe className="w-5 h-5 text-white" />
                                    </a>
                                </div>
                            </div>

                            {/* Location Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Location
                                </h3>
                                <div className="space-y-2 text-white/70 text-sm">
                                    <p>San Teodoro, Bunawan</p>
                                    <p>Agusan del Sur</p>
                                    <p>Caraga Region, Philippines</p>
                                    <p className="mt-4">
                                        <span className="font-medium text-white">Regional Office:</span><br/>
                                        DA-RFO Caraga Region
                                    </p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <Phone className="w-5 h-5 text-white/60 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-white/70">(085) 342-1234</p>
                                            <p className="text-xs text-white/50">Telephone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Mail className="w-5 h-5 text-white/60 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-white/70">da.rfocaraga@da.gov.ph</p>
                                            <p className="text-xs text-white/50">Email Address</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Globe className="w-5 h-5 text-white/60 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-white/70">da.gov.ph/caraga</p>
                                            <p className="text-xs text-white/50">Website</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/20 my-8"></div>

                        {/* Bottom Footer */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-white/50 text-sm">
                                <p>© {new Date().getFullYear()} Department of Agriculture - Caraga Region. All rights reserved.</p>
                            </div>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="text-white/60 hover:text-white transition">Privacy Policy</a>
                                <a href="#" className="text-white/60 hover:text-white transition">Terms of Service</a>
                                <a href="#" className="text-white/60 hover:text-white transition">Accessibility</a>
                            </div>
                        </div>

                        {/* Government Seal */}
                        <div className="text-center mt-8">
                            <p className="text-white/40 text-xs">
                                This system is developed in partnership with the Department of Agriculture 
                                under the Philippine Swine Industry Development Program.
                            </p>
                            <p className="text-white/40 text-xs mt-2">
                                For emergencies and immediate assistance, contact DA Hotline: 165-02
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
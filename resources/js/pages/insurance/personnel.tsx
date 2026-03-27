// resources/js/Pages/DA/Personnel.tsx

import React, { useState, useRef, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { route } from "ziggy-js";
import {
    Menu,
    X,
    ChevronLeft,
    LogIn,
    Shield,
    Users,
    Phone,
    Mail,
    MapPin,
    Info,
    Search,
    MessageCircle,
    PhoneCall,
    MailOpen,
    Copy,
    Check,
    XCircle,
    Building2,
    MapPinned,
    Eye,
    EyeOff,
    ChevronDown,
    ChevronUp,
    FormInput
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast, Toaster } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Personnel {
    id: number;
    name: string;
    email: string;
    role: string;
    firstname: string | null;
    middlename: string | null;
    lastname: string | null;
    extension: string | null;
    full_name: string;
    contact: string;
    description: string;
    barangay: {
        id: number;
        name: string;
    } | null;
    municipal: {
        id: number;
        name: string;
    } | null;
    province: {
        id: number;
        name: string;
    } | null;
    profile_picture: string | null;
}

interface Barangay {
    id: number;
    name: string;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            role: string;
        };
    };
    personnel: Personnel[];
    bunawanBarangays: Barangay[];
}

export default function Personnel({ auth, personnel, bunawanBarangays }: PageProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState<string>("all");
    const [selectedBarangay, setSelectedBarangay] = useState<string>("all");
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [showPersonnel, setShowPersonnel] = useState(false);
    
    // State for header visibility
    const [showPageHeader, setShowPageHeader] = useState(true);
    const mainContentRef = useRef<HTMLDivElement>(null);

    // Navigation items
    const navItems = [
        { name: 'Back to Main', href: route('cms.exit'), icon: LogIn },
        { name: 'Application Form', href: route('insurance.application.create'), icon: FormInput },
        { name: 'DA ', href: route('da.personnel'), icon: Users, active: true },
    ];

    // Scroll listener for header hide/show
    useEffect(() => {
        const handleScroll = () => {
            if (mainContentRef.current) {
                const scrollTop = mainContentRef.current.scrollTop;
                setShowPageHeader(scrollTop < 10);
            }
        };

        const currentRef = mainContentRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            return () => currentRef.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Filter personnel based on search, role, and barangay
    const filteredPersonnel = personnel.filter(person => {
        const matchesSearch = searchTerm === "" || 
            person.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (person.description && person.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (person.barangay?.name && person.barangay.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (person.municipal?.name && person.municipal.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.contact.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === "all" || person.role === filterRole;
        
        // Barangay filter - only for Bunawan (municipal_id = 2)
        const matchesBarangay = selectedBarangay === "all" || 
            (person.municipal?.id === 2 && person.barangay?.id === parseInt(selectedBarangay));

        return matchesSearch && matchesRole && matchesBarangay;
    });

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const getRoleBadgeColor = (role: string) => {
        switch(role) {
            case 'admin':
                return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700';
            case 'enforcer':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700';
            default:
                return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        }
    };

    // Communication functions
    const handleCall = (phoneNumber: string) => {
        const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');
        window.location.href = `tel:${cleanedNumber}`;
        toast.success(`Calling ${phoneNumber}...`);
    };

    const handleText = (phoneNumber: string) => {
        const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');
        window.location.href = `sms:${cleanedNumber}`;
        toast.success(`Opening SMS to ${phoneNumber}...`);
    };

    const handleEmail = (email: string, subject?: string) => {
        const mailtoSubject = subject ? `?subject=${encodeURIComponent(subject)}` : '';
        window.location.href = `mailto:${email}${mailtoSubject}`;
        toast.success(`Opening email client for ${email}...`);
    };

    const handleCopyToClipboard = (text: string, id: number, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success(`${type} copied to clipboard!`);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setFilterRole("all");
        setSelectedBarangay("all");
        setIsFilterDialogOpen(false);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filterRole !== "all") count++;
        if (selectedBarangay !== "all") count++;
        if (searchTerm) count++;
        return count;
    };

    return (
        <TooltipProvider>
            <div
                className="min-h-screen bg-cover bg-center relative overflow-hidden dark:bg-gray-900"
                style={{
                    backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
                }}
            >
                <Toaster position="top-right" richColors />
                
                {/* Overlay for blur & readability - Dark mode adjusted */}
                <div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"></div>

                {/* Main Navigation Header - Dark mode compatible */}
                <header className="sticky top-0 z-50 w-full bg-green-900/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-green-800 dark:border-gray-700 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="text-xl font-bold text-white hover:text-green-200 dark:text-gray-100 dark:hover:text-green-400 transition-colors">
                                    <span className="text-green-300 dark:text-green-500">Livestock</span> System
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                                            ${item.active 
                                                ? 'bg-green-700 dark:bg-green-800 text-white shadow-lg border border-green-600 dark:border-green-700' 
                                                : 'text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white border border-transparent hover:border-green-600 dark:hover:border-gray-700'
                                            }
                                        `}
                                    >
                                        <item.icon size={16} />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2.5 rounded-lg text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden py-4 border-t border-green-800 dark:border-gray-700">
                                <div className="flex flex-col space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm
                                                ${item.active 
                                                    ? 'bg-green-700 dark:bg-green-800 text-white border border-green-600 dark:border-green-700' 
                                                    : 'text-green-100 dark:text-gray-300 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white border border-transparent hover:border-green-600 dark:hover:border-gray-700'
                                                }
                                            `}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <item.icon size={18} />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Header - Dark mode compatible */}
                {showPageHeader && (
                    <div className="relative z-10 w-full bg-gradient-to-b from-green-900/30 to-green-800/10 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm py-6 border-b border-green-800/20 dark:border-gray-700/20 transition-all duration-300">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-gray-100 mb-2 flex items-center gap-2">
                                        <Shield className="w-8 h-8 text-green-300 dark:text-green-500" />
                                        DA Bunawan Livestock Office
                                    </h1>
                                    <p className="text-green-200/90 dark:text-gray-300">
                                        Your partner in agricultural development
                                    </p>
                                </div>
                                <Button 
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 bg-green-800/40 dark:bg-gray-700/40 hover:bg-green-700/60 dark:hover:bg-gray-600/60 text-white border border-green-700 dark:border-gray-600 self-start sm:self-center"
                                    variant="outline"
                                    size="sm"
                                >
                                    <ChevronLeft size={16} />
                                    Back
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div 
                    ref={mainContentRef}
                    className={`absolute inset-x-0 bottom-0 overflow-y-auto transition-all duration-300 ${
                        showPageHeader ? 'top-[160px]' : 'top-[64px]'
                    }`}
                >
                    <Head title="DA Personnel" />

                    <div className="max-w-7xl mx-auto py-20 sm:py-6 px-4">
                        <div className="space-y-6">
                            
                            {/* Hero Message - Dark mode compatible */}
                            <div className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-700/30 dark:border-gray-700 overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row items-start gap-6">
                                        <div className="bg-blue-500/20 dark:bg-blue-500/10 p-3 rounded-full">
                                            <Building2 className="w-12 h-12 text-blue-300 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-gray-100 mb-3">
                                                Ang Department of Agriculture - Bunawan Livestock Office ay handang magsilbi sa inyo! 📞
                                            </h2>
                                            <div className="space-y-4 text-blue-100 dark:text-gray-300">
                                                <p className="text-lg">
                                                    Visit or contact the DA Bunawan Livestock Office for all your agricultural needs.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-blue-500/30 dark:bg-blue-500/20 p-2 rounded-lg">
                                                            <MapPin className="w-5 h-5 text-white dark:text-gray-200" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-white dark:text-gray-100">Visit Our Office</p>
                                                            <p className="text-sm text-blue-200 dark:text-gray-400">Bunawan Municipal Hall, Agusan del Sur</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-blue-950/50 dark:bg-gray-800/50 p-4 rounded-lg border border-blue-700/50 dark:border-gray-700 mt-4">
                                                    <p className="text-sm text-blue-200 dark:text-gray-400">
                                                        <span className="font-semibold text-white dark:text-gray-200">Office Hours:</span> Monday-Friday, 8:00 AM - 5:00 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Personnel Section - Dark mode compatible */}
                            <div className="bg-gradient-to-b from-green-900/80 to-green-800/80 dark:from-gray-800/95 dark:to-gray-900/95 rounded-xl shadow-lg border border-green-700/30 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
                                <button
                                    onClick={() => setShowPersonnel(!showPersonnel)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-700/30 dark:hover:bg-gray-700/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Users className={`w-5 h-5 ${showPersonnel ? 'text-green-300 dark:text-green-400' : 'text-green-400 dark:text-green-500'}`} />
                                        <span className="font-medium text-white dark:text-gray-100">
                                            {showPersonnel ? 'View Personnel' : 'View Personnel'}
                                        </span>
                                        <Badge variant="outline" className="bg-green-700/50 dark:bg-gray-700/50 text-green-100 dark:text-gray-300 border-green-500 dark:border-gray-600">
                                            {personnel.length} personnel
                                        </Badge>
                                    </div>
                                    {showPersonnel ? (
                                        <ChevronUp className="w-5 h-5 text-green-300 dark:text-green-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-green-400 dark:text-green-500" />
                                    )}
                                </button>

                                {/* Personnel Section - Hidden by default */}
                                {showPersonnel && (
                                    <div className="p-6 border-t border-green-700/30 dark:border-gray-700">
                                        {/* Filters - Dark mode compatible */}
                                        <div className="flex flex-col gap-4 mb-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white dark:text-gray-100">
                                                    Personnel Directory
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    {/* Search */}
                                                    <div className="relative">
                                                        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400 w-3.5 h-3.5" />
                                                        <Input
                                                            placeholder="Search personnel..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="pl-8 h-8 w-48 text-sm bg-white/90 dark:bg-gray-800/90 border-green-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 dark:focus:ring-green-500 text-gray-900 dark:text-gray-100"
                                                        />
                                                    </div>

                                                    {/* Barangay Filter */}
                                                    <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                className={`h-8 border-green-600/30 dark:border-gray-600 text-white dark:text-gray-200 hover:bg-green-700/50 dark:hover:bg-gray-700/50 ${
                                                                    selectedBarangay !== "all" ? "bg-green-700/70 dark:bg-green-800/70" : "bg-green-800/30 dark:bg-gray-800/30"
                                                                }`}
                                                            >
                                                                <MapPinned className="w-3.5 h-3.5 mr-1" />
                                                                <span>Barangay</span>
                                                                {selectedBarangay !== "all" && (
                                                                    <span className="ml-1 bg-green-600 dark:bg-green-500 rounded-full w-1.5 h-1.5"></span>
                                                                )}
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
                                                            <DialogHeader>
                                                                <DialogTitle className="dark:text-gray-100">Filter by Barangay</DialogTitle>
                                                                <DialogDescription className="dark:text-gray-400">
                                                                    Select a barangay in Bunawan to filter personnel
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="max-h-[60vh] overflow-y-auto pr-2">
                                                                <div className="space-y-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedBarangay("all");
                                                                            setIsFilterDialogOpen(false);
                                                                        }}
                                                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                                                            selectedBarangay === "all"
                                                                                ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 font-medium"
                                                                                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                                                        }`}
                                                                    >
                                                                        All Barangays
                                                                    </button>
                                                                    {bunawanBarangays.map((barangay) => (
                                                                        <button
                                                                            key={barangay.id}
                                                                            onClick={() => {
                                                                                setSelectedBarangay(barangay.id.toString());
                                                                                setIsFilterDialogOpen(false);
                                                                            }}
                                                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                                                                selectedBarangay === barangay.id.toString()
                                                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 font-medium"
                                                                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                                                            }`}
                                                                        >
                                                                            {barangay.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end mt-4">
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedBarangay("all");
                                                                        setIsFilterDialogOpen(false);
                                                                    }}
                                                                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                                                >
                                                                    Clear
                                                                </Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {/* Clear Filters */}
                                                    {getActiveFilterCount() > 0 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={clearFilters}
                                                            className="h-8 text-green-200 dark:text-green-400 hover:text-white dark:hover:text-gray-100 hover:bg-green-700/50 dark:hover:bg-gray-700/50"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Active Filters - Dark mode compatible */}
                                            {getActiveFilterCount() > 0 && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-green-300 dark:text-green-400">Active:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {selectedBarangay !== "all" && (
                                                            <Badge variant="outline" className="bg-green-700/50 dark:bg-green-800/50 text-green-100 dark:text-green-200 border-green-500 dark:border-green-600 text-xs">
                                                                Brgy: {bunawanBarangays.find(b => b.id.toString() === selectedBarangay)?.name}
                                                                <button onClick={() => setSelectedBarangay("all")} className="ml-1 hover:text-white dark:hover:text-gray-200">
                                                                    <XCircle className="w-3 h-3" />
                                                                </button>
                                                            </Badge>
                                                        )}
                                                        {searchTerm && (
                                                            <Badge variant="outline" className="bg-green-700/50 dark:bg-green-800/50 text-green-100 dark:text-green-200 border-green-500 dark:border-green-600 text-xs">
                                                                "{searchTerm}"
                                                                <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-white dark:hover:text-gray-200">
                                                                    <XCircle className="w-3 h-3" />
                                                                </button>
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Separator className="bg-green-700/50 dark:bg-gray-700 mb-6" />

                                        {/* Personnel Grid - Dark mode compatible */}
                                        {filteredPersonnel.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {filteredPersonnel.map((person) => (
                                                    <Card key={person.id} className="bg-white/95 dark:bg-gray-800/95 border border-green-200/30 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
                                                        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 dark:from-gray-700 dark:to-gray-800/50 py-3 px-4">
                                                            <div className="flex items-start gap-3">
                                                                <Avatar className="w-12 h-12 border-2 border-green-500 dark:border-green-600 shadow-md">
                                                                    {person.profile_picture ? (
                                                                        <AvatarImage src={person.profile_picture} alt={person.full_name} />
                                                                    ) : null}
                                                                    <AvatarFallback className="bg-green-600 dark:bg-green-700 text-white text-sm">
                                                                        {getInitials(person.full_name)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1 min-w-0">
                                                                    <CardTitle className="text-base text-green-900 dark:text-gray-100 truncate">
                                                                        {person.full_name}
                                                                    </CardTitle>
                                                                    <Badge 
                                                                        className={`mt-1 text-xs ${getRoleBadgeColor(person.role)} capitalize`}
                                                                        variant="outline"
                                                                    >
                                                                        "{person.description}"
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="p-4 space-y-3">
                                                            {/* Contact Information - Dark mode compatible */}
                                                            <div className="space-y-2">
                                                                {/* Phone Number */}
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-3.5 h-3.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                                                                    <span className="text-gray-700 dark:text-gray-300 text-xs flex-1">
                                                                        {person.contact}
                                                                    </span>
                                                                    <div className="flex gap-0.5">
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
                                                                                    onClick={() => handleCall(person.contact)}
                                                                                >
                                                                                    <PhoneCall className="w-3.5 h-3.5" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                                                                                <p>Call</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>

                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                                                                    onClick={() => handleText(person.contact)}
                                                                                >
                                                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                                                                                <p>Send SMS</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>

                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                                    onClick={() => handleCopyToClipboard(person.contact, person.id, 'Phone number')}
                                                                                >
                                                                                    {copiedId === person.id ? (
                                                                                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                                                                                    ) : (
                                                                                        <Copy className="w-3.5 h-3.5" />
                                                                                    )}
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                                                                                <p>Copy number</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>

                                                                {/* Email */}
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-3.5 h-3.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                                                                    <span className="text-gray-700 dark:text-gray-300 text-xs flex-1 truncate">
                                                                        {person.email}
                                                                    </span>
                                                                    <div className="flex gap-0.5">
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                                                                    onClick={() => handleEmail(person.email, `Inquiry for ${person.full_name}`)}
                                                                                >
                                                                                    <MailOpen className="w-3.5 h-3.5" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                                                                                <p>Send Email</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>

                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                                    onClick={() => handleCopyToClipboard(person.email, person.id, 'Email')}
                                                                                >
                                                                                    {copiedId === person.id ? (
                                                                                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                                                                                    ) : (
                                                                                        <Copy className="w-3.5 h-3.5" />
                                                                                    )}
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                                                                                <p>Copy email</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Location Information - Dark mode compatible */}
                                                            {(person.barangay || person.municipal || person.province) && (
                                                                <div className="flex items-start gap-2 text-xs">
                                                                    <MapPin className="w-3.5 h-3.5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                                                                    <div className="text-gray-700 dark:text-gray-300">
                                                                        {person.barangay && (
                                                                            <div>Brgy. {person.barangay.name}</div>
                                                                        )}
                                                                        {person.municipal && (
                                                                            <div>{person.municipal.name}</div>
                                                                        )}
                                                                        {person.province && (
                                                                            <div>{person.province.name}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Enforcer-specific: Barangay - Dark mode compatible */}
                                                            {person.role === 'enforcer' && person.barangay && (
                                                                <div className="mt-1 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded border border-blue-200 dark:border-blue-800">
                                                                    <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                                                                        Assigned: Brgy. {person.barangay.name}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Bunawan Badge - Dark mode compatible */}
                                                            {person.municipal?.id === 2 && (
                                                                <div className="mt-1">
                                                                    <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 text-[10px]">
                                                                        Bunawan
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Users className="w-12 h-12 text-green-300 dark:text-green-500 mx-auto mb-2" />
                                                <h3 className="text-lg font-medium text-white dark:text-gray-100 mb-1">No Personnel Found</h3>
                                                <p className="text-sm text-green-200 dark:text-gray-400">
                                                    {searchTerm || selectedBarangay !== "all"
                                                        ? 'Try adjusting your filters'
                                                        : 'No personnel match your criteria'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
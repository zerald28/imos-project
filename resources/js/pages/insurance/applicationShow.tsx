import React, { useState, useEffect, useRef } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { route } from "ziggy-js";
import axios from "axios";
import { 
  SquareArrowOutUpRight, 
  Menu, 
  X, 
  ChevronLeft, 
  UserPlus, 
  FileText, 
  LogIn,
  Pen,
  Shield,
  FormInput,
  Users
} from "lucide-react";

interface Swine {
    id: number;
    tag_number: string;
    breed?: { name: string } | null;
    cuztom_breed?: string;
    description?: string;
}

interface Animal {
    id: number;
    sex: string;
    breed: string;
    ear_mark: string;
    color: string;
    age?: number;
    proof_of_ownership?: string;
    created_at: string;
}

export default function ApplicationShow({ application, farmer, animals: initialAnimals, proponent, availableSwine, auth }: any) {
    const [animals, setAnimals] = useState(initialAnimals);
    const [selectedSwineId, setSelectedSwineId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const isFarmer = auth.user.role === "farmer";
    const isAdminOrEnforcer = auth.user.role === "admin" || auth.user.role === "enforcer";
    const [proofOfOwnership, setProofOfOwnership] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for header visibility
    const [showPageHeader, setShowPageHeader] = useState(true);
    const mainContentRef = useRef<HTMLDivElement>(null);

    const formatCurrency = (value: number | null | undefined) => 
        value != null ? `₱${value.toLocaleString()}` : 'N/A';

    const formatDate = (value: string | null | undefined) => 
        value ? new Date(value).toLocaleDateString() : 'N/A';

    // Wrap the prop in state
    const [availableSwineState, setAvailableSwine] = useState(availableSwine || []);
    const [selectedSwineIds, setSelectedSwineIds] = useState<number[]>([]);
    const [numberOfHeads, setNumberOfHeads] = useState(application.number_of_heads);
    const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const animalType = application.animal_type?.trim().toLowerCase();
    const showProofOfOwnership = ["cattle", "carabao", "horse"].includes(animalType);
    const [activeTab, setActiveTab] = useState("livestock");

    // Scroll listener for header hide/show
    useEffect(() => {
        const handleScroll = () => {
            if (mainContentRef.current) {
                const scrollTop = mainContentRef.current.scrollTop;
                // Hide header after scrolling 50px, show when scroll is near top
                setShowPageHeader(scrollTop < 10);
            }
        };

        const currentRef = mainContentRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            return () => currentRef.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Navigation items with consistent active styling
    const navItems = [
        { name: 'Back to Main', href: route('cms.exit'), icon: LogIn },
        { name: 'Application Form', href: route('insurance.application.create'), icon: FormInput },
        { name: 'Insurance Application', href: route('farmer.profile.show'), icon: FileText, active: true },
        { name: 'DA ', href: route('da.personnel'), icon: Users },
    ];

    const toggleSwine = (id: number) => {
        setSelectedSwineIds((prev) =>
            prev.includes(id)
                ? prev.filter((sid) => sid !== id)
                : [...prev, id]
        );
    };

    const handleAddMultipleSwine = async () => {
        if (selectedSwineIds.length === 0) {
            alert("Please select at least one swine.");
            return;
        }

        try {
            const res = await axios.post(`/insurance/${application.id}/animals/add-multiple`, {
                swine_ids: selectedSwineIds,
                proof_of_ownership: proofOfOwnership,
            });

            if (res.data.success) {
                const newAnimals: Animal[] = res.data.animals.map((a: Animal) => ({
                    ...a,
                    age: a.age != null ? Math.round(a.age) : a.age,
                }));

                setAnimals((prev: Animal[]) => [...prev, ...newAnimals]);
                setAvailableSwine((prev: Swine[]) =>
                    prev.filter((s: Swine) => !selectedSwineIds.includes(s.id))
                );
                setNumberOfHeads(res.data.number_of_heads);
                setSelectedSwineIds([]);
                setProofOfOwnership("");
            } else {
                alert("Failed to add swine.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong adding swine.");
        }
    };

    const handleDeleteAnimal = async (id: number) => {
        if (!confirm("Delete this animal?")) return;

        try {
            const response = await axios.delete(`/insurance/animal/${id}`);

            if (response.data.success) {
                const deletedAnimal: Animal | undefined = animals.find(
                    (a: Animal) => a.id === id
                );
                
                setAnimals((prev: Animal[]) => prev.filter((a: Animal) => a.id !== id));

                if (deletedAnimal) {
                    setAvailableSwine((prev: Swine[]) => [
                        ...prev,
                        {
                            id: deletedAnimal.id,
                            tag_number: deletedAnimal.ear_mark,
                            breed: { name: deletedAnimal.breed },
                            description: deletedAnimal.color,
                        },
                    ]);
                }

                setNumberOfHeads(response.data.number_of_heads);
            } else {
                alert("Failed to delete animal.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete animal.");
        }
    };

    const getProfileFallback = (name: string) => {
        if (!name) return "N/A";
        const initials = name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
        return initials;
    };

    const getProfileColor = (name: string) => {
        const colors = [
            'bg-green-700 dark:bg-green-800', 'bg-blue-700 dark:bg-blue-800', 'bg-purple-700 dark:bg-purple-800', 
            'bg-amber-700 dark:bg-amber-800', 'bg-red-700 dark:bg-red-800', 'bg-indigo-700 dark:bg-indigo-800'
        ];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    const formatDateOnly = (isoString: string | null | undefined) => {
        if (!isoString) return 'N/A';
        
        try {
            const date = new Date(isoString);
            // Format as: MM/DD/YYYY
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center relative overflow-hidden dark:bg-gray-900"
                style={{
                    backgroundImage: "url('/485800765_1117928273470191_4976529546870698484_n.jpg')",
                }}
            >
                {/* Overlay for blur & readability - Dark mode variant */}
                <div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"></div>
                
                {/* Main Navigation Header - Dark mode support */}
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

                {/* Page Header - Dark mode support */}
                {showPageHeader && (
                    <div className="relative z-10 w-full bg-gradient-to-b from-green-900/30 to-green-800/10 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm py-8 border-b border-green-800/20 dark:border-gray-700/20 transition-all duration-300">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-gray-100 mb-2">Insurance Application Details</h1>
                                    <p className="text-green-200/90 dark:text-gray-300">
                                        Application #{application.id} • {application.farmer_name || 'No Name'}
                                    </p>
                                </div>
                                <Button 
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 bg-green-800/40 dark:bg-gray-700/40 hover:bg-green-700/60 dark:hover:bg-gray-600/60 text-white border border-green-700 dark:border-gray-600"
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

                {/* Mobile Menu Button for sidebar */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden fixed top-20 left-4 z-50 p-2 bg-green-900/10 dark:bg-gray-900/10 text-white rounded-lg shadow-lg"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Main content container - Single scrollable area */}
                <div 
                    ref={mainContentRef}
                    className={`absolute inset-x-0 bottom-0 overflow-y-auto transition-all duration-300 ${
                        showPageHeader ? 'top-[180px]' : 'top-[64px]'
                    }`}
                >
                    <div className="flex flex-col md:flex-row min-h-full">
                        
                        {/* Left column - Dark mode support */}
                        <aside className={`
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                            md:translate-x-0 md:flex 
                            flex-col w-full md:w-1/3 lg:w-1/4 
                            pt-6 md:pt-5 p-4 md:p-6 
                            text-white dark:text-gray-200
                            h-screen md:sticky md:top-0 
                            fixed top-0 left-0 
                            bg-green-900/95 dark:bg-gray-900/95 md:bg-green-900/80 dark:md:bg-gray-900/80
                            z-40 
                            transition-transform duration-300 
                            overflow-y-auto
                        `}>
                            {/* Mobile close button */}
                            <div className="flex justify-between items-center mb-4 md:hidden">
                                <h2 className="text-xl font-bold text-white dark:text-gray-200">Insurance Info</h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-lg hover:bg-green-800 dark:hover:bg-gray-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-white dark:text-gray-200">
                                Mortality Insurance Application
                            </h2>
                            
                            <p className="mb-3 text-justify text-sm md:text-base text-white/90 dark:text-gray-300">
                                Livestock mortality insurance provides coverage against death or loss of animals due to accidents, diseases, or epidemics. It ensures financial stability for farmers and promotes sustainable farming practices.
                            </p>
                            
                            <p className="mb-2 font-semibold text-sm md:text-base text-white dark:text-gray-200">Benefits:</p>
                            <ul className="list-disc list-inside mb-4 space-y-1 text-justify text-sm md:text-base text-white/90 dark:text-gray-300">
                                <li>Compensation for livestock loss</li>
                                <li>Protection against epidemics</li>
                                <li>Support for farm recovery and growth</li>
                            </ul>
                            
                            <p className="font-semibold text-sm md:text-base mb-2 text-white dark:text-gray-200">Tips:</p>
                            <p className="text-sm md:text-base mb-6 text-white/90 dark:text-gray-300">Maintain accurate records, proper housing, and timely vaccinations to maximize coverage.</p>
                            
                            <a
                                href={route('swine.mortality.info')}
                                className="bg-green-700/60 dark:bg-gray-700/60 text-white px-4 py-3 rounded-lg text-center hover:bg-green-600 dark:hover:bg-gray-600 transition block text-sm md:text-base"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Learn More →
                            </a>

                            {/* Mobile Back Button */}
                            <button
                                onClick={() => window.history.back()}
                                className="md:hidden flex items-center justify-center gap-2 bg-gray-700/80 dark:bg-gray-800/80 text-white px-4 py-3 rounded-lg mt-4 hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Go Back
                            </button>
                        </aside>

                        {/* Overlay for mobile sidebar */}
                        {sidebarOpen && (
                            <div 
                                className="md:hidden fixed inset-0 bg-black/50 z-30"
                                onClick={() => setSidebarOpen(false)}
                            />
                        )}

                        {/* Right column - Scrollable content with dark mode */}
                        <div className="flex-1 w-full md:w-2/3 lg:w-3/4">
                            <div className="pt-6 md:pt-8 p-3 sm:p-4 md:p-6">
                                <div className="max-w-4xl mx-auto">
                                    <Head title="Livestock Insurance Application" />
                                    
                                    {/* Header Section */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 p-2 sm:p-0">
                                        <div className="flex items-center gap-2 mb-3 sm:mb-0">
                                            <Pen className="w-5 h-5 text-white dark:text-gray-300" />
                                            <h1 className="text-lg sm:text-xl font-bold text-white dark:text-green-500">
                                                Application No. {application.id}
                                            </h1>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                href={`/insurance/application/${application.id}/edit`}
                                                className="bg-green-600 dark:bg-green-700 text-white px-3 py-2 rounded hover:bg-green-700 dark:hover:bg-green-800 text-xs sm:text-sm transition"
                                            >
                                                Edit
                                            </Link>
                                            
                                           
                                            {isAdminOrEnforcer && (
                                                <Link
                                                    href={`/admin/dashboard`}
                                                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 text-xs sm:text-sm transition"
                                                >
                                                    <span>Dashboard</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Farmer Info Card - Dark mode support */}
                                    <Card className="mb-6 border pt-0 border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                        <CardHeader className="bg-green-50 py-5 dark:bg-gray-700/50">
                                            <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-green-500">Farmer Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-6">
                                            <div className="flex flex-col items-center md:items-start relative">
                                                <Link href={`/facilitate/users/${application.farmer_id}?tab=insurance`}>
                                                    <SquareArrowOutUpRight className="absolute top-1 left-1 text-green-700 dark:text-green-500" />
                                                    <div className="relative">
                                                        {/* Profile Image with Fallback */}
                                                        {farmer.profile ? (
                                                            <img
                                                                src={farmer.profile}
                                                                alt="Profile Picture"
                                                                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 border-2 border-green-200 dark:border-gray-600 object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    const parent = target.parentElement;
                                                                    if (parent) {
                                                                        const fallback = parent.querySelector('.profile-fallback') as HTMLElement;
                                                                        if (fallback) fallback.style.display = 'flex';
                                                                    }
                                                                }}
                                                            />
                                                        ) : null}
                                                        {/* Fallback Profile */}
                                                        <div 
                                                            className={`${!farmer.profile ? 'flex' : 'hidden'} profile-fallback w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 border-2 border-green-200 dark:border-gray-600 ${getProfileColor(application.farmer_name || 'Farmer')} items-center justify-center`}
                                                        >
                                                            <span className="text-2xl md:text-3xl font-bold text-white">
                                                                {getProfileFallback(application.farmer_name || 'Farmer')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <p className="font-semibold text-center md:text-left text-green-900 dark:text-gray-200">
                                                    {application.farmer_name || "N/A"}
                                                </p>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Farmer ID 00{application.farmer_id || ""}</span>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Indigenous:</strong> {application.is_indigenous ? "Yes" : "No"}</p>
                                                {application.is_indigenous && application.tribe && (
                                                    <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Tribe:</strong> {application.tribe}</p>
                                                )}
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">PWD:</strong> {application.is_pwd ? "Yes" : "No"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Spouse Name:</strong> {application.spouse_name || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Address:</strong> {application.address || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Farm Address:</strong> {application.farm_address || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Contact No:</strong> {application.contact_no || "N/A"}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Tabs Navigation - Dark mode support */}
                                    <div className="flex overflow-x-auto border-b border-gray-300 dark:border-gray-700 mb-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                                        {[
                                            { key: "livestock", label: "Livestock Info" },
                                            { key: "coverage", label: "Coverage & Proponent" },
                                            { key: "animals", label: "Livestock Animals" },
                                        ].map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`px-2 sm:px-4 py-3 font-semibold border-b-2 -mb-0.5 whitespace-nowrap text-xs sm:text-[15px] transition-colors ${
                                                    activeTab === tab.key
                                                        ? "border-green-600 dark:border-green-500 text-white dark:text-gray-200"
                                                        : "border-transparent text-green-100 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 hover:border-green-400 dark:hover:border-gray-500"
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tabs Content */}
                                    {activeTab === "livestock" && (
                                        <Card className="mb-6 border border-green-200/20 pt-0 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                            <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                                <CardTitle className="text-lg py-3 sm:text-xl text-green-900 dark:text-gray-200">Livestock Information</CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm pt-6">
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Cover Type:</strong> {application.cover_type || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Animal Type:</strong> {application.animal_type || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Purpose:</strong> {application.purpose || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Number of Heads:</strong> {numberOfHeads}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Source of Stock:</strong> {application.source_of_stock || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Number of Housing Units:</strong> {application.no_of_housing_units || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Birds per Unit:</strong> {application.birds_per_unit || "N/A"}</p>
                                                <p className="dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Date of Purchase:</strong> {formatDate(application.date_of_purchase)}</p>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {activeTab === "coverage" && (
                                        <div>
                                            <Card className="mb-6 border pt-0 border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                                <CardHeader className="bg-green-50 py-3 dark:bg-gray-700/50">
                                                    <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-gray-200">Coverage</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm pt-6">
                                                    <div className="break-words dark:text-gray-300">
                                                        <strong className="text-green-900 dark:text-gray-200">Desired Sum Insured:</strong> {formatCurrency(application.desired_sum_insured)}
                                                    </div>
                                                    <div className="break-words dark:text-gray-300">
                                                        <strong className="text-green-900 dark:text-gray-200">Total Sum Insured:</strong> {formatCurrency(application.total_sum_insured)}
                                                    </div>
                                                    <div className="md:col-span-2 break-words dark:text-gray-300">
                                                        <strong className="text-green-900 dark:text-gray-200">Epidemics:</strong> {[
                                                            application.epidemic_1,
                                                            application.epidemic_2,
                                                            application.epidemic_3
                                                        ].filter(Boolean).join(', ') || 'N/A'}
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="mb-6 pt-0 border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                                <CardHeader className="bg-green-50 py-3 dark:bg-gray-700/50">
                                                    <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-gray-200">Assignee & Proponent</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm pt-6">
                                                    <div className="break-words dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Assignee:</strong> {application.assignee || 'N/A'}</div>
                                                    <div className="break-words dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Assignee Address:</strong> {application.assignee_address || 'N/A'}</div>
                                                    <div className="break-words dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Assignee Contact:</strong> {application.assignee_contact || 'N/A'}</div>
                                                    <div className="break-words dark:text-gray-300"><strong className="text-green-900 dark:text-gray-200">Proponent:</strong> {application.proponent_name || 'N/A'}</div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    {activeTab === "animals" && (
                                        <>
                                            <Card className="mb-6 border pt-0 border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                                <CardHeader className="bg-green-50 py-3 dark:bg-gray-700/50">
                                                    <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-gray-200">Livestock Animals</CardTitle>
                                                </CardHeader>
                                                <CardContent className="px-2 sm:px-4 pt-6">
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full text-sm border-collapse border border-green-200 dark:border-gray-700">
                                                            <thead>
                                                                <tr className="border-b bg-green-50 dark:bg-gray-700/50">
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Sex</th>
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Breed</th>
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Ear Mark</th>
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Color</th>
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Applied</th>
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Age</th>
                                                                    {showProofOfOwnership && <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Proof of Ownership</th>}
                                                                    <th className="p-2 border text-left text-green-900 dark:text-gray-200 border-green-200 dark:border-gray-700">Action</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                {animals.map((a: any) => (
                                                                    <tr key={a.id} className="border-b hover:bg-green-50/50 dark:hover:bg-gray-700/50 border-green-200 dark:border-gray-700">
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.sex}</td>
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.breed}</td>
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.ear_mark}</td>
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.color}</td>
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.created_at ? formatDateOnly(a.created_at) : "N/A"}</td>
                                                                        <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.age || "N/A"}</td>
                                                                        {showProofOfOwnership && <td className="p-2 border dark:text-gray-300 border-green-200 dark:border-gray-700">{a.proof_of_ownership || "N/A"}</td>}
                                                                        <td className="p-2 border border-green-200 dark:border-gray-700">
                                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                                <button
                                                                                    onClick={() => { setEditingAnimal(a); setEditModalOpen(true); }}
                                                                                    className="px-2 py-1 text-xs bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 w-full sm:w-auto transition"
                                                                                >
                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDeleteAnimal(a.id)}
                                                                                    className="px-2 py-1 text-xs bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-800 w-full sm:w-auto transition"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Available Swine Card - Dark mode support */}
                                            <Card className="mb-6 border border-green-200/20 pt-0 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                                <CardHeader className="bg-green-50 py-3 dark:bg-gray-700/50">
                                                    <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-gray-200">Select Swine to Add</CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    {showProofOfOwnership && (
                                                        <div className="mb-4">
                                                            <label className="block text-sm font-semibold mb-1 text-green-900 dark:text-gray-200">Proof of Ownership</label>
                                                            <input
                                                                type="text"
                                                                value={proofOfOwnership}
                                                                onChange={(e) => setProofOfOwnership(e.target.value)}
                                                                className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                placeholder="Enter proof of ownership"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto p-2 bg-green-50 dark:bg-gray-700/50 rounded-lg border border-green-200 dark:border-gray-600">
                                                        {availableSwineState.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No available swine.</p>}
                                                        {availableSwineState.map((swine: any) => {
                                                            const isSelected = selectedSwineIds.includes(swine.id);
                                                            return (
                                                                <div
                                                                    key={swine.id}
                                                                    onClick={() => toggleSwine(swine.id)}
                                                                    className={`grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-lg border cursor-pointer transition
                                                                        ${isSelected
                                                                            ? "bg-green-100 dark:bg-gray-600 border-green-400 dark:border-gray-500"
                                                                            : "bg-white dark:bg-gray-800 border-green-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-gray-700"
                                                                        }`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => toggleSwine(swine.id)}
                                                                        className="w-4 h-4 accent-green-600 dark:accent-green-500"
                                                                    />
                                                                    <div className="flex flex-col">
                                                                        <span className="font-semibold text-green-900 dark:text-gray-200 truncate">{swine.tag_number}</span>
                                                                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{swine.breed?.name || swine.cuztom_breed || swine.description || "N/A"}</span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button 
                                                            onClick={handleAddMultipleSwine} 
                                                            disabled={loading} 
                                                            className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-green-700 to-green-600 dark:from-green-800 dark:to-green-700 hover:from-green-800 hover:to-green-700 dark:hover:from-green-900 dark:hover:to-green-800 text-white"
                                                        >
                                                            {loading ? "Adding..." : "Add Selected Swine"}
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            
                                            {/* Edit Animal Modal - Dark mode support */}
                                            {editModalOpen && editingAnimal && (
                                                <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-md shadow-lg border border-green-200 dark:border-gray-700">
                                                        <h2 className="text-lg font-bold mb-4 text-green-900 dark:text-gray-200">Edit Animal</h2>

                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Sex</label>
                                                                <select
                                                                    className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                    value={editingAnimal.sex}
                                                                    onChange={(e) =>
                                                                        setEditingAnimal({ ...editingAnimal, sex: e.target.value })
                                                                    }
                                                                >
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Breed</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                    value={editingAnimal.breed}
                                                                    onChange={(e) =>
                                                                        setEditingAnimal({ ...editingAnimal, breed: e.target.value })
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Ear Mark</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                    value={editingAnimal.ear_mark}
                                                                    onChange={(e) =>
                                                                        setEditingAnimal({ ...editingAnimal, ear_mark: e.target.value })
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Color</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                    value={editingAnimal.color}
                                                                    onChange={(e) =>
                                                                        setEditingAnimal({ ...editingAnimal, color: e.target.value })
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Age</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                    value={editingAnimal.age || ''}
                                                                    onChange={(e) =>
                                                                        setEditingAnimal({ ...editingAnimal, age: Number(e.target.value) })
                                                                    }
                                                                />
                                                            </div>

                                                            {showProofOfOwnership && (
                                                                <div>
                                                                    <label className="block text-sm font-semibold text-green-900 dark:text-gray-200">Proof of Ownership</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none dark:text-gray-200"
                                                                        value={editingAnimal.proof_of_ownership || ''}
                                                                        onChange={(e) =>
                                                                            setEditingAnimal({ ...editingAnimal, proof_of_ownership: e.target.value })
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-4 flex justify-end gap-2">
                                                            <Button
                                                                onClick={() => setEditModalOpen(false)}
                                                                className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-sm text-white"
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={async () => {
                                                                    try {
                                                                        const res = await axios.put(`/insurance/animal/${editingAnimal.id}`, editingAnimal);
                                                                        if (res.data.success) {
                                                                            setAnimals((prev: Animal[]) =>
                                                                                prev.map((a: Animal) => (a.id === editingAnimal.id ? res.data.animal : a))
                                                                            );
                                                                            setEditModalOpen(false);
                                                                            alert("Animal updated successfully!");
                                                                        } else {
                                                                            alert("Failed to update animal.");
                                                                        }
                                                                    } catch (err) {
                                                                        console.error(err);
                                                                        alert("Error updating animal.");
                                                                    }
                                                                }}
                                                                className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-sm text-white"
                                                            >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
// resources/js/Pages/Insurance/ApplicationForm.tsx

import React, { useEffect, useState, useRef } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { route } from "ziggy-js";
import { toast, Toaster } from "sonner";
import { 
  Menu, 
  X, 
  ChevronLeft, 
  LogIn,
  Shield,
  Pen,
  FormInput,
  Users,
  CheckCircle,
  Info,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { PigIcon } from "@/components/icons";

interface FarmerInfo {
    id: number;
    name: string;
    address: string;
    farm_address: string;
    contact: string;
    swine: Array<{
        id: number;
        sex: string;
        breed: string | null;
        tag_number: string;
        description: string | null;
    }>;
}

interface Swine {
    id: number;
    name?: string;
    sex?: string;
    breed?: string | null;
    tag_number?: string;
    description?: string | null;
}

interface Group {
    id: number;
    name: string;
    swine: Swine[];
}

interface PageProps {
    auth: {
        user: {
            id: number;
            role: string;
            user_information?: any;
        };
    };
    farmers: FarmerInfo[];
    farmerFromProfile?: FarmerInfo;
    insurance?: any;
    authUserName?: string;
    proponents?: { id: number; name: string }[];
}

export default function ApplicationForm({ auth, farmers, farmerFromProfile, authUserName, proponents, insurance }: PageProps) {
    const isFarmer = auth.user.role === "farmer";
    const isAdminOrEnforcer = auth.user.role === "admin" || auth.user.role === "enforcer";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for header visibility
    const [showPageHeader, setShowPageHeader] = useState(true);
    const mainContentRef = useRef<HTMLDivElement>(null);
    
    // New state: show info page or application form
    const [showInfoPage, setShowInfoPage] = useState(true);
    const [hasAgreed, setHasAgreed] = useState(false);

    const defaultFarmer = isFarmer ? farmers.find(f => f.id === auth.user.id) : farmerFromProfile;

    const [farmerId, setFarmerId] = useState<number | null>(
        insurance?.farmer_id ??
        (isFarmer ? auth.user.id : defaultFarmer?.id ?? null)
    );

    const [selectedFarmer, setSelectedFarmer] = useState<FarmerInfo | null>(
        farmers.find(f => f.id === farmerId) ?? null
    );

    const [selectedSwine, setSelectedSwine] = useState<number[]>([]);

    const [form, setForm] = useState({
        farmer_name: insurance?.farmer_name ?? "",
        proponent: isAdminOrEnforcer ? (insurance?.proponent ?? auth.user.id) : "",
        proponent_name: isAdminOrEnforcer ? (insurance?.proponent_name ?? authUserName) : "",
        cover_type: insurance?.cover_type ?? "commercial",
        is_indigenous: insurance?.is_indigenous ?? false,
        tribe: insurance?.tribe ?? "",
        is_pwd: insurance?.is_pwd ?? false,
        spouse_name: insurance?.spouse_name ?? "",
        address: insurance?.address ?? "",
        farm_address: insurance?.farm_address ?? "",
        contact_no: insurance?.contact_no ?? "",
        animal_type: insurance?.animal_type ?? "swine",
        purpose: insurance?.purpose ?? "breeding",
        source_of_stock: insurance?.source_of_stock ?? "",
        no_of_housing_units: insurance?.no_of_housing_units ?? "",
        birds_per_unit: insurance?.birds_per_unit ?? "",
        date_of_purchase: insurance?.date_of_purchase ?? "",
        desired_sum_insured: insurance?.desired_sum_insured ?? "",
        total_sum_insured: insurance?.total_sum_insured ?? "",
        epidemic_1: insurance?.epidemic_1 ?? "",
        epidemic_2: insurance?.epidemic_2 ?? "",
        epidemic_3: insurance?.epidemic_3 ?? "",
        assignee: insurance?.assignee ?? "",
        assignee_address: insurance?.assignee_address ?? "",
        assignee_contact: insurance?.assignee_contact ?? "",
    });

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

    // Navigation items
    const navItems = [
        { name: 'Back to Main', href: route('cms.exit'), icon: LogIn },
        { name: 'Application Form', href: route('insurance.application.create'), icon: FormInput, active: true },
        { name: 'DA', href: route('da.personnel'), icon: Users},
    ];

    // Auto-fill proponent details for admin/enforcer
    useEffect(() => {
        if (isAdminOrEnforcer) {
            setForm(prev => ({
                ...prev,
                proponent: auth.user.id,
                proponent_name:
                    prev.proponent_name ||
                    `${auth.user.user_information?.firstname ?? ''} ${auth.user.user_information?.middlename ?? ''} ${auth.user.user_information?.lastname ?? ''}`.trim()
            }));
        }
    }, [isAdminOrEnforcer]);

    // Auto-fill farmer details
    useEffect(() => {
        if (!selectedFarmer) return;

        setForm(prev => ({
            ...prev,
            farmer_name: prev.farmer_name || selectedFarmer.name || "",
            address: prev.address || selectedFarmer.address || "",
            farm_address: prev.farm_address || selectedFarmer.address || "",
            contact_no: prev.contact_no || selectedFarmer.contact || "",
        }));
    }, [selectedFarmer]);

    // On farmer selection change
    const handleFarmerSelect = (id: number) => {
        const fm = farmers.find(f => f.id === id) || null;
        setFarmerId(id);
        setSelectedFarmer(fm);
        setSelectedSwine([]);
    };

    const handleSubmit = () => {
        if (!form.farmer_name.trim()) {
            toast.error("Farmer is required");
            return;
        }

        if (!form.cover_type.trim()) {
            toast.error("Cover Type is required");
            return;
        }
     
        if (!form.contact_no.trim()) {
            toast.error("Contact number is required");
            return;
        }

        router.post("/insurance/application", {
            ...form,
            farmer_id: farmerId,
            animals: selectedSwine.map(id => ({
                livestock_id: id,
                sex: selectedFarmer?.swine.find(s => s.id === id)?.sex || null,
                age: null,
                breed: selectedFarmer?.swine.find(s => s.id === id)?.breed || null,
                ear_mark: selectedFarmer?.swine.find(s => s.id === id)?.tag_number || null,
                color: selectedFarmer?.swine.find(s => s.id === id)?.description || null,
                proof_of_ownership: null,
            })),
            proponent: form.proponent,
        });

        toast.success("Application submitted successfully!");
    };

    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    const { groups: backendGroups } = usePage().props as any;
    const [groups, setGroups] = useState<Group[]>(backendGroups || []);

    // Auto-select farmer's first swine & optionally filter groups
    useEffect(() => {
        if (!selectedFarmer) return;
        const allSwineGroup: Group = { id: 0, name: "All Swine", swine: selectedFarmer.swine };
        setGroups([allSwineGroup, ...backendGroups]);
        setSelectedSwine([]);
        setSelectedGroup(null);
    }, [selectedFarmer]);

    const toggleSwine = (id: number) => {
        setSelectedSwine((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (selectedGroup) {
            const group = groups.find((g) => g.id === selectedGroup);
            if (!group) return;

            const groupSwineIds = group.swine.map((s) => s.id);
            setSelectedSwine((prev) => Array.from(new Set([...prev, ...groupSwineIds])));
        }
    }, [selectedGroup, groups]);

    const [delayedSelected, setDelayedSelected] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (selectedSwine.length === 0) return;

        const timer = setTimeout(() => {
            setDelayedSelected(new Set(selectedSwine));
        }, 20000);

        return () => clearTimeout(timer);
    }, [selectedSwine]);

    const swineList = React.useMemo(() => {
        if (!selectedFarmer) return [];

        const selectedSet = delayedSelected;
        let groupSwine: Swine[] = [];
        if (selectedGroup) {
            const group = groups.find((g) => g.id === selectedGroup);
            groupSwine = group?.swine || [];
        }

        const groupSet = new Set(groupSwine.map((s) => s.id));

        const topSelected = selectedFarmer.swine.filter((s) => selectedSet.has(s.id));
        const remainingGroup = groupSwine.filter((s) => !selectedSet.has(s.id));
        const otherSwine = selectedFarmer.swine.filter(
            (s) => !selectedSet.has(s.id) && !groupSet.has(s.id)
        );

        return [...topSelected, ...remainingGroup, ...otherSwine];
    }, [selectedFarmer, selectedGroup, groups, delayedSelected]);

    // Handle proceed to application
    const handleProceedToApplication = () => {
        setHasAgreed(true);
        setShowInfoPage(false);
    };

    // Handle back to info page
    const handleBackToInfo = () => {
        setShowInfoPage(true);
        // Optional: Scroll to top when going back
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
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

                {/* Page Header - Conditionally rendered - Dark mode compatible */}
                {showPageHeader && (
                    <div className="relative z-10 pt-0 sm:px-2 w-full bg-gradient-to-b from-green-900/30 to-green-800/10 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm py-8 border-b border-green-800/20 dark:border-gray-700/20 transition-all duration-300">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-gray-100 mb-2">
                                        {showInfoPage ? "Livestock Insurance Guide" : "Livestock Mortality Insurance Application"}
                                    </h1>
                                    <p className="text-green-200/90 dark:text-gray-300">
                                        {showInfoPage 
                                            ? "Learn about PCIC livestock insurance coverage and requirements" 
                                            : "Complete the form below to apply for livestock insurance"}
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

                {/* Main Content - Single scrollable area */}
                <div 
                    ref={mainContentRef}
                    className={`absolute inset-x-0 bottom-0 overflow-y-auto transition-all duration-300 ${
                        showPageHeader ? 'top-[180px]' : 'top-[64px]'
                    }`}
                >
                    <Toaster position="top-right" />
                    <Head title="Livestock Insurance Application" />

                    <div className="max-w-5xl mx-auto py-8 px-4">
                        {showInfoPage ? (
                            /* Information Page Content - Dark mode compatible */
                            <div className="space-y-6">
                                <Card className="border border-green-200/20 pt-0 mt-0  dark:border-gray-700 bg-gradient-to-b from-green-900/90 to-green-800/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm shadow-xl">
                                    <CardHeader className="bg-green-800/50 py-5  dark:bg-sidebar-primary     border-b border-green-700/50 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                         
                                            <CardTitle className="text-2xl  text-white dark:text-gray-100">Philippine Crop Insurance Corporation (PCIC)</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6 text-white dark:text-gray-200">
                                        <div className="bg-green-800/30 dark:bg-gray-700/30 p-4 rounded-lg border border-green-700/50 dark:border-gray-600">
                                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                                <Info className="w-5 h-5" />
                                                Claim for Indemnity (LIV-CAS-03)
                                            </h3>
                                            <p className="text-green-100 dark:text-gray-300">
                                                LIV-CAS-03 is the Claim for Indemnity form for livestock. It is the document you submit to officially request payment after your insured animal has died.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                                                <PigIcon className="w-6 h-6" />
                                                Maximum Insurance Money for Swine
                                            </h3>
                                            <p className="text-green-100 dark:text-gray-300 mb-3">
                                                The "Maximum Sum Insured" is the highest amount the PCIC will pay per head if the animal dies. These amounts depend on the type of swine and their purpose:
                                            </p>
                                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                                <div className="bg-green-800/40 dark:bg-gray-700/40 p-4 rounded-lg border border-green-600/50 dark:border-gray-600">
                                                    <div className="text-2xl font-bold text-green-300 dark:text-green-400">₱14,500</div>
                                                    <div className="text-sm text-green-200 dark:text-gray-300">Swine Breeder (Parent Stock)</div>
                                                    <div className="text-xs text-green-300 dark:text-green-400 mt-1">Per head</div>
                                                </div>
                                                <div className="bg-green-800/40 dark:bg-gray-700/40 p-4 rounded-lg border border-green-600/50 dark:border-gray-600">
                                                    <div className="text-2xl font-bold text-green-300 dark:text-green-400">₱10,000</div>
                                                    <div className="text-sm text-green-200 dark:text-gray-300">Swine Fattener</div>
                                                    <div className="text-xs text-green-300 dark:text-green-400 mt-1">Per head</div>
                                                </div>
                                                <div className="bg-green-800/40 dark:bg-gray-700/40 p-4 rounded-lg border border-green-600/50 dark:border-gray-600">
                                                    <div className="text-2xl font-bold text-green-300 dark:text-green-400">₱10,000</div>
                                                    <div className="text-sm text-green-200 dark:text-gray-300">Special Payout (ASF)</div>
                                                    <div className="text-xs text-green-300 dark:text-green-400 mt-1">For pigs culled due to African Swine Fever</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                                                <CheckCircle className="w-6 h-6" />
                                                How to Get Free Insurance (Subsidy) for Swine
                                            </h3>
                                            <p className="text-green-100 dark:text-gray-300 mb-4">
                                                To avail of the 100% premium subsidy (meaning you pay ₱0 for the insurance), you must follow these steps:
                                            </p>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-green-700 dark:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                                        <span className="font-bold text-white">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-green-200 dark:text-green-300">Register in the RSBSA</h4>
                                                        <p className="text-green-100 dark:text-gray-300 text-sm">The subsidy is only for backyard farmers listed in the Registry System for Basic Sectors in Agriculture (RSBSA).</p>
                                                        <p className="text-green-300 dark:text-green-400 text-xs mt-1">Action: Go to your Municipal/City Agriculture Office (MAO/CAO) and fill out an RSBSA enrollment form.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-green-700 dark:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                                        <span className="font-bold text-white">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-green-200 dark:text-green-300">Submit the Application (LIV-UPI-01)</h4>
                                                        <p className="text-green-100 dark:text-gray-300 text-sm">Once registered, fill out the LIV-UPI-01 Application Form.</p>
                                                        <p className="text-green-300 dark:text-green-400 text-xs mt-1">Action: Attach a photocopy of your valid ID and clear photos of the swine in their pens.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-green-700 dark:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                                        <span className="font-bold text-white">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-green-200 dark:text-green-300">Technical Inspection</h4>
                                                        <p className="text-green-100 dark:text-gray-300 text-sm">A technician from the MAO or PCIC will inspect your farm to verify the health of the animals and ensure you follow Biosecurity Standards (especially for ASF prevention).</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-green-700 dark:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                                                        <span className="font-bold text-white">4</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-green-200 dark:text-green-300">Wait for the Certificate of Insurance Cover (CIC)</h4>
                                                        <p className="text-green-100 dark:text-gray-300 text-sm">Once approved, the PCIC will issue your CIC.</p>
                                                        <p className="text-yellow-300 dark:text-yellow-400 text-xs mt-1">Note: There is a 21-day waiting period before the insurance becomes active. If your animal dies within this first 21 days, it is not covered.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-900/40 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/50 dark:border-yellow-800">
                                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-yellow-400 dark:text-yellow-500" />
                                                Filing a Claim
                                            </h3>
                                            <p className="text-green-100 dark:text-gray-300 mb-2">
                                                If an animal dies, you must:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-green-100 dark:text-gray-300">
                                                <li>Report the death within <span className="font-bold text-yellow-300 dark:text-yellow-400">7 calendar days</span></li>
                                                <li>Use the LIV-CAS-01 (Notice of Loss) first</li>
                                                <li>Then use the LIV-CAS-03 (Claim for Indemnity) to receive your payout</li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-center pt-4">
                                    <Button 
                                        onClick={handleProceedToApplication}
                                        className="px-8 py-6 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 hover:from-green-700 hover:to-green-600 dark:hover:from-green-800 dark:hover:to-green-700 text-white text-lg shadow-xl hover:shadow-2xl transition-all duration-200 rounded-xl"
                                    >
                                        <CheckCircle className="mr-2 w-5 h-5" />
                                        I Understand - Proceed to Application Form
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            /* Application Form Content - Original Form with Dark Mode */
                            <div className="space-y-6 bg-gradient-to-b from-green-900/80 to-green-800/80 dark:from-gray-800/95 dark:to-gray-900/95 p-4 sm:p-6 rounded-xl shadow-lg border border-green-700/30 dark:border-gray-700 backdrop-blur-sm">
                                
                                {/* Header with action buttons */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={handleBackToInfo}
                                            variant="ghost"
                                            className="text-white dark:text-gray-300 hover:bg-green-700/50 dark:hover:bg-gray-700/50 hover:text-white p-2"
                                            title="Back to Insurance Guide"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </Button>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Pen className="w-5 h-5 text-white dark:text-gray-200" />
                                                <h1 className="text-2xl font-bold text-white dark:text-gray-100">
                                                    Application Form
                                                </h1>
                                            </div>
                                          
                                        </div>
                                    </div>
                                    <Link
                                        href={route('swine.mortality.info')}
                                        className="mt-2 sm:mt-0 bg-green-700 dark:bg-green-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 dark:hover:bg-green-700 transition flex items-center gap-2"
                                    >
                                        <Shield className="w-4 h-4" />
                                        Learn More
                                    </Link>
                                </div>

                                <Separator className="bg-green-700/50 dark:bg-gray-700" />

                                {/* Farmer Selection (Only for Admin/Enforcer) - Dark mode compatible */}
                                {isAdminOrEnforcer && (
                                    <Card className="border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                        <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                            <CardTitle className="text-green-900 dark:text-gray-100">Applicant (Farmer)</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pt-6">
                                            <Label className="text-green-900 dark:text-gray-200">Select Farmer</Label>
                                            <Select
                                                value={farmerId?.toString()}
                                                onValueChange={(v) => handleFarmerSelect(Number(v))}
                                            >
                                                <SelectTrigger className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                    <SelectValue placeholder="Select Farmer" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                    {farmers.map(f => (
                                                        <SelectItem key={f.id} value={f.id.toString()} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">
                                                            {f.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Farmer Basic Info - Dark mode compatible */}
                                <Card className="border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                    <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                        <CardTitle className="text-green-900 dark:text-gray-100">Farmer Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Farmer Name</Label>
                                            <Input
                                                value={form.farmer_name}
                                                onChange={(e) => setForm({ ...form, farmer_name: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                        
                                        {/* INDIGENOUS SECTION */}
                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Indigenous Person?</Label>
                                            <select
                                                className="border border-green-200 dark:border-gray-600 rounded-md p-2 w-full focus:border-green-500 focus:ring-green-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
                                                value={form.is_indigenous ? "1" : "0"}
                                                onChange={(e) =>
                                                    setForm({ ...form, is_indigenous: e.target.value === "1" })
                                                }
                                            >
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                            </select>
                                        </div>

                                        {form.is_indigenous && (
                                            <div>
                                                <Label className="text-green-900 dark:text-gray-200">Tribe</Label>
                                                <Input
                                                    value={form.tribe}
                                                    onChange={(e) => setForm({ ...form, tribe: e.target.value })}
                                                    className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                                />
                                            </div>
                                        )}

                                        {/* PWD SECTION */}
                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Person with Disability (PWD)?</Label>
                                            <select
                                                className="border border-green-200 dark:border-gray-600 rounded-md p-2 w-full focus:border-green-500 focus:ring-green-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
                                                value={form.is_pwd ? "1" : "0"}
                                                onChange={(e) =>
                                                    setForm({ ...form, is_pwd: e.target.value === "1" })
                                                }
                                            >
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Contact No.</Label>
                                            <Input
                                                value={form.contact_no}
                                                onChange={(e) => setForm({ ...form, contact_no: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-green-900 dark:text-gray-200">Address</Label>
                                            <Input
                                                value={form.address}
                                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-green-900 dark:text-gray-200">Farm Address</Label>
                                            <Input
                                                value={form.farm_address}
                                                onChange={(e) => setForm({ ...form, farm_address: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Spouse Name</Label>
                                            <Input
                                                value={form.spouse_name}
                                                onChange={(e) => setForm({ ...form, spouse_name: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Proponent Section - Dark mode compatible */}
                                {isAdminOrEnforcer && (
                                    <Card className="border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                        <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                            <CardTitle className="text-green-900 dark:text-gray-100">Proponent</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                            <div>
                                                <Label className="text-green-900 dark:text-gray-200">Proponent Name</Label>
                                                <Select
                                                    value={form.proponent?.toString() ?? ""}
                                                    onValueChange={(value) => {
                                                        const selected = proponents?.find((p: { id: number; name: string }) => p.id === Number(value));
                                                        setForm(prev => ({
                                                            ...prev,
                                                            proponent: selected?.id ?? null,
                                                            proponent_name: selected?.name ?? ""
                                                        }));
                                                    }}
                                                >
                                                    <SelectTrigger className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                        <SelectValue placeholder="Select Proponent" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                        {proponents?.map((p: { id: number; name: string }) => (
                                                            <SelectItem key={p.id} value={p.id.toString()} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">
                                                                {p.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="text-green-900 dark:text-gray-200">Proponent User ID</Label>
                                                <Input 
                                                    type="number" 
                                                    disabled 
                                                    value={form.proponent ?? ""} 
                                                    className="border-green-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Livestock Selection - Dark mode compatible */}
                                <Card className="border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                    <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                        <CardTitle className="text-green-900 dark:text-gray-100">Livestock Selection</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {selectedFarmer ? (
                                            <div className="flex flex-col gap-4">
                                                {/* Select Group */}
                                                <div>
                                                    <Label className="text-green-900 dark:text-gray-200">Assign to Group</Label>
                                                    <Select
                                                        value={selectedGroup ? String(selectedGroup) : "none"}
                                                        onValueChange={(value) =>
                                                            setSelectedGroup(value === "none" ? null : parseInt(value))
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                            <SelectValue placeholder="-- None --" />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                            <SelectItem value="none">-- None --</SelectItem>
                                                            {groups?.map((g: Group) => (
                                                                <SelectItem key={g.id} value={String(g.id)} className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">
                                                                    {g.name} ({g.swine.length} swine)
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Swine Selection Header */}
                                                <div className="flex justify-between items-center mb-2 mt-4">
                                                    <Label className="text-green-900 dark:text-gray-200">Assign to Swines</Label>
                                                    {selectedSwine.length > 0 && (
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm text-green-800 dark:text-green-400">
                                                                Selected: {selectedSwine.length}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedSwine([])}
                                                                className="text-sm text-red-600 dark:text-red-400 hover:underline"
                                                            >
                                                                Uncheck All
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Swine List - Dark mode compatible */}
                                                <div className="ml-1 grid grid-cols-1 gap-3 max-h-64 overflow-y-auto rounded-lg bg-green-50 dark:bg-gray-700/30 p-2">
                                                    {swineList.map((s: Swine) => {
                                                        const isSelected = selectedSwine.includes(s.id);
                                                        return (
                                                            <div
                                                                key={s.id}
                                                                onClick={() => toggleSwine(s.id)}
                                                                className={`grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-lg border cursor-pointer
                                                                    ${isSelected
                                                                        ? "bg-green-100 dark:bg-green-900/50 border-green-400 dark:border-green-600"
                                                                        : "bg-white dark:bg-gray-800 border-green-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-gray-700"
                                                                    }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() => toggleSwine(s.id)}
                                                                    className="w-4 h-4 ml-[2px] accent-green-600 dark:accent-green-500"
                                                                />
                                                                <div className="flex flex-col leading-tight">
                                                                    <span className="font-medium text-green-900 dark:text-gray-200 truncate">
                                                                        {s.name || "Unnamed Swine"}
                                                                    </span>
                                                                    {s.tag_number && (
                                                                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                                            Tag: {s.tag_number}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Please select a farmer first.</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Insurance Details - Dark mode compatible */}
                                <Card className="border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                    <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                        <CardTitle className="text-green-900 dark:text-gray-100">Insurance Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Cover Type</Label>
                                            <Select
                                                value={form.cover_type}
                                                onValueChange={(v) => setForm({ ...form, cover_type: v })}
                                            >
                                                <SelectTrigger className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                    <SelectItem value="commercial" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Commercial</SelectItem>
                                                    <SelectItem value="non-commercial" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Non-Commercial</SelectItem>
                                                    <SelectItem value="special" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Special</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Animal Type</Label>
                                            <Select
                                                value={form.animal_type}
                                                onValueChange={(v) => setForm({ ...form, animal_type: v })}
                                            >
                                                <SelectTrigger className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                    <SelectItem value="swine" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Swine</SelectItem>
                                                    <SelectItem value="cattle" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Cattle</SelectItem>
                                                    <SelectItem value="carabao" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Carabao</SelectItem>
                                                    <SelectItem value="goat" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Goat</SelectItem>
                                                    <SelectItem value="horse" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Horse</SelectItem>
                                                    <SelectItem value="poultry" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Poultry</SelectItem>
                                                    <SelectItem value="other" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Purpose</Label>
                                            <Select
                                                value={form.purpose}
                                                onValueChange={(v) => setForm({ ...form, purpose: v })}
                                            >
                                                <SelectTrigger className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="border-green-200 dark:border-gray-700 dark:bg-gray-800">
                                                    <SelectItem value="breeding" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Breeding</SelectItem>
                                                    <SelectItem value="fattening" className="focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-100 dark:text-gray-200">Fattening</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Source of Stock</Label>
                                            <Input
                                                value={form.source_of_stock}
                                                onChange={(e) => setForm({ ...form, source_of_stock: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Housing Units</Label>
                                            <Input
                                                value={form.no_of_housing_units}
                                                onChange={(e) => setForm({ ...form, no_of_housing_units: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Birds Per Unit</Label>
                                            <Input
                                                value={form.birds_per_unit}
                                                onChange={(e) => setForm({ ...form, birds_per_unit: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Date of Purchase</Label>
                                            <Input
                                                type="date"
                                                value={form.date_of_purchase}
                                                onChange={(e) => setForm({ ...form, date_of_purchase: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Desired Sum Insured</Label>
                                            <Input
                                                value={form.desired_sum_insured}
                                                onChange={(e) => setForm({ ...form, desired_sum_insured: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Total Sum Insured</Label>
                                            <Input
                                                value={form.total_sum_insured}
                                                onChange={(e) => setForm({ ...form, total_sum_insured: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Epidemic 1</Label>
                                            <Input
                                                value={form.epidemic_1}
                                                onChange={(e) => setForm({ ...form, epidemic_1: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Epidemic 2</Label>
                                            <Input
                                                value={form.epidemic_2}
                                                onChange={(e) => setForm({ ...form, epidemic_2: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Epidemic 3</Label>
                                            <Input
                                                value={form.epidemic_3}
                                                onChange={(e) => setForm({ ...form, epidemic_3: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Assignee</Label>
                                            <Input
                                                value={form.assignee}
                                                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Assignee Address</Label>
                                            <Input
                                                value={form.assignee_address}
                                                onChange={(e) => setForm({ ...form, assignee_address: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-green-900 dark:text-gray-200">Assignee Contact</Label>
                                            <Input
                                                value={form.assignee_contact}
                                                onChange={(e) => setForm({ ...form, assignee_contact: e.target.value })}
                                                className="border-green-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Submit Button - Dark mode compatible */}
                                <div className="flex justify-end pt-4">
                                    <Button 
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-gradient-to-r from-green-700 to-green-600 dark:from-green-800 dark:to-green-700 hover:from-green-800 hover:to-green-700 dark:hover:from-green-900 dark:hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Submit Application
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
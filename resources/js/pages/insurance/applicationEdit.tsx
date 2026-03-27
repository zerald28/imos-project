import React, { useEffect, useState, useRef } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pen, Shield, Menu, X, ChevronLeft, LogIn, FormInput, FileText, Users } from "lucide-react";
import { route } from "ziggy-js";

export default function ApplicationEdit({ auth, insurance, authUserName, proponents }: any) {
    const isFarmer = auth.user.role === "farmer";
    const isAdminOrEnforcer = auth.user.role === "admin" || auth.user.role === "enforcer";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for header visibility
    const [showPageHeader, setShowPageHeader] = useState(true);
    const mainContentRef = useRef<HTMLDivElement>(null);

    // Form state
    const [form, setForm] = useState({
        farmer_name: insurance.farmer_name ?? "",
        address: insurance.address ?? "",
        farm_address: insurance.farm_address ?? "",
        contact_no: insurance.contact_no ?? "",
        spouse_name: insurance.spouse_name ?? "",
        is_indigenous: Boolean(Number(insurance.is_indigenous)),
        tribe: insurance.tribe ?? "",
        is_pwd: insurance.is_pwd ?? false,
        cover_type: insurance.cover_type ?? "commercial",
        purpose: insurance.purpose ?? "breeding",
        source_of_stock: insurance.source_of_stock ?? "",
        no_of_housing_units: insurance.no_of_housing_units ?? "",
        birds_per_unit: insurance.birds_per_unit ?? "",
        date_of_purchase: insurance.date_of_purchase ?? "",
        desired_sum_insured: insurance.desired_sum_insured ?? "",
        total_sum_insured: insurance.total_sum_insured ?? "",
        epidemic_1: insurance.epidemic_1 ?? "",
        epidemic_2: insurance.epidemic_2 ?? "",
        epidemic_3: insurance.epidemic_3 ?? "",
        assignee: insurance.assignee ?? "",
        assignee_address: insurance.assignee_address ?? "",
        assignee_contact: insurance.assignee_contact ?? "",

        // Proponent
        proponent: insurance.proponent ?? "",
        proponent_name: insurance.proponent_name ?? "",
    });

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

    // Auto-fill proponent for admin/enforcer
    useEffect(() => {
        if (isAdminOrEnforcer && !form.proponent) {
            const defaultProponent = proponents?.find((p: any) => p.id === auth.user.id);
            setForm(prev => ({
                ...prev,
                proponent: defaultProponent?.id ?? auth.user.id,
                proponent_name: defaultProponent?.name ?? authUserName
            }));
        }
    }, [isAdminOrEnforcer, proponents]);

    const handleUpdate = () => {
        router.put(`/insurance/${insurance.id}`, form);
    };

    // Navigation items with consistent active styling
    const navItems = [
        { name: 'Back to Main', href: route('cms.exit'), icon: LogIn },
        { name: 'Application Form', href: route('insurance.application.create'), icon: FormInput },
        { name: 'Insurance Application', href: route('farmer.profile.show'), icon: FileText, active: true },
        { name: 'DA', href: route('da.personnel'), icon: Users },
    ];

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
                                    <h1 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-gray-100 mb-2">Edit Insurance Application</h1>
                                    <p className="text-green-200/90 dark:text-gray-300">
                                        Application #{insurance.id} • {insurance.farmer_name || 'No Name'}
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
                    className="md:hidden fixed top-20 left-4 z-50 p-2 bg-green-900/80 dark:bg-gray-900/80 text-white rounded-lg shadow-lg"
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
                            p-4 md:p-6 
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
                                    <Head title="Edit Insurance Application" />
                                    
                                    {/* Header with Insurance Dashboard button */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 p-2 sm:p-0">
                                        <div className="flex items-center gap-2 mb-3 sm:mb-0">
                                            <Pen className="w-5 h-5 text-white dark:text-gray-300" />
                                            <h1 className="text-lg sm:text-xl font-bold text-white dark:text-green-500">
                                                Edit Application Details
                                            </h1>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {/* Quick Insurance Dashboard Button */}
                                           
                                            <Link
                                                href={`/insurance/application/${insurance.id}`}
                                                className="bg-green-600 dark:bg-green-700 text-white px-3 py-2 rounded hover:bg-green-700 dark:hover:bg-green-800 text-xs sm:text-sm transition"
                                            >
                                                View
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => window.history.back()}
                                                className="flex items-center gap-1 bg-gray-500 dark:bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 text-xs sm:text-sm transition"
                                            >
                                                <ChevronLeft className="w-3 h-3" />
                                                <span className="hidden sm:inline">Back</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Farmer Info Card - Dark mode support */}
                                    <Card className="mb-6 border pt-0 border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                        <CardHeader className="bg-green-50 py-5 dark:bg-gray-700/50">
                                            <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-green-500">Farmer Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Farmer Name</Label>
                                                <Input 
                                                    value={form.farmer_name} 
                                                    onChange={e => setForm({ ...form, farmer_name: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Contact No.</Label>
                                                <Input 
                                                    value={form.contact_no}
                                                    onChange={e => setForm({ ...form, contact_no: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Address</Label>
                                                <Input 
                                                    value={form.address}  
                                                    onChange={e => setForm({ ...form, address: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Farm Address</Label>
                                                <Input 
                                                    value={form.farm_address}
                                                    onChange={e => setForm({ ...form, farm_address: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Spouse Name</Label>
                                                <Input
                                                    value={form.spouse_name}
                                                    onChange={e => setForm({ ...form, spouse_name: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            {/* Indigenous */}
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Indigenous Person?</Label>
                                                <select
                                                    className="border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-md p-2 w-full text-sm sm:text-base focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                                    value={form.is_indigenous ? "1" : "0"}
                                                    onChange={(e) => setForm({ ...form, is_indigenous: e.target.value === "1" })}
                                                >
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </select>
                                            </div>
                                            {form.is_indigenous && (
                                                <div className="space-y-2 sm:col-span-2">
                                                    <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Tribe</Label>
                                                    <Input
                                                        value={form.tribe}
                                                        onChange={(e) => setForm({ ...form, tribe: e.target.value })}
                                                        className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                    />
                                                </div>
                                            )}

                                            {/* PWD */}
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Person with Disability (PWD)?</Label>
                                                <select
                                                    className="border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-md p-2 w-full text-sm sm:text-base focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                                    value={form.is_pwd ? "1" : "0"}
                                                    onChange={(e) => setForm({ ...form, is_pwd: e.target.value === "1" })}
                                                >
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </select>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Proponent Card - Dark mode support */}
                                    {!isFarmer && (
                                        <Card className="mb-6 border border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                            <CardHeader className="bg-green-50 dark:bg-gray-700/50">
                                                <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-gray-200">Proponent Information</CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6">
                                                <div className="space-y-2">
                                                    <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Proponent Name</Label>
                                                    <Input
                                                        value={form.proponent_name}
                                                        onChange={e => setForm(prev => ({ ...prev, proponent_name: e.target.value }))}
                                                        placeholder="Enter or edit proponent name"
                                                        className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Proponent User</Label>
                                                    <Select
                                                        value={form.proponent?.toString() ?? ""}
                                                        onValueChange={(value) => {
                                                            const selected = proponents?.find((p: any) => p.id === Number(value));
                                                            setForm(prev => ({
                                                                ...prev,
                                                                proponent: selected?.id ?? null,
                                                                proponent_name: selected?.name ?? prev.proponent_name
                                                            }));
                                                        }}
                                                    >
                                                        <SelectTrigger className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500">
                                                            <SelectValue placeholder="Select Proponent" />
                                                        </SelectTrigger>
                                                        <SelectContent className="z-50 bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-green-200 dark:border-gray-700">
                                                            {proponents?.map((p: any) => (
                                                                <SelectItem 
                                                                    key={p.id} 
                                                                    value={p.id.toString()} 
                                                                    className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200"
                                                                >
                                                                    {p.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2 sm:col-span-2">
                                                    <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Proponent ID</Label>
                                                    <Input value={form.proponent} disabled className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Insurance Details Card - Dark mode support */}
                                    <Card className="mb-6 border pt-0 border-green-200/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95">
                                        <CardHeader className="bg-green-50 py-5 dark:bg-gray-700/50">
                                            <CardTitle className="text-lg sm:text-xl text-green-900 dark:text-green-500">Insurance Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Cover Type</Label>
                                                <Select
                                                    value={form.cover_type}
                                                    onValueChange={v => setForm({ ...form, cover_type: v })}
                                                >
                                                    <SelectTrigger className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-green-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                        <SelectItem value="commercial" className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200">Commercial</SelectItem>
                                                        <SelectItem value="non-commercial" className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200">Non-Commercial</SelectItem>
                                                        <SelectItem value="special" className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200">Special</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Animal Type</Label>
                                                <Input value="swine" disabled className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Purpose</Label>
                                                <Select
                                                    value={form.purpose}
                                                    onValueChange={v => setForm({ ...form, purpose: v })}
                                                >
                                                    <SelectTrigger className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-green-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                        <SelectItem value="breeding" className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200">Breeding</SelectItem>
                                                        <SelectItem value="fattening" className="text-sm sm:text-base focus:bg-green-50 dark:focus:bg-gray-700 focus:text-green-900 dark:focus:text-gray-200">Fattening</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Source of Stock</Label>
                                                <Input
                                                    value={form.source_of_stock}
                                                    onChange={e => setForm({ ...form, source_of_stock: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Housing Units</Label>
                                                <Input
                                                    value={form.no_of_housing_units}
                                                    onChange={e => setForm({ ...form, no_of_housing_units: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Birds Per Unit</Label>
                                                <Input
                                                    value={form.birds_per_unit}
                                                    onChange={e => setForm({ ...form, birds_per_unit: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Date of Purchase</Label>
                                                <Input
                                                    type="date"
                                                    value={form.date_of_purchase}
                                                    onChange={e => setForm({ ...form, date_of_purchase: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Desired Sum Insured</Label>
                                                <Input
                                                    value={form.desired_sum_insured}
                                                    onChange={e => setForm({ ...form, desired_sum_insured: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Total Sum Insured</Label>
                                                <Input
                                                    value={form.total_sum_insured}
                                                    onChange={e => setForm({ ...form, total_sum_insured: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Epidemic 1</Label>
                                                <Input
                                                    value={form.epidemic_1}
                                                    onChange={e => setForm({ ...form, epidemic_1: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Epidemic 2</Label>
                                                <Input
                                                    value={form.epidemic_2}
                                                    onChange={e => setForm({ ...form, epidemic_2: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Epidemic 3</Label>
                                                <Input
                                                    value={form.epidemic_3}
                                                    onChange={e => setForm({ ...form, epidemic_3: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Assignee</Label>
                                                <Input
                                                    value={form.assignee}
                                                    onChange={e => setForm({ ...form, assignee: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Assignee Address</Label>
                                                <Input
                                                    value={form.assignee_address}
                                                    onChange={e => setForm({ ...form, assignee_address: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm sm:text-base text-green-900 dark:text-gray-200 font-medium">Assignee Contact</Label>
                                                <Input
                                                    value={form.assignee_contact}
                                                    onChange={e => setForm({ ...form, assignee_contact: e.target.value })}
                                                    className="text-sm sm:text-base border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-green-500 focus:ring-green-500"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Submit Button */}
                                    <div className="flex flex-col sm:flex-row gap-3 justify-end mb-8">
                                        <Button 
                                            onClick={handleUpdate}
                                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-700 to-green-600 dark:from-green-800 dark:to-green-700 hover:from-green-800 hover:to-green-700 dark:hover:from-green-900 dark:hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                        >
                                            Update Application
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
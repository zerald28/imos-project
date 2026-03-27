import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Calendar, 
    Wallet, 
    TrendingUp, 
    PhilippinePeso, 
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    TrendingDown,
    CreditCard,
    ShoppingCart,
    Users,
    Package,
    Store,
    Receipt,
    Activity,
    Clock,
    Filter,
    ArrowUp,
    ArrowDown,
    Search,
    X,
    Download,
    CalendarRange,
    GitBranch,
    UserCircle,
    Users as UsersIcon,
    Settings,
    Eye,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    List,
    Grid,
    SortAsc,
    SortDesc,
    Filter as FilterIcon
} from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { route } from 'ziggy-js';
import { PigIcon } from "@/components/icons";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Swine Management',
        href: "/swine-management/",
    },
    {
        title: 'Financial Performance',
        href: "/swine-management/financial-performance",
    },
];

interface Swine {
    id: number;
    tag_number: string;
    category: string;
    purpose: string;
    stage: string;
    status: string;
    birthdate: string;
    age_in_days: number;
    breed: string;
    groups: Array<{ id: number; name: string }>;
}

interface Group {
    id: number;
    name: string;
    description: string;
    group_type: string;
    members_count: number;
}

interface FinancialData {
    totalExpenses: number;
    totalRevenue: number;
    totalProfit: number;
    directSaleRevenue: number;
    marketplaceRevenue: number;
    directSaleCount: number;
    marketplaceCount: number;
    expenseByCategory: Record<string, number>;
    monthlySummary: Array<{
        month: string;
        expenses: number;
        direct_sale_revenue: number;
        marketplace_revenue: number;
        total_revenue: number;
        profit: number;
    }>;
    individualPerformance?: Array<{
        swine_id: number;
        tag_number: string;
        expenses: number;
        revenue: number;
        profit: number;
    }>;
    swineCount?: number;
    recentExpenses: Array<{
        id: number;
        category: string;
        description: string;
        amount: number;
        date: string;
        created_at: string;
    }>;
    recentDirectSales: Array<{
        id: number;
        total_amount: number;
        buyer_name: string;
        sold_at: string;
        swine?: { tag_number: string };
    }>;
    recentMarketplaceTransactions: Array<{
        id: number;
        amount: number;
        quantity: number;
        transaction_date: string;
        listing?: { title: string };
        buyer?: { name: string };
    }>;
}

interface FinancialPerformanceProps {
    viewMode: 'individual' | 'group';
    allSwine?: Swine[];
    allGroups?: Group[];
    selectedSwine?: Swine | null;
    selectedGroup?: Group | null;
    financialData?: FinancialData | null;
    dateRange: string;
    startDate?: string;
    endDate?: string;
}

const SwineFinancialPerformance: React.FC<FinancialPerformanceProps> = ({
    viewMode: initialViewMode,
    allSwine = [],
    allGroups = [],
    selectedSwine,
    selectedGroup,
    financialData,
    dateRange: initialDateRange,
    startDate: initialStartDate,
    endDate: initialEndDate,
}) => {
    const [viewMode, setViewMode] = useState<'individual' | 'group'>(initialViewMode);
    const [selectedId, setSelectedId] = useState<number | null>(
        selectedSwine?.id || selectedGroup?.id || null
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [customStartDate, setCustomStartDate] = useState(initialStartDate || '');
    const [customEndDate, setCustomEndDate] = useState(initialEndDate || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'timeline'>('overview');
    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Updated color palette with greens - dark mode friendly
    const COLORS = ['#10b981', '#34d399', '#059669', '#047857', '#6ee7b7', '#a7f3d0', '#d1fae5', '#ecfdf5'];

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Format number with commas
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-PH').format(num);
    };

    // Handle selection change
    const handleSelect = (id: number) => {
        setSelectedId(id);
        applyFilters(id);
    };

    // Apply all filters and reload data
    const applyFilters = (id?: number | null, newDateRange?: string, start?: string, end?: string) => {
        const params: any = {
            view: viewMode,
            date_range: newDateRange || dateRange,
        };

        if (id !== undefined) {
            if (id) params.id = id;
        } else if (selectedId) {
            params.id = selectedId;
        }

        if ((newDateRange || dateRange) === 'custom') {
            if (start || customStartDate) params.start_date = start || customStartDate;
            if (end || customEndDate) params.end_date = end || customEndDate;
        }

        router.get(
            route('swine.management.financial-performance'),
            params,
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Handle date range change
    const handleDateRangeChange = (range: string) => {
        setDateRange(range);
        if (range !== 'custom') {
            setShowDatePicker(false);
            applyFilters(selectedId, range);
        } else {
            setShowDatePicker(true);
        }
    };

    // Apply custom date range
    const applyCustomDateRange = () => {
        if (customStartDate && customEndDate) {
            setShowDatePicker(false);
            applyFilters(selectedId, 'custom', customStartDate, customEndDate);
        }
    };

    // Clear selection
    const clearSelection = () => {
        setSelectedId(null);
        setCurrentPage(1);
        router.get(
            route('swine.management.financial-performance'),
            { view: viewMode },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Toggle view mode
    const toggleViewMode = (mode: 'individual' | 'group') => {
        setViewMode(mode);
        setSelectedId(null);
        setSearchTerm('');
        setStatusFilter('all');
        setCurrentPage(1);
        router.get(
            route('swine.management.financial-performance'),
            { view: mode },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Filter items based on search and filters
    const getFilteredItems = () => {
        if (viewMode === 'individual') {
            let items = [...allSwine];

            if (searchTerm) {
                items = items.filter(swine => 
                    swine.tag_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    swine.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    swine.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    swine.purpose?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (statusFilter !== 'all') {
                items = items.filter(swine => swine.status === statusFilter);
            }

            items.sort((a, b) => a.tag_number.localeCompare(b.tag_number));
            return items;
        } else {
            let items = [...allGroups];

            if (searchTerm) {
                items = items.filter(group => 
                    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }

            items.sort((a, b) => a.name.localeCompare(b.name));
            return items;
        }
    };

    const filteredItems = getFilteredItems();
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Prepare pie chart data
    const pieChartData = financialData?.expenseByCategory 
        ? Object.entries(financialData.expenseByCategory).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
            value
          }))
        : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6">
                <Head title="Swine Financial Performance" />
                
                {/* Header - Responsive */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Swine Financial Performance
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Track revenue, expenses, and profit for individual swine or groups
                    </p>
                </div>

                {/* View Mode Toggle and Filters - Dark mode support */}
                <div className="flex flex-col space-y-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                            <button
                                onClick={() => toggleViewMode('individual')}
                                className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${
                                    viewMode === 'individual'
                                        ? 'bg-emerald-600 dark:bg-emerald-600 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <UserCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Individual Swine
                            </button>
                            <button
                                onClick={() => toggleViewMode('group')}
                                className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${
                                    viewMode === 'group'
                                        ? 'bg-emerald-600 dark:bg-emerald-600 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Groups
                            </button>
                        </div>

                        {/* Date Range Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-xs sm:text-sm dark:text-gray-300"
                            >
                                <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                {dateRange === 'custom' && customStartDate && customEndDate
                                    ? `${new Date(customStartDate).toLocaleDateString()} - ${new Date(customEndDate).toLocaleDateString()}`
                                    : 'Select Date Range'}
                            </button>

                            {/* Custom Date Picker - Dark mode */}
                            {showDatePicker && (
                                <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-10 w-72">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={customStartDate}
                                                onChange={(e) => setCustomStartDate(e.target.value)}
                                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-gray-200 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                value={customEndDate}
                                                onChange={(e) => setCustomEndDate(e.target.value)}
                                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-gray-200 text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => setShowDatePicker(false)}
                                                className="px-3 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={applyCustomDateRange}
                                                className="px-3 py-1 text-xs sm:text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
                                                disabled={!customStartDate || !customEndDate}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search and Filter Bar - Dark mode */}
                    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border dark:border-gray-700">
                        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                {/* <Search className="absolute right-3 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" /> */}
                                <input
                                    type="text"
                                    placeholder={viewMode === 'individual' 
                                        ? "Search by tag number, category, breed, or purpose..." 
                                        : "Search by group name or description..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-gray-200 text-sm"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-2">
                                {viewMode === 'individual' && (
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-gray-200 text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="sold">Sold</option>
                                        <option value="deceased">Deceased</option>
                                    </select>
                                )}

                                {/* Display Mode Toggle */}
                                <div className="flex border dark:border-gray-600 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setDisplayMode('grid')}
                                        className={`px-2 sm:px-3 py-1.5 sm:py-2 transition-colors ${
                                            displayMode === 'grid' 
                                                ? 'bg-emerald-600 dark:bg-emerald-600 text-white' 
                                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDisplayMode('list')}
                                        className={`px-2 sm:px-3 py-1.5 sm:py-2 transition-colors ${
                                            displayMode === 'list' 
                                                ? 'bg-emerald-600 dark:bg-emerald-600 text-white' 
                                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        <List className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                </div>

                                {/* Export Button */}
                                <button className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-xs sm:text-sm dark:text-gray-300">
                                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Active Filters Display - Dark mode */}
                        {(searchTerm || statusFilter !== 'all') && (
                            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t dark:border-gray-700">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
                                {searchTerm && (
                                    <span className="inline-flex items-center px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-xs">
                                        Search: {searchTerm}
                                        <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-600 dark:hover:text-emerald-300">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {statusFilter !== 'all' && (
                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs">
                                        Status: {statusFilter}
                                        <button onClick={() => setStatusFilter('all')} className="ml-1 hover:text-green-600 dark:hover:text-green-300">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Left Column - List of Swine/Groups - Dark mode */}
                    <div className="lg:col-span-1">
                        <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center justify-between text-sm sm:text-base dark:text-gray-200">
                                    <span>
                                        {viewMode === 'individual' ? 'Swine List' : 'Groups List'}
                                    </span>
                                    <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {filteredItems.length} {viewMode === 'individual' ? 'swine' : 'groups'}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {paginatedItems.length > 0 ? (
                                    <>
                                        {displayMode === 'grid' ? (
                                            // Grid View - Dark mode
                                            <div className="grid grid-cols-1 gap-3 p-3 sm:p-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
                                                {paginatedItems.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleSelect(item.id)}
                                                        className={`text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                                            selectedId === item.id
                                                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                                                : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                                        }`}
                                                    >
                                                        {viewMode === 'individual' ? (
                                                            <>
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div className="flex items-center">
                                                                        <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-2 sm:mr-3">
                                                                            <PigIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                                                                                {(item as Swine).tag_number}
                                                                            </h3>
                                                                            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                                                                {(item as Swine).breed}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                                                                        (item as Swine).status === 'active' 
                                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                                            : (item as Swine).status === 'sold'
                                                                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400'
                                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                                                                    }`}>
                                                                        {(item as Swine).status}
                                                                    </span>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-3 text-[10px] sm:text-xs">
                                                                    <div>
                                                                        <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                                                        <span className="ml-1 font-medium dark:text-gray-300">{(item as Swine).category}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500 dark:text-gray-400">Stage:</span>
                                                                        <span className="ml-1 font-medium dark:text-gray-300">{(item as Swine).stage}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500 dark:text-gray-400">Age:</span>
                                                                        <span className="ml-1 font-medium dark:text-gray-300">{(item as Swine).age_in_days} days</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500 dark:text-gray-400">Groups:</span>
                                                                        <span className="ml-1 font-medium dark:text-gray-300">{(item as Swine).groups.length}</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div className="flex items-center">
                                                                        <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-2 sm:mr-3">
                                                                            <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                                                                                {(item as Group).name}
                                                                            </h3>
                                                                            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                                                                {(item as Group).group_type}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                                                        {(item as Group).members_count} members
                                                                    </span>
                                                                </div>
                                                                {(item as Group).description && (
                                                                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                                                        {(item as Group).description}
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            // List View - Dark mode
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                        {viewMode === 'individual' ? (
                                                            <tr className="dark:border-gray-700">
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Tag #</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Breed</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Category</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Age</th>
                                                                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                                                            </tr>
                                                        ) : (
                                                            <tr className="dark:border-gray-700">
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Group Name</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                                                                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Description</th>
                                                                <th className="text-center py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Members</th>
                                                                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                                                            </tr>
                                                        )}
                                                    </thead>
                                                    <tbody className="divide-y dark:divide-gray-700">
                                                        {paginatedItems.map((item) => (
                                                            <tr 
                                                                key={item.id}
                                                                className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                                                                    selectedId === item.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                                                                }`}
                                                                onClick={() => handleSelect(item.id)}
                                                            >
                                                                {viewMode === 'individual' ? (
                                                                    <>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm dark:text-gray-300">{(item as Swine).tag_number}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm dark:text-gray-400">{(item as Swine).breed}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm dark:text-gray-400">{(item as Swine).category}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                                                            <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                                                                                (item as Swine).status === 'active' 
                                                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                                                                            }`}>
                                                                                {(item as Swine).status}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm dark:text-gray-400">{(item as Swine).age_in_days} days</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                                                                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 inline" />
                                                                        </td>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm dark:text-gray-300">{(item as Group).name}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm dark:text-gray-400">{(item as Group).group_type}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm dark:text-gray-400 max-w-xs truncate">{(item as Group).description}</td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                                                                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs">
                                                                                {(item as Group).members_count}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                                                                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 inline" />
                                                                        </td>
                                                                    </>
                                                                )}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Pagination - Dark mode */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t dark:border-gray-700">
                                                <button
                                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                    disabled={currentPage === 1}
                                                    className="px-2 sm:px-3 py-1 border dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-400"
                                                >
                                                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                    Page {currentPage} of {totalPages}
                                                </span>
                                                <button
                                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="px-2 sm:px-3 py-1 border dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-400"
                                                >
                                                    <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-8 sm:py-12">
                                        <PigIcon className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400 dark:text-emerald-500 mx-auto mb-2 sm:mb-3" />
                                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">No {viewMode === 'individual' ? 'swine' : 'groups'} found</p>
                                        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            Try adjusting your filters
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Financial Data - Dark mode */}
                    <div className="lg:col-span-2">
                        {!selectedId ? (
                            <Card className="dark:bg-gray-800 dark:border-gray-700">
                                <CardContent className="p-8 sm:p-12 text-center">
                                    <PigIcon className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 dark:text-emerald-500 mx-auto mb-3 sm:mb-4" />
                                    <h3 className="text-base sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Select {viewMode === 'individual' ? 'a Swine' : 'a Group'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
                                        {viewMode === 'individual' 
                                            ? 'Choose an individual swine from the list to view its financial performance'
                                            : 'Select a group to see combined financial data for all members'
                                        }
                                    </p>
                                    <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                                        {filteredItems.length} {viewMode === 'individual' ? 'swine' : 'groups'} available
                                    </div>
                                </CardContent>
                            </Card>
                        ) : financialData ? (
                            <div className="space-y-4 sm:space-y-6">
                                {/* Selected Item Header - Dark mode */}
                                <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center">
                                                {viewMode === 'individual' && selectedSwine && (
                                                    <>
                                                        <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm mr-3 sm:mr-4">
                                                            <PigIcon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                                                                {selectedSwine.tag_number}
                                                            </h2>
                                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                                    {selectedSwine.breed} • {selectedSwine.category}
                                                                </span>
                                                                <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                                                                    selectedSwine.status === 'active' 
                                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                                                                }`}>
                                                                    {selectedSwine.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {viewMode === 'group' && selectedGroup && (
                                                    <>
                                                        <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm mr-3 sm:mr-4">
                                                            <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                                                                {selectedGroup.name}
                                                            </h2>
                                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                                    {selectedGroup.group_type}
                                                                </span>
                                                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                                                                    {selectedGroup.members_count} members
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <button
                                                onClick={clearSelection}
                                                className="p-1.5 sm:p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors self-start sm:self-auto"
                                            >
                                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Summary Cards - Dark mode */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {/* Total Revenue Card */}
                                    <Card className="border-l-4 border-l-green-500 dark:bg-gray-800 dark:border-gray-700">
                                        <CardContent className="p-3 sm:p-6">
                                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                    <PhilippinePeso className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                                    {financialData.directSaleCount + financialData.marketplaceCount} sales
                                                </span>
                                            </div>
                                            <h3 className="text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Revenue</h3>
                                            <p className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                                                {formatCurrency(financialData.totalRevenue)}
                                            </p>
                                            <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-3">
                                                <div className="bg-green-50 dark:bg-green-900/20 p-1.5 sm:p-2 rounded">
                                                    <p className="text-[8px] sm:text-xs text-green-700 dark:text-green-400">Direct Sales</p>
                                                    <p className="text-[10px] sm:text-sm font-semibold text-green-800 dark:text-green-300">
                                                        {formatCurrency(financialData.directSaleRevenue)}
                                                    </p>
                                                    <p className="text-[7px] sm:text-xs text-green-600 dark:text-green-500">
                                                        {financialData.directSaleCount} sales
                                                    </p>
                                                </div>
                                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-1.5 sm:p-2 rounded">
                                                    <p className="text-[8px] sm:text-xs text-emerald-700 dark:text-emerald-400">Marketplace</p>
                                                    <p className="text-[10px] sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                                        {formatCurrency(financialData.marketplaceRevenue)}
                                                    </p>
                                                    <p className="text-[7px] sm:text-xs text-emerald-600 dark:text-emerald-500">
                                                        {financialData.marketplaceCount} sales
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Total Expenses Card */}
                                    <Card className="border-l-4 border-l-red-500 dark:bg-gray-800 dark:border-gray-700">
                                        <CardContent className="p-3 sm:p-6">
                                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                <div className="p-1.5 sm:p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                                    <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                                                </div>
                                                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                                                    {Object.keys(financialData.expenseByCategory).length} categories
                                                </span>
                                            </div>
                                            <h3 className="text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</h3>
                                            <p className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                                                {formatCurrency(financialData.totalExpenses)}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                                                <span className="text-[9px] sm:text-sm text-red-600 dark:text-red-400 font-medium">
                                                    Feed, medication, operational
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Net Profit Card */}
                                    <Card className={`border-l-4 ${
                                        financialData.totalProfit >= 0 
                                            ? 'border-l-emerald-500' 
                                            : 'border-l-rose-500'
                                    } dark:bg-gray-800 dark:border-gray-700`}>
                                        <CardContent className="p-3 sm:p-6">
                                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                <div className={`p-1.5 sm:p-2 rounded-lg ${
                                                    financialData.totalProfit >= 0 
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                                                        : 'bg-rose-100 dark:bg-rose-900/30'
                                                }`}>
                                                    <BarChart3 className={`w-4 h-4 sm:w-6 sm:h-6 ${
                                                        financialData.totalProfit >= 0 
                                                            ? 'text-emerald-600 dark:text-emerald-400' 
                                                            : 'text-rose-600 dark:text-rose-400'
                                                    }`} />
                                                </div>
                                                {financialData.totalProfit >= 0 ? (
                                                    <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                                                        Profitable
                                                    </span>
                                                ) : (
                                                    <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400">
                                                        Loss
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Profit</h3>
                                            <p className={`text-base sm:text-2xl font-bold ${
                                                financialData.totalProfit >= 0 
                                                    ? 'text-emerald-700 dark:text-emerald-400' 
                                                    : 'text-rose-700 dark:text-rose-400'
                                            }`}>
                                                {formatCurrency(financialData.totalProfit)}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                {financialData.totalProfit >= 0 ? (
                                                    <>
                                                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mr-1" />
                                                        <span className="text-[9px] sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                                            {((financialData.totalProfit / financialData.totalRevenue) * 100 || 0).toFixed(1)}% margin
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 mr-1" />
                                                        <span className="text-[9px] sm:text-sm text-rose-600 dark:text-rose-400 font-medium">
                                                            Operating at a loss
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Performance Metrics Card */}
                                    <Card className="border-l-4 border-l-emerald-500 dark:bg-gray-800 dark:border-gray-700">
                                        <CardContent className="p-3 sm:p-6">
                                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                                    <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                                                    Metrics
                                                </span>
                                            </div>
                                            <h3 className="text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">Performance Metrics</h3>
                                            <div className="space-y-1 sm:space-y-2">
                                                <div className="flex justify-between text-[9px] sm:text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">ROI</span>
                                                    <span className={`font-semibold ${
                                                        financialData.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                        {((financialData.totalProfit / (financialData.totalExpenses || 1)) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-[9px] sm:text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">Avg Sale Value</span>
                                                    <span className="font-semibold dark:text-gray-300">
                                                        {formatCurrency(financialData.totalRevenue / (financialData.directSaleCount + financialData.marketplaceCount || 1))}
                                                    </span>
                                                </div>
                                                {viewMode === 'group' && financialData.swineCount && (
                                                    <div className="flex justify-between text-[9px] sm:text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Per Swine Avg</span>
                                                        <span className="font-semibold dark:text-gray-300">
                                                            {formatCurrency(financialData.totalProfit / financialData.swineCount)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Tab Navigation - Dark mode */}
                                <div className="flex flex-wrap gap-1 sm:gap-2 border-b dark:border-gray-700">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
                                            activeTab === 'overview'
                                                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('breakdown')}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
                                            activeTab === 'breakdown'
                                                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        Expense Breakdown
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('timeline')}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
                                            activeTab === 'timeline'
                                                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        Timeline
                                    </button>
                                </div>

                                {/* Tab Content - Dark mode */}
                                <div className="space-y-4 sm:space-y-6">
                                    {activeTab === 'overview' && (
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                            {/* Monthly Performance Chart */}
                                            <div className="lg:col-span-2">
                                                <Card className="dark:bg-gray-800 dark:border-gray-700">
                                                    <CardHeader className="p-3 sm:p-4">
                                                        <CardTitle className="text-sm sm:text-base dark:text-gray-200">Monthly Performance</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-3 sm:p-4">
                                                        <div className="h-64 sm:h-80">
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                <BarChart data={financialData.monthlySummary}>
                                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                                    <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-500" fontSize={10} />
                                                                    <YAxis tickFormatter={(value) => `₱${value/1000}k`} stroke="#6b7280" className="dark:stroke-gray-500" fontSize={10} />
                                                                    <Tooltip 
                                                                        formatter={(value) => formatCurrency(Number(value))}
                                                                        contentStyle={{ 
                                                                            backgroundColor: 'rgba(255,255,255,0.95)',
                                                                            borderRadius: '8px',
                                                                            border: '1px solid #e5e7eb'
                                                                        }}
                                                                    />
                                                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                                                    <Bar dataKey="direct_sale_revenue" name="Direct Sales" fill="#10b981" />
                                                                    <Bar dataKey="marketplace_revenue" name="Marketplace" fill="#34d399" />
                                                                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                                                                    <Bar dataKey="profit" name="Profit" fill="#059669" />
                                                                </BarChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            {/* Quick Stats - Dark mode */}
                                            <div>
                                                <Card className="dark:bg-gray-800 dark:border-gray-700">
                                                    <CardHeader className="p-3 sm:p-4">
                                                        <CardTitle className="text-sm sm:text-base dark:text-gray-200">Quick Stats</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-3 sm:p-4">
                                                        <div className="space-y-3 sm:space-y-4">
                                                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                                <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Best Month</p>
                                                                {financialData.monthlySummary.length > 0 && (
                                                                    <>
                                                                        <p className="text-sm sm:text-lg font-semibold dark:text-gray-200">
                                                                            {financialData.monthlySummary.reduce((best, current) => 
                                                                                current.profit > best.profit ? current : best
                                                                            ).month}
                                                                        </p>
                                                                        <p className="text-[10px] sm:text-sm text-green-600 dark:text-green-400">
                                                                            Profit: {formatCurrency(
                                                                                financialData.monthlySummary.reduce((best, current) => 
                                                                                    current.profit > best.profit ? current : best
                                                                                ).profit
                                                                            )}
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                                <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Worst Month</p>
                                                                {financialData.monthlySummary.length > 0 && (
                                                                    <>
                                                                        <p className="text-sm sm:text-lg font-semibold dark:text-gray-200">
                                                                            {financialData.monthlySummary.reduce((worst, current) => 
                                                                                current.profit < worst.profit ? current : worst
                                                                            ).month}
                                                                        </p>
                                                                        <p className="text-[10px] sm:text-sm text-red-600 dark:text-red-400">
                                                                            Profit: {formatCurrency(
                                                                                financialData.monthlySummary.reduce((worst, current) => 
                                                                                    current.profit < worst.profit ? current : worst
                                                                                ).profit
                                                                            )}
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                                <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Total Transactions</p>
                                                                <p className="text-lg sm:text-2xl font-semibold dark:text-gray-200">
                                                                    {financialData.directSaleCount + financialData.marketplaceCount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'breakdown' && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                            {/* Expense Pie Chart */}
                                            <Card className="dark:bg-gray-800 dark:border-gray-700">
                                                <CardHeader className="p-3 sm:p-4">
                                                    <CardTitle className="text-sm sm:text-base dark:text-gray-200">Expense Breakdown by Category</CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-3 sm:p-4">
                                                    {pieChartData.length > 0 ? (
                                                        <>
                                                            <div className="h-48 sm:h-64">
                                                                <ResponsiveContainer width="100%" height="100%">
                                                                    <RechartsPieChart>
                                                                        <Pie
                                                                            data={pieChartData}
                                                                            cx="50%"
                                                                            cy="50%"
                                                                            labelLine={false}
                                                                            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                                                                            outerRadius={60}
                                                                            fill="#10b981"
                                                                            dataKey="value"
                                                                        >
                                                                            {pieChartData.map((entry, index) => (
                                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                            ))}
                                                                        </Pie>
                                                                        <Tooltip 
                                                                            formatter={(value) => formatCurrency(Number(value))}
                                                                            contentStyle={{ 
                                                                                backgroundColor: 'rgba(255,255,255,0.95)',
                                                                                borderRadius: '8px',
                                                                                border: '1px solid #e5e7eb'
                                                                            }}
                                                                        />
                                                                    </RechartsPieChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                                                                {pieChartData.slice(0, 5).map((item, index) => (
                                                                    <div key={index} className="flex items-center justify-between">
                                                                        <div className="flex items-center">
                                                                            <div 
                                                                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1.5 sm:mr-2" 
                                                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                                            />
                                                                            <span className="text-[10px] sm:text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                                                                        </div>
                                                                        <span className="text-[10px] sm:text-sm font-semibold dark:text-gray-300">
                                                                            {formatCurrency(item.value)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center py-6 sm:py-8">
                                                            <Wallet className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 sm:mb-3" />
                                                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">No expense data available</p>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {/* Recent Expenses List - Dark mode */}
                                            <Card className="dark:bg-gray-800 dark:border-gray-700">
                                                <CardHeader className="p-3 sm:p-4">
                                                    <CardTitle className="text-sm sm:text-base dark:text-gray-200">Recent Expenses</CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-3 sm:p-4">
                                                    <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                                                        {financialData.recentExpenses.length > 0 ? (
                                                            financialData.recentExpenses.map((expense) => (
                                                                <div key={expense.id} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{expense.category}</p>
                                                                        <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{expense.description}</p>
                                                                        <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                                                                            {new Date(expense.date).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                    <span className="font-semibold text-red-600 dark:text-red-400 text-xs sm:text-sm ml-2">
                                                                        {formatCurrency(expense.amount)}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm py-4">No recent expenses</p>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    {activeTab === 'timeline' && (
                                        <Card className="dark:bg-gray-800 dark:border-gray-700">
                                            <CardHeader className="p-3 sm:p-4">
                                                <CardTitle className="text-sm sm:text-base dark:text-gray-200">Revenue & Expense Timeline</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-3 sm:p-4">
                                                <div className="h-64 sm:h-96">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={financialData.monthlySummary}>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                            <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-500" fontSize={10} />
                                                            <YAxis tickFormatter={(value) => `₱${value/1000}k`} stroke="#6b7280" className="dark:stroke-gray-500" fontSize={10} />
                                                            <Tooltip 
                                                                formatter={(value) => formatCurrency(Number(value))}
                                                                contentStyle={{ 
                                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                                    borderRadius: '8px',
                                                                    border: '1px solid #e5e7eb'
                                                                }}
                                                            />
                                                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                                                            <Area 
                                                                type="monotone" 
                                                                dataKey="total_revenue" 
                                                                name="Revenue" 
                                                                stroke="#10b981" 
                                                                fill="#10b981" 
                                                                fillOpacity={0.3}
                                                            />
                                                            <Area 
                                                                type="monotone" 
                                                                dataKey="expenses" 
                                                                name="Expenses" 
                                                                stroke="#ef4444" 
                                                                fill="#ef4444" 
                                                                fillOpacity={0.3}
                                                            />
                                                            <Line 
                                                                type="monotone" 
                                                                dataKey="profit" 
                                                                name="Profit" 
                                                                stroke="#059669" 
                                                                strokeWidth={2}
                                                            />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* Individual Performance Table (for Group View) - Dark mode */}
                                {viewMode === 'group' && financialData.individualPerformance && financialData.individualPerformance.length > 0 && (
                                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                                        <CardHeader className="p-3 sm:p-4">
                                            <CardTitle className="text-sm sm:text-base dark:text-gray-200">Individual Swine Performance</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                        <tr className="dark:border-gray-700">
                                                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Tag Number</th>
                                                            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Expenses</th>
                                                            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Revenue</th>
                                                            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Profit</th>
                                                            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Margin</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y dark:divide-gray-700">
                                                        {financialData.individualPerformance.map((swine) => (
                                                            <tr key={swine.swine_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                                <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm dark:text-gray-300">{swine.tag_number}</td>
                                                                <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                                                                    {formatCurrency(swine.expenses)}
                                                                </td>
                                                                <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-green-600 dark:text-green-400 text-xs sm:text-sm">
                                                                    {formatCurrency(swine.revenue)}
                                                                </td>
                                                                <td className={`text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm ${
                                                                    swine.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                                                }`}>
                                                                    {formatCurrency(swine.profit)}
                                                                </td>
                                                                <td className="text-right py-2 sm:py-3 px-2 sm:px-4">
                                                                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs ${
                                                                        swine.profit >= 0 
                                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                                                    }`}>
                                                                        {((swine.profit / (swine.revenue || 1)) * 100).toFixed(1)}%
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            <Card className="dark:bg-gray-800 dark:border-gray-700">
                                <CardContent className="p-8 sm:p-12 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-emerald-600 mx-auto mb-3 sm:mb-4"></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Loading financial data...</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SwineFinancialPerformance;
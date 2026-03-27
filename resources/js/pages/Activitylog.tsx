// File: resources/js/Pages/swine-management/ActivityLog.tsx
import React, { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { 
    Activity, 
    Clock, 
    Filter, 
    Search, 
    Calendar, 
    CreditCard, 
    Store, 
    ChevronLeft,
    Download,
    FileText,
    PhilippinePeso,

} from "lucide-react";
import { type BreadcrumbItem } from '@/types';

interface ActivityLogProps {
    activities: Array<{
        id: number;
        type: 'expense' | 'marketplace' | 'direct_sale';
        title: string;
        description?: string | null;
        amount: number;
        date: string;
        category?: string | null;
        status?: string | null;
        buyer?: string | null;
    }>;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'expense' | 'marketplace' | 'direct_sale'>('all');
    const [dateFilter, setDateFilter] = useState('');

    const filteredActivities = useMemo(() => {
        return activities.filter(activity => {
            // Search filter - with null safety
            const matchesSearch = searchTerm === '' || 
                activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (activity.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (activity.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (activity.buyer || '').toLowerCase().includes(searchTerm.toLowerCase());
            
            // Type filter
            const matchesType = typeFilter === 'all' || activity.type === typeFilter;
            
            // Date filter - with null safety
            let matchesDate = true;
            if (dateFilter) {
                if (activity.date) {
                    const activityDate = new Date(activity.date);
                    const filterDate = new Date(dateFilter);
                    matchesDate = activityDate.toDateString() === filterDate.toDateString();
                } else {
                    matchesDate = false;
                }
            }
            
            return matchesSearch && matchesType && matchesDate;
        });
    }, [activities, searchTerm, typeFilter, dateFilter]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'No date';
        return new Date(dateString).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    const getActivityIcon = (type: string) => {
        switch(type) {
            case 'expense': return <CreditCard className="w-5 h-5" />;
            case 'marketplace': return <Store className="w-5 h-5" />;
            case 'direct_sale': return <PhilippinePeso className="w-5 h-5" />;
            default: return <Activity className="w-5 h-5" />;
        }
    };

    const getActivityColor = (type: string) => {
        switch(type) {
            case 'expense': return 'bg-red-100 text-red-700';
            case 'marketplace': return 'bg-green-100 text-green-700';
            case 'direct_sale': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Swine Management', href: "/swine-management/" },
        { title: 'Activity Log', href: "/swine-management/activity-log" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 p-4 md:p-6">
                <Head title="Activity Log" />
                
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Link href="/swine-management/" className="hover:opacity-80">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Activity className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    Activity Log
                                </h1>
                                <p className="text-gray-600">
                                    Track all financial activities and transactions
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Search activities..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value as any)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="expense">Expenses</option>
                                        <option value="marketplace">Marketplace Sales</option>
                                        <option value="direct_sale">Direct Sales</option>
                                    </select>
                                </div>

                                {/* Date Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                    />
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm('');
                                            setTypeFilter('all');
                                            setDateFilter('');
                                        }}
                                        className="w-full"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activities List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <Filter className="w-5 h-5 mr-2" />
                                All Activities ({filteredActivities.length})
                            </CardTitle>
                            <div className="text-sm text-gray-500">
                                Showing {filteredActivities.length} of {activities.length} activities
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredActivities.length > 0 ? (
                            <div className="space-y-4">
                                {filteredActivities.map((activity) => (
                                       <div
        key={`${activity.type}-${activity.id}`}
        className={`p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
            activity.type === 'expense' ? 'cursor-pointer' : ''
        }`}
        onClick={() => {
            if (activity.type === 'expense') {
                // Navigate to expenses page with this expense selected
                router.get('/swine-management/expenses', {
                    expense_id: activity.id,
                    highlight: true
                });
            }
        }}
    >

                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {activity.title || 'Untitled Activity'}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {activity.description || 'No description'}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getActivityColor(activity.type)}`}>
                                                            {activity.type === 'expense' ? 'Expense' : 
                                                             activity.type === 'marketplace' ? 'Marketplace Sale' : 'Direct Sale'}
                                                        </span>
                                                        {activity.category && (
                                                            <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                                                                {activity.category}
                                                            </span>
                                                        )}
                                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDate(activity.date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 text-right">
                                                <div className={`text-lg font-bold ${
                                                    activity.type === 'expense' ? 'text-red-600' : 'text-green-600'
                                                }`}>
                                                    {activity.type === 'expense' ? '-' : '+'}{formatCurrency(activity.amount)}
                                                </div>
                                                {activity.buyer && (
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        Buyer: {activity.buyer}
                                                    </div>
                                                )}
                                                {activity.status && (
                                                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                                                        activity.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : activity.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {activity.status}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    No activities found
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Try adjusting your filters or add new activities
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/swine-management/expenses/create">
                                        <Button variant="outline" className="gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Add Expense
                                        </Button>
                                    </Link>
                                    <Link href="/marketplace/create">
                                        <Button variant="outline" className="gap-2">
                                            <Store className="w-4 h-4" />
                                            Sell in Marketplace
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default ActivityLog;
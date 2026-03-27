import React, { useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  FileText, 
  Calendar, 
  MessageCircle,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  Newspaper,
  ShieldCheck,
  Activity,
  PhilippinePeso,
  PiggyBank,
  Eye,
  Heart,
  LayoutGrid,
  BookOpen
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PigIcon } from "@/components/icons";

interface Stats {
  totalSwine: number;
  activeSwine: number;
  deadSwine: number;
  soldSwine: number;
  totalMarketplaceListings: number;
  availableListingSwine: number;
  totalRequests: number;
  totalExpenses: number;
  totalPendingBookings: number;
  totalAcceptedBookings: number;
  totalCompletedBookings: number;
  totalCancelledBookings: number;
  pendingRequestCount: number;
  sellerReviewCount: number;
  sellerApprovedCount: number;
  buyerConfirmedCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount: number;
  expiredCount: number;
}
interface InsuranceStats {
  totalApplications: number;
  submittedApplications: number;
  reviewedApplications: number;
  completedApplications: number;
  incompleteApplications: number;
  animalsWithReports: number;
  totalReports: number;
}

interface SwineGroup {
  id: number;
  name: string;
  pigs_count: number;
  male_count: number;
  female_count: number;
  avg_weight: number;
  breeds: string[];
  status: string;
}

interface Message {
  id: number;
  sender_name: string;
  message_preview: string;
  prefix: string;
  created_at: string;
}

interface MarketplaceActivity {
  id: number;
  listing_id: number;
  buyer_name?: string;
  amount?: number;
  quantity?: number;
  state?: string;
  listing_title?: string;
  created_at: string;
  type?: 'transaction' | 'request';
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: any;
  thumbnail: string | null;
  created_at: string;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  is_recent: boolean;
}

interface BlogPostsData {
  latestDaPost: BlogPost | null;
  otherPosts: BlogPost[];
}

interface Props {
  stats: Stats;
  insuranceStats: InsuranceStats;
  recentActivities: any[];
  swineActionCounts: any[];
  swineGroups: SwineGroup[];
  messages: Message[];
  recentMarketplaceActivity: MarketplaceActivity[];
  blogPosts: BlogPostsData;
}

export default function FarmerDashboard({ 
  stats, 
  insuranceStats,
  swineGroups, 
  messages, 
  recentMarketplaceActivity,
  blogPosts 
}: Props) {
  const [activeTab, setActiveTab] = useState("marketplace");
  
  const handleBlogPostClick = (slug: string) => {
    router.visit(`/cms/blog/${slug}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatContent = (content: any) => {
    if (typeof content === 'string') {
      return content.substring(0, 80) + '...';
    }
    if (content && content.blocks) {
      const text = content.blocks
        .map((block: any) => block.data.text || '')
        .join(' ')
        .substring(0, 80);
      return text + '...';
    }
    return 'Click to read more...';
  };

  const hasRecentPosts = blogPosts.latestDaPost?.is_recent || 
    blogPosts.otherPosts.some(post => post.is_recent);

  return (
    <AppLayout>
      <div className="py-4 sm:py-6 px-3 sm:px-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mx-0 sm:mx-0 p-3 sm:p-4 rounded-xl border border-slate-200/50 dark:border-gray-700/50 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Farmer Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
              Welcome back! Here's an overview of your Integrated Management System
            </p>
          </div>
          <Badge variant="outline" className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/50 dark:bg-gray-800/50 border-slate-200 dark:border-gray-700">
            <Calendar className="w-3 h-3 mr-1 sm:mr-2 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </Badge>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid mx-0 gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-400">Total Swine</CardTitle>
              <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <PigIcon className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200">{stats.totalSwine}</div>
              <div className="flex flex-wrap gap-1 mt-1 text-[10px] sm:text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.activeSwine} active</span>
                <span className="text-slate-300 dark:text-gray-600">•</span>
                <span className="text-rose-600 dark:text-rose-400 font-medium">{stats.deadSwine} dead</span>
                <span className="text-slate-300 dark:text-gray-600">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.soldSwine} sold</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-400">Marketplace</CardTitle>
              <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200">{stats.totalMarketplaceListings}</div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.availableListingSwine}</span> available • <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.totalRequests}</span> requests
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-400">Insurance</CardTitle>
              <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200">{insuranceStats.totalApplications}</div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">{insuranceStats.submittedApplications}</span> pending • <span className="text-emerald-600 dark:text-emerald-400 font-medium">{insuranceStats.completedApplications}</span> completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-400">CMS/Blog</CardTitle>
              <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Newspaper className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200">
                {(blogPosts.latestDaPost ? 1 : 0) + blogPosts.otherPosts.length}
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Latest updates</span> from DA
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid - Two Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Left Column - Tab Content (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="marketplace" className="w-full" onValueChange={setActiveTab}>
              <div className="border-b border-slate-200 dark:border-gray-700 mb-4">
                <TabsList className="bg-transparent h-auto p-0 gap-1 sm:gap-2">
                  <TabsTrigger 
                    value="marketplace" 
                    className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Marketplace
                    {stats.pendingRequestCount > 0 && (
                      <Badge className="ml-1 sm:ml-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] px-1 py-0 h-4">
                        {stats.pendingRequestCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="insurance" 
                    className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  >
                    <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Insurance
                    {insuranceStats.submittedApplications > 0 && (
                      <Badge className="ml-1 sm:ml-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] px-1 py-0 h-4">
                        {insuranceStats.submittedApplications}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cms" 
                    className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  >
                    <Newspaper className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    CMS/Blog
                    {hasRecentPosts && (
                      <Badge className="ml-1 sm:ml-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] px-1 py-0 h-4">
                        New
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Marketplace Tab Content - Added mx-2 for spacing */}
              <TabsContent value="marketplace" className="mt-0 mx-1 sm:mx-2">
                <Card className="overflow-hidden border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                  <div className="bg-emerald-500 h-1 w-full" />
                  <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-slate-800 dark:text-gray-200">Marketplace System</CardTitle>
                          <CardDescription className="text-sm text-slate-500 dark:text-gray-400">Buy, sell, and manage livestock listings</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-xs">
                        {stats.pendingRequestCount} new requests
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 px-4">
                    {/* Rest of marketplace content remains the same */}
                    <div className="space-y-3">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="p-2 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                          <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-base">{stats.totalMarketplaceListings}</div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-500">Total Listings</div>
                        </div>
                        <div className="p-2 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                          <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-base">{stats.availableListingSwine}</div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-500">Available Swine</div>
                        </div>
                        <div className="p-2 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                          <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-base">{stats.pendingRequestCount}</div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-500">New Requests</div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div>
                        <h4 className="text-xs font-medium text-slate-400 dark:text-gray-500 mb-2 flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          PENDING TRANSACTIONS ({recentMarketplaceActivity.length})
                        </h4>
                        
                        {recentMarketplaceActivity.length > 0 ? (
                          <div className={`${recentMarketplaceActivity.length > 2 ? 'max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800 scrollbar-track-slate-100 dark:scrollbar-track-gray-800' : ''} space-y-2`}>
                            {recentMarketplaceActivity.map((activity) => (
                              <div 
                                key={activity.id} 
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs p-2 bg-slate-50 dark:bg-gray-700/50 rounded-lg border border-slate-100 dark:border-gray-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 cursor-pointer transition-colors"
                                onClick={() => router.visit(`/marketplace/transaction/${activity.id}/setup`)}
                              >
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <div className="relative flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {activity.state === 'pending_request' && (
                                      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-slate-600 dark:text-gray-300 text-xs block">
                                      {activity.buyer_name ? (
                                        <>
                                          <span className="font-medium text-emerald-700 dark:text-emerald-400">{activity.buyer_name}</span>
                                          {' requested '}
                                          <span className="font-medium">{activity.quantity || 1}</span>
                                          {' swine'}
                                        </>
                                      ) : (
                                        `New request on listing #${activity.listing_id}`
                                      )}
                                    </span>
                                    {activity.amount && (
                                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">
                                        ₱{activity.amount.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                                  <span className="text-[10px] text-slate-400 dark:text-gray-500 whitespace-nowrap">
                                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                  </span>
                                  {activity.state && (
                                    <Badge variant="outline" className={`
                                      text-[8px] px-1 py-0 h-4 leading-3 whitespace-nowrap
                                      ${activity.state === 'pending_request' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' : ''}
                                      ${activity.state === 'seller_review' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : ''}
                                      ${activity.state === 'seller_approved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : ''}
                                    `}>
                                      {activity.state.replace('_', ' ').substring(0, 8)}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-slate-400 dark:text-gray-500 bg-slate-50/50 dark:bg-gray-700/30 rounded-lg">
                            <ShoppingBag className="h-5 w-5 mx-auto mb-1 opacity-30" />
                            <p className="text-xs">No pending transactions</p>
                          </div>
                        )}

                        {/* State Summary Badges */}
                        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-gray-700">
                          <div className="flex flex-wrap gap-1">
                            {stats.pendingRequestCount > 0 && (
                              <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-[10px] px-1.5 py-0">
                                ⏳ {stats.pendingRequestCount} new
                              </Badge>
                            )}
                            {stats.sellerReviewCount > 0 && (
                              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] px-1.5 py-0">
                                👁️ {stats.sellerReviewCount}
                              </Badge>
                            )}
                            {stats.sellerApprovedCount > 0 && (
                              <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] px-1.5 py-0">
                                ✓ {stats.sellerApprovedCount}
                              </Badge>
                            )}
                            {stats.buyerConfirmedCount > 0 && (
                              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-[10px] px-1.5 py-0">
                                🤝 {stats.buyerConfirmedCount}
                              </Badge>
                            )}
                            {stats.inProgressCount > 0 && (
                              <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-[10px] px-1.5 py-0">
                                🔄 {stats.inProgressCount}
                              </Badge>
                            )}
                            {stats.completedCount > 0 && (
                              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] px-1.5 py-0">
                                ✅ {stats.completedCount}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400 dark:text-gray-500">Integrated with Livestock Management</span>
                            <Button variant="ghost" size="sm" className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-0 h-auto" asChild>
                              <Link href="/marketplace/seller/index">
                                View All Requests
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Service Bookings section */}
                        <div className="mt-3 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg border border-amber-200 dark:border-amber-800 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-md">
                                <Calendar className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                              </div>
                              <span className="text-xs font-medium text-amber-800 dark:text-amber-400">Service Bookings</span>
                            </div>
                            <Link
                              href="/services/provider-bookings"
                              className="text-xs text-amber-700 dark:text-amber-400 hover:text-amber-800 flex items-center gap-0.5"
                            >
                              View all
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[9px] px-1.5 py-0">
                              ⏳ {stats.totalPendingBookings}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] px-1.5 py-0">
                              ✓ {stats.totalAcceptedBookings}
                            </Badge>
                            <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] px-1.5 py-0">
                              ✅ {stats.totalCompletedBookings}
                            </Badge>
                            {stats.totalCancelledBookings > 0 && (
                              <Badge variant="outline" className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-[9px] px-1.5 py-0">
                                ✕ {stats.totalCancelledBookings}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Insurance Tab Content - Added mx-2 for spacing */}
              <TabsContent value="insurance" className="mt-0 mx-1 sm:mx-2">
                <Card className="overflow-hidden border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                  <div className="bg-emerald-500 h-1 w-full" />
                  <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-base text-slate-800 dark:text-gray-200">Insurance System</CardTitle>
                          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px]">
                            PCIC Integrated
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-slate-500 dark:text-gray-400">Livestock insurance and veterinary reports</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 px-4">
                    {/* Insurance content remains the same */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">Applications</span>
                          <FileText className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="text-xl font-bold text-emerald-800 dark:text-emerald-400">{insuranceStats.totalApplications}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[9px] px-1">
                            {insuranceStats.submittedApplications} submitted
                          </Badge>
                          <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] px-1">
                            {insuranceStats.completedApplications} completed
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">Vet Reports</span>
                          <Activity className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="text-xl font-bold text-emerald-800 dark:text-emerald-400">{insuranceStats.totalReports}</div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {insuranceStats.animalsWithReports} insured animals
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      <div 
                        className="p-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg hover:border-emerald-400 cursor-pointer transition-all group"
                        onClick={() => router.visit('/insurance/application/create')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-200 transition-colors">
                            <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-slate-700 dark:text-gray-300">New Application</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400">Apply for coverage</p>
                          </div>
                          <Badge className="bg-white dark:bg-gray-800 border-emerald-200 text-emerald-700 text-[10px]">
                            {insuranceStats.submittedApplications} pending
                          </Badge>
                        </div>
                      </div>

                      <div 
                        className="p-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg hover:border-emerald-400 cursor-pointer transition-all group"
                        onClick={() => router.visit('/veterinary-reports')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-200 transition-colors">
                            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-slate-700 dark:text-gray-300">Disease Reports</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400">View findings</p>
                          </div>
                          <Badge className="bg-white dark:bg-gray-800 border-emerald-200 text-emerald-700 text-[10px]">
                            {insuranceStats.totalReports} reports
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-gray-700 text-[10px] text-slate-500 dark:text-gray-400 flex flex-wrap gap-2">
                      <span className="font-medium text-slate-600 dark:text-gray-400">Status:</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        Submitted
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        Reviewed
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Completed
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 dark:border-gray-700 pt-3 px-4 bg-slate-50/50 dark:bg-gray-700/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                      <span className="text-xs text-slate-400 dark:text-gray-500">Connect to DA</span>
                      <Button variant="ghost" size="sm" className="text-xs text-emerald-600 dark:text-emerald-400 p-0 h-auto" asChild>
                        <Link href="/DA/personnels">
                          DA Personnel
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* CMS/Blog Tab Content - Added mx-2 for spacing */}
              <TabsContent value="cms" className="mt-0 mx-1 sm:mx-2">
                <Card className="overflow-hidden border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                  <div className="bg-emerald-500 h-1 w-full" />
                  <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Newspaper className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base text-slate-800 dark:text-gray-200">CMS/Blog System</CardTitle>
                            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px]">
                              DA Integrated
                            </Badge>
                          </div>
                          <CardDescription className="text-sm text-slate-500 dark:text-gray-400">Announcements, news, and updates</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-emerald-600 dark:text-emerald-400 p-0 h-auto" asChild>
                        <Link href="/cms/blog">
                          View All
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 px-4 space-y-3">
                    {/* CMS content remains the same */}
                    {blogPosts.latestDaPost && (
                      <div 
                        className="p-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => handleBlogPostClick(blogPosts.latestDaPost!.slug)}
                      >
                        <div className="flex gap-3">
                          {blogPosts.latestDaPost.thumbnail && (
                            <div className="relative flex-shrink-0">
                              <img 
                                src={`${blogPosts.latestDaPost.thumbnail}`}
                                alt={blogPosts.latestDaPost.title}
                                className="w-16 h-16 object-cover rounded-lg border-2 border-emerald-200 dark:border-emerald-800"
                              />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 border-0">DA Post</Badge>
                              <span className="text-[10px] text-slate-400 dark:text-gray-500">
                                {formatDistanceToNow(new Date(blogPosts.latestDaPost.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <h3 className="font-medium text-sm text-slate-800 dark:text-gray-200 line-clamp-2">{blogPosts.latestDaPost.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2 mt-1">
                              {formatContent(blogPosts.latestDaPost.content)}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Avatar className="h-4 w-4 border border-slate-200 dark:border-gray-700">
                                <AvatarFallback className="text-[8px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                  {getInitials(blogPosts.latestDaPost.author.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-[9px] text-slate-500 dark:text-gray-400 truncate">
                                {blogPosts.latestDaPost.author.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-medium text-slate-400 dark:text-gray-500 mb-1 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        LATEST COMMUNITY POSTS
                      </h4>
                      <div className="space-y-2 max-h-[250px] overflow-y-auto">
                        {blogPosts.otherPosts.slice(0, 3).map((post) => (
                          <div 
                            key={post.id}
                            className="p-2 border border-slate-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all"
                            onClick={() => handleBlogPostClick(post.slug)}
                          >
                            <div className="flex gap-2">
                              {post.thumbnail && (
                                <img 
                                  src={`${post.thumbnail}`}
                                  alt={post.title}
                                  className="w-12 h-12 object-cover rounded border border-slate-200 dark:border-gray-700 flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                  <Badge className="text-[8px] px-1 border-slate-300 text-slate-600">
                                    {post.category.name}
                                  </Badge>
                                  <span className="text-[8px] text-slate-400">
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                  </span>
                                </div>
                                <h4 className="font-medium text-xs line-clamp-2 mt-0.5 text-slate-700 dark:text-gray-300">{post.title}</h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 dark:border-gray-700 pt-3 px-4 bg-slate-50/50 dark:bg-gray-700/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                      <span className="text-[10px] text-slate-400 dark:text-gray-500">Synced with DA information system</span>
                      <Button variant="ghost" size="sm" className="text-xs text-emerald-600 dark:text-emerald-400 p-0 h-auto" asChild>
                        <Link href="/cms/blog">
                          Browse CMS
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Swine Groups & Messages */}
          <div className="space-y-4 sm:space-y-6">
            {/* Swine Groups */}
            <Card className="border-slate-200 dark:border-gray-700 pt-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="bg-emerald-500 h-1 w-full" />
              <CardHeader className="pb-2 sm:pb-3 pt-3 sm:pt-4 px-3 sm:px-4 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
                <div className="flex items-center gap-2">
                  <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base text-slate-800 dark:text-gray-200">Swine Groups</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">Your active breeding groups</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3 p-0">
                <div className={`${swineGroups.length > 4 ? 'max-h-[280px] sm:max-h-[320px] overflow-y-auto scrollbar-thin' : ''} px-3 sm:px-4`}>
                  <div className="space-y-2 sm:space-y-3 py-2 sm:py-3">
                    {swineGroups.slice(0, 4).map((group, index) => {
                      return (
                        <div key={group.id} className="p-2 border border-slate-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-xs sm:text-sm text-slate-800 dark:text-gray-200 truncate flex-1">{group.name}</h3>
                            <Badge className="text-[8px] sm:text-[9px] px-1 bg-white dark:bg-gray-800 border-slate-300 text-slate-600 ml-2 flex-shrink-0">
                              {group.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-center text-[9px] sm:text-[10px]">
                            <div>
                              <div className="font-semibold text-slate-700 dark:text-gray-300">{group.pigs_count}</div>
                              <div className="text-slate-400">Total</div>
                            </div>
                            <div>
                              <div className="font-semibold text-emerald-600">{group.male_count}</div>
                              <div className="text-slate-400">Male</div>
                            </div>
                            <div>
                              <div className="font-semibold text-emerald-600">{group.female_count}</div>
                              <div className="text-slate-400">Female</div>
                            </div>
                          </div>
                          <div className="mt-1 text-[8px] sm:text-[9px] flex items-center gap-1">
                            <span className="text-slate-400">Avg Weight:</span>
                            <span className="font-medium text-slate-700 dark:text-gray-300">{group.avg_weight} kg</span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {swineGroups.length > 4 && (
                      <div className="pt-1 pb-1">
                        <Button variant="ghost" size="sm" className="w-full text-[9px] sm:text-xs text-emerald-600 p-1 h-auto" asChild>
                          <Link href="/swine/groups">
                            <Eye className="h-3 w-3 mr-1" />
                            View all ({swineGroups.length})
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="border-slate-200 dark:border-gray-700 pt-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="bg-emerald-500 h-1 w-full" />
              <CardHeader className="pb-2 sm:pb-3 pt-3 sm:pt-4 px-3 sm:px-4 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent">
                <div className="flex items-center gap-2">
                  <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-base text-slate-800 dark:text-gray-200">Messaging Center</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">Your latest conversations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3 px-3 sm:px-4 space-y-2">
                {messages.length > 0 ? (
                  messages.slice(0, 3).map((message, index) => {
                    return (
                      <div 
                        key={message.id} 
                        className="p-2 border border-slate-200 dark:border-gray-700 rounded-lg bg-slate-50 dark:bg-gray-700/50 hover:bg-slate-100/50 cursor-pointer transition-colors"
                        onClick={() => router.visit(`/messenger?conversation=${message.id}`)}
                      >
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6 flex-shrink-0 border border-slate-200">
                            <AvatarFallback className="text-[8px] bg-emerald-100 text-emerald-700">
                              {getInitials(message.sender_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className="font-medium text-xs truncate text-slate-800 dark:text-gray-200">
                                {message.sender_name}
                              </p>
                              <span className="text-[8px] sm:text-[9px] text-slate-400 flex-shrink-0">
                                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-[8px] sm:text-[9px] text-slate-500 truncate">
                              {message.prefix}
                            </p>
                            <p className="text-[9px] sm:text-[10px] truncate mt-0.5 text-slate-600 dark:text-gray-300">
                              {message.message_preview}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-slate-400 bg-slate-50/50 rounded-lg">
                    <MessageCircle className="h-5 w-5 mx-auto mb-1 opacity-30" />
                    <p className="text-[10px] sm:text-xs">No messages yet</p>
                  </div>
                )}
              </CardContent>
              {messages.length > 0 && (
                <CardFooter className="border-t border-slate-100 dark:border-gray-700 pt-2 sm:pt-3 px-3 sm:px-4 bg-slate-50/50 dark:bg-gray-700/30">
                  <Button variant="ghost" size="sm" className="w-full text-[10px] sm:text-xs text-emerald-600 p-1 h-auto" asChild>
                    <Link href="/messenger">
                      Open Messenger
                      <MessageCircle className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
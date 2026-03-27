import React from "react";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import AppLayout from "@/layouts/marketplaceLayout";
import { type BreadcrumbItem } from "@/types";
import { PigIcon } from '@/components/icons';
import { 
  User, BookOpen, Clock, TrendingUp, MessageSquare, Star, Award, 
  Eye, ChevronRight, Calendar, FileText, 
  Users, ThumbsUp, Heart 
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "User Profile",
    href: "/marketplace/profile",
  },
];

interface ProfileProps {
  user: any;
  fullName: string;
  fullAddress: string;
  totalTransactions: number;
  totalRequests: number;
  viewerId: number;
  transactionSummary: Record<string, number>;
  isOwner: boolean;
  sharedTransactions: any[];
  sharedSummary: Record<string, number>;
  farmerBlogs: {
    id: number;
    title: string;
    slug: string;
    updated_at: string;
  }[];
  // Rating props
  averageRating: number | null;
  totalRatings: number;
  formattedRating: string;
  ratingDistribution: Record<number, number>;
  recentRatings: Array<{
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    rater_name: string;
    transaction_id: number;
  }>;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  fullName,
  fullAddress,
  totalTransactions,
  totalRequests,
  viewerId,
  transactionSummary,
  sharedTransactions,
  sharedSummary,
  farmerBlogs,
  averageRating,
  totalRatings,
  formattedRating,
  ratingDistribution,
  recentRatings,
}) => {
  const isOwner = viewerId === user.id;

  // Function to generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to generate a consistent color based on name
  const getProfileColor = (name: string) => {
    const colors = [
      'bg-green-600',
      'bg-blue-600',
      'bg-purple-600',
      'bg-amber-600',
      'bg-red-600',
      'bg-indigo-600',
      'bg-emerald-600',
      'bg-cyan-600',
      'bg-violet-600',
      'bg-orange-600',
    ];
    
    if (!name) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Function to render stars
  const renderStars = (rating: number | null, size: string = "w-4 h-4") => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-400 text-yellow-400 half-star"
                : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // Get profile image URL or use fallback
  const getProfileImage = () => {
    if (user.user_information?.profile_picture) {
      return `/storage/${user.user_information.profile_picture}`;
    }
    return null;
  };

  const profileImageUrl = getProfileImage();
  const initials = getInitials(user.name);
  const profileColor = getProfileColor(user.name);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>  
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            
            {/* LEFT COLUMN: Transactions & Summary */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              {/* Shared Transactions (Only visible to non-owners) */}
              {!isOwner && sharedTransactions.length > 0 && (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Your Connection
                      </h3>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {Object.entries(sharedSummary).map(([state, count]) => (
                        <div
                          key={state}
                          className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 
                                   border border-gray-100 dark:border-gray-700 rounded-lg p-3 text-center"
                        >
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {state.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Transactions */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Recent Transactions
                      </h4>
                      <ScrollArea className="h-[250px] pr-2">
                        <div className="space-y-3">
                          {sharedTransactions.slice(0, 5).map((tx) => {
                            const roleRoute = tx.viewer_role;
                            return (
                              <Link
                                key={tx.id}
                                href={`/marketplace/transactions/${tx.id}/${roleRoute}`}
                                className="block group"
                              >
                                <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 
                                              hover:border-green-300 dark:hover:border-green-700 
                                              hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 
                                              dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 
                                              transition-all duration-200">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                                      ₱{Number(tx.amount).toLocaleString()}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 
                                                           dark:group-hover:text-green-400" />
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {tx.listing?.title || 'No listing title'}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs px-2 py-1 rounded-full capitalize 
                                                    bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                      {tx.state.replace('_', ' ')}
                                    </span>
                                    {tx.transaction_date && (
                                      <span className="text-xs text-gray-500">
                                        {new Date(tx.transaction_date).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Owner Summary */}
              {isOwner && (
                <>
                  {/* Quick Stats */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 
                                  dark:from-gray-800 dark:to-gray-900 
                                  border border-green-100 dark:border-gray-700 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-green-200 
                                      dark:from-green-900/30 dark:to-green-800/30">
                          <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          Your Summary
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 
                                      border border-green-200 dark:border-green-800/30 
                                      shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {totalTransactions}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Transactions
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 
                                      border border-blue-200 dark:border-blue-800/30 
                                      shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {totalRequests}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Requests
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transaction Summary */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 
                                  dark:border-gray-700 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 
                                      dark:from-purple-900/30 dark:to-purple-800/30">
                          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          Transaction Summary
                        </h3>
                      </div>

                      <ScrollArea className="h-[300px] pr-2">
                        <div className="space-y-2">
                          {Object.entries(transactionSummary)
    .filter(([_, count]) => count > 0)
    .map(([state, count]) => {
        let tab = "progress";
        
        // 🔥 UPDATED: Check for both "completed" and "done"
        if (state.toLowerCase() === "completed" || state.toLowerCase() === "done") {
            tab = "completed";
        } 
        else if (state.toLowerCase() === "cancelled") {
            tab = "cancelled";
        }

        const badgeColor = (() => {
            switch (state.toLowerCase().replace(/\s+/g, "_")) {
                case "pending_request":
                    return "from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-yellow-200 dark:border-yellow-800/30";
                case "seller_review":
                    return "from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-200 dark:border-blue-800/30";
                case "seller_approved":
                    return "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/30";
                case "buyer_confirmed":
                    return "from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-200 dark:border-indigo-800/30";
                case "in_progress":
                    return "from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200 dark:border-purple-800/30";
                case "completed":
                    return "from-green-100 to-emerald-100 dark:from-green-800/20 dark:to-emerald-800/20 border-green-300 dark:border-green-700/30";
                case "done":  // ✅ Added "done" case
                    return "from-green-100 to-emerald-100 dark:from-green-800/20 dark:to-emerald-800/20 border-green-300 dark:border-green-700/30";
                case "cancelled":
                    return "from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 border-red-200 dark:border-red-800/30";
                case "expired":
                    return "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-200 dark:border-gray-700";
                default:
                    return "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-200 dark:border-gray-700";
            }
        })();

        return (
            <div
                key={state}
                onClick={() => router.visit(`/marketplace/buyer/transactions?tab=${tab}`)}
                className={`bg-gradient-to-r ${badgeColor} 
                           rounded-xl p-3 cursor-pointer 
                           hover:shadow-md transition-all duration-200 
                           hover:scale-[1.02] group`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 
                                      flex items-center justify-center 
                                      group-hover:scale-110 transition-transform">
                            <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                {count}
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                            {state.replace(/_/g, ' ')}
                        </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 
                                           dark:group-hover:text-green-400" />
                </div>
            </div>
        );
    })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* MIDDLE COLUMN: Profile Information */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 
                              dark:border-gray-700 shadow-xl overflow-hidden">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  {/* Profile Header */}
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      {profileImageUrl ? (
                        <div className="relative">
                          <img
                            src={profileImageUrl}
                            alt="Profile Picture"
                            className="w-32 h-32 rounded-full object-cover border-4 
                                     border-green-300 dark:border-green-700 shadow-xl"
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
                          <div 
                            className={`${profileColor} profile-fallback hidden 
                                      w-32 h-32 rounded-full border-4 border-green-300 
                                      dark:border-green-700 items-center justify-center 
                                      shadow-xl`}
                          >
                            <span className="text-3xl font-bold text-white">
                              {initials}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className={`${profileColor} w-32 h-32 rounded-full border-4 
                                    border-green-300 dark:border-green-700 
                                    flex items-center justify-center shadow-xl`}
                        >
                          <span className="text-3xl font-bold text-white">
                            {initials}
                          </span>
                        </div>
                      )}
                      
                      {/* Verified Badge */}
                      <div className="absolute bottom-2 right-2 w-7 h-7 
                                    bg-gradient-to-r from-green-500 to-emerald-500 
                                    dark:from-green-400 dark:to-emerald-400 
                                    rounded-full border-3 border-white dark:border-gray-800 
                                    flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-3 mb-6">
                      <h2 className="font-bold text-2xl lg:text-3xl text-gray-900 dark:text-white">
                        {user.name}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {fullName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {user.email}
                      </p>
                      
                      {/* Farmer Rating Display */}
                      {totalRatings > 0 && (
                        <div className="flex flex-col items-center gap-2 pt-2">
                          <div className="flex items-center gap-2">
                            {renderStars(averageRating, "w-5 h-5")}
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {averageRating?.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formattedRating}
                          </div>
                        </div>
                      )}
                      
                      {/* Contact */}
                      {user.user_information?.contact && (
                        <div className="flex items-center justify-center gap-2">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {user.user_information.contact}
                          </span>
                        </div>
                      )}

                      {/* Address */}
                      <div className="max-w-md">
                        <div className="flex items-start justify-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                            {fullAddress || "No address available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Edit Profile Button */}
                    {isOwner && (
                      <Link
                        href="/marketplace/profileshow"
                        className="inline-flex items-center gap-2 
                                 bg-gradient-to-r from-green-600 to-emerald-600 
                                 hover:from-green-700 hover:to-emerald-700 
                                 dark:from-green-700 dark:to-emerald-700 
                                 dark:hover:from-green-600 dark:hover:to-emerald-600 
                                 text-white px-6 py-3 rounded-xl font-medium 
                                 transition-all duration-200 shadow-lg hover:shadow-xl 
                                 hover:scale-[1.02]"
                      >
                        <User className="w-5 h-5" />
                        {user.user_information ? "Edit Profile" : "Complete Profile"}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Rating Distribution Card */}
              {totalRatings > 0 && (
                <Card className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 
                                dark:border-gray-700 shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-200 
                                    dark:from-yellow-900/30 dark:to-amber-800/30">
                        <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Rating Distribution
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingDistribution[star] || 0;
                        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                        
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {star} ★
                              </span>
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="w-12 text-right">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* RIGHT COLUMN: Listings, Farmer Tips & Recent Ratings */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              {/* Listings Card */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 
                              dark:border-gray-700 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 
                                  dark:from-orange-900/30 dark:to-orange-800/30">
                      <PigIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {isOwner ? "Your Listings" : `${user.name}'s Listings`}
                    </h3>
                  </div>

                  {user.role === 'farmer' || user.userInformation?.is_farmer ? (
                    <>
                      {user.marketplace_listings?.length > 0 ? (
                        <ScrollArea className="h-[300px] pr-2">
                          <div className="space-y-3">
                            {user.marketplace_listings.slice(0, 5).map((listing: any) => (
                              <Link
                                key={listing.id}
                                href={isOwner ? `/marketplace/seller/${listing.id}/edit` : `/marketplace/${listing.id}`}
                                className="block group"
                              >
                                <div className="flex items-center gap-3 p-3 rounded-xl border 
                                              border-gray-100 dark:border-gray-700 
                                              hover:border-green-300 dark:hover:border-green-700 
                                              hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 
                                              dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 
                                              transition-all duration-200">
                                  {/* Listing Image */}
                                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                    <img
                                      src={listing.image ? `/storage/${listing.image}` : "/storage/listings/default.png"}
                                      alt={listing.title || "Listing"}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>

                                  {/* Listing Details */}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white 
                                                  truncate mb-1">
                                      {listing.title || listing.description || "Untitled Listing"}
                                    </h4>
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-green-600 dark:text-green-400 text-sm">
                                        ₱{Number(listing.price_per_unit).toLocaleString()}
                                      </span>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Eye className="w-3 h-3" />
                                        <span>{listing.listing_swine?.length ?? 0}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-3 
                                        bg-gray-100 dark:bg-gray-700 rounded-full 
                                        flex items-center justify-center">
                            <PigIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            No listings available
                          </p>
                          {isOwner && (
                            <Link
                              href="/marketplace/seller/create"
                              className="inline-flex items-center gap-2 
                                       bg-green-600 hover:bg-green-700 dark:bg-green-700 
                                       dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg 
                                       text-sm font-medium"
                            >
                              Create Your First Listing
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Non-farmer CTA */
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 
                                  dark:from-yellow-900/10 dark:to-amber-900/10 
                                  border border-yellow-200 dark:border-yellow-800/30 
                                  rounded-xl p-6 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full 
                                    bg-gradient-to-br from-yellow-200 to-amber-200 
                                    dark:from-yellow-800/30 dark:to-amber-800/30 
                                    flex items-center justify-center">
                        <PigIcon className="w-8 h-8 text-yellow-700 dark:text-yellow-400" />
                      </div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Become a Livestock Hog Raiser
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Register as a farmer to access government programs, manage livestock, 
                        and sell on our platform.
                      </p>
                      <Link
                        href="/user-informations/create"
                        className="inline-flex items-center gap-2 
                                 bg-gradient-to-r from-yellow-500 to-amber-500 
                                 hover:from-yellow-600 hover:to-amber-600 
                                 dark:from-yellow-600 dark:to-amber-600 
                                 dark:hover:from-yellow-500 dark:hover:to-amber-500 
                                 text-white px-6 py-3 rounded-lg font-medium 
                                 shadow-md hover:shadow-lg transition-all"
                      >
                        Register Now
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Ratings Card */}
              {recentRatings.length > 0 && !isOwner && (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 
                                dark:border-gray-700 shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 
                                    dark:from-purple-900/30 dark:to-pink-800/30">
                        <ThumbsUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Recent Reviews
                      </h3>
                    </div>

                    <ScrollArea className="h-[300px] pr-2">
                      <div className="space-y-3">
                        {recentRatings.map((rating) => (
                          <div
                            key={rating.id}
                            className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 
                                     bg-gradient-to-r from-gray-50 to-white 
                                     dark:from-gray-800/50 dark:to-gray-800"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 
                                              dark:from-green-900/30 dark:to-emerald-800/30 
                                              flex items-center justify-center">
                                  <span className="text-xs font-bold text-green-700 dark:text-green-400">
                                    {rating.rater_name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {rating.rater_name}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    {renderStars(rating.rating, "w-3 h-3")}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(rating.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            {rating.comment && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-10">
                                "{rating.comment}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {/* Farmer Tips & Posts - Enhanced Section */}
              {farmerBlogs?.length > 0 && (
                <Card className="bg-gradient-to-b from-white to-gray-50 
                                dark:from-gray-800 dark:to-gray-900 
                                border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-200 
                                    dark:from-emerald-900/30 dark:to-teal-800/30">
                        <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          Farmer Tips & Posts
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Latest insights from {user.name}
                        </p>
                      </div>
                    </div>

                    {/* Scrollable Tips */}
                    <ScrollArea className="h-[350px] pr-2">
                      <div className="space-y-3">
                        {farmerBlogs.map((post) => {
                          const daysAgo = Math.floor(
                            (new Date().getTime() - new Date(post.updated_at).getTime()) / (1000 * 3600 * 24)
                          );
                          const getTimeLabel = () => {
                            if (daysAgo === 0) return "Today";
                            if (daysAgo === 1) return "Yesterday";
                            if (daysAgo < 7) return `${daysAgo} days ago`;
                            if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
                            return `${Math.floor(daysAgo / 30)} months ago`;
                          };

                          return (
                            <Link
                              key={post.id}
                              href={`/cms/blog/${post.slug}`}
                              className="block group"
                            >
                              <div className="bg-gradient-to-r from-gray-50 to-white 
                                            dark:from-gray-800 dark:to-gray-900 
                                            border border-gray-100 dark:border-gray-700 
                                            rounded-xl p-4 hover:border-emerald-300 
                                            dark:hover:border-emerald-700 
                                            hover:shadow-md transition-all duration-200 
                                            hover:scale-[1.01]">
                                {/* Post Title with Read Time */}
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white 
                                                group-hover:text-emerald-600 dark:group-hover:text-emerald-400 
                                                line-clamp-2 flex-1">
                                    {post.title}
                                  </h4>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 
                                                dark:text-gray-400 ml-2 flex-shrink-0">
                                    <Clock className="w-3 h-3" />
                                    <span>{getTimeLabel()}</span>
                                  </div>
                                </div>

                                {/* Post Meta */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 
                                                  dark:text-gray-400">
                                      <Calendar className="w-3 h-3" />
                                      <span>{new Date(post.updated_at).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-400 
                                                         group-hover:text-emerald-500 
                                                         dark:group-hover:text-emerald-400 
                                                         transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </ScrollArea>

                    {/* View All Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href="/cms/blog"
                        className="inline-flex items-center justify-center gap-2 
                                 w-full bg-gradient-to-r from-emerald-50 to-teal-50 
                                 dark:from-emerald-900/20 dark:to-teal-900/20 
                                 hover:from-emerald-100 hover:to-teal-100 
                                 dark:hover:from-emerald-800/30 dark:hover:to-teal-800/30 
                                 border border-emerald-200 dark:border-emerald-800/30 
                                 text-emerald-700 dark:text-emerald-300 
                                 rounded-lg px-4 py-2.5 text-sm font-medium 
                                 transition-all hover:shadow-sm"
                      >
                        <BookOpen className="w-4 h-4" />
                        View All Posts
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Add missing icon components
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Profile;
import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin,  Search, Filter, Store, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { route } from "ziggy-js";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import AppLayout from "@/layouts/marketplaceLayout";
import { type BreadcrumbItem } from "@/types";
import { PigIcon } from "@/components/icons";
import MarketplaceIntroLoader from "@/components/MarketplaceIntroLoader";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "#" },
  { title: "Marketplace", href: "/marketplace" }
];

export default function MarketplaceIndex() {
  const { props }: any = usePage();
  const { listings, filters, search, provinces, municipals, barangays, totalAvailableSwine, totalFarmers } = props;
  
  useEffect(() => {
    window.Echo.channel("test-channel")
      .listen(".test.event", (e: any) => {
        console.log("📡 Event received:", e.message);
      });
  }, []);
  
  useEffect(() => {
    const channel = window.Echo.channel('test-channel');
    channel.listen('.test.event', (data: any) => {
      console.log('📡 Received broadcast:', data.message);
      alert(`Received from Reverb: ${data.message}`);
    });
    return () => {
      channel.stopListening('.test.event');
    };
  }, []);

  const [filter, setFilter] = useState({
    province_id: filters?.province_id || "",
    municipal_id: filters?.municipal_id || "",
    barangay_id: filters?.barangay_id || "",
    category: filters?.category || "",
    min_price: filters?.min_price || "",
    max_price: filters?.max_price || "",
  });

  const [searchTerm, setSearchTerm] = useState(search || "");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>(listings || []);
  const [offset, setOffset] = useState<number>(listings?.length || 0);
  const [hasMore, setHasMore] = useState(props.hasMore);
  const [loading, setLoading] = useState(false);

  const fetchListings = async (resetOffset = true) => {
    try {
      const response = await axios.get(route("marketplace.index"), {
        params: {
          ...filter,
          search: searchTerm,
          offset: resetOffset ? 0 : offset,
          limit: 15,
        },
      });

      const newListings = response.data.props.listings;
      setItems((prev) => {
        if (resetOffset) return newListings;
        const combined = [...prev, ...newListings];
        const unique = combined.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );
        return unique;
      });

      setHasMore(response.data.props.hasMore);
      setOffset((prev) =>
        resetOffset ? newListings.length : prev + newListings.length
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchListings(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings(true);
  };

  const handleClearFilters = () => {
    const cleared = {
      province_id: "",
      municipal_id: "",
      barangay_id: "",
      category: "",
      min_price: "",
      max_price: "",
    };
    setFilter(cleared);
    setSearchTerm("");
    fetchListings(true);
  };

  const formatAddress = (listing: any) => {
    const parts = [
      listing.street,
      listing.purok ? `Purok ${listing.purok}` : null,
      listing.barangay?.name,
      listing.municipal?.name,
      listing.province?.name,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    await fetchListings(false);
    setLoading(false);
  };

  const loaderRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  // Function to render star rating
  // Function to render star rating
const renderStars = (rating: number | string | null | undefined) => {
  if (!rating) return null;
  
  // Convert to number if it's a string
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  
  // Check if it's a valid number
  if (isNaN(numericRating) || numericRating === 0) return null;
  
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 half-star"
              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
        ({numericRating.toFixed(1)})
      </span>
    </div>
  );
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <MarketplaceIntroLoader />
      <Head title="Marketplace" />
      
      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

        {/* Sidebar for md+ */}
        <div className="flex flex-col md:flex-row min-h-screen">
          <aside className="hidden md:flex md:flex-col w-64 p-5 
                            bg-gradient-to-b from-green-800 via-green-700 to-green-900 
                            dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 
                            shadow-xl border-r border-green-600/30 dark:border-gray-700 
                            sticky sm:top-[48px] h-screen transition-colors duration-300">
            
            <div className="mb-6">
              <h2 className="font-semibold text-xl text-white mb-2 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Listings
              </h2>
              <p className="text-sm text-green-100/80 dark:text-gray-300">
                Narrow down your search
              </p>
            </div>

            {/* Barangay Filter */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white dark:text-gray-200 mb-2 block">
                  Barangay
                </label>
                <Select
                  value={filter.barangay_id}
                  onValueChange={(val) => setFilter({ ...filter, barangay_id: val })}
                >
                  <SelectTrigger className="bg-white/10 border-green-500/30 text-white 
                                           placeholder:text-green-200/60 
                                           dark:bg-gray-800/50 dark:border-gray-600">
                    <SelectValue placeholder="Select Barangay" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-green-200 
                                           dark:border-gray-700">
                    {barangays?.map((b: any) => (
                      <SelectItem 
                        key={b.id} 
                        value={b.id.toString()}
                        className="hover:bg-green-50 dark:hover:bg-gray-700"
                      >
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-white dark:text-gray-200 mb-2 block">
                  Category
                </label>
                <Select 
                  value={filter.category} 
                  onValueChange={(val) => setFilter({ ...filter, category: val })}
                >
                  <SelectTrigger className="bg-white/10 border-green-500/30 text-white 
                                           placeholder:text-green-200/60 
                                           dark:bg-gray-800/50 dark:border-gray-600">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-green-200 
                                           dark:border-gray-700">
                    <SelectItem value="Piglet" className="hover:bg-green-50 dark:hover:bg-gray-700">Piglet</SelectItem>
                    <SelectItem value="Fattening" className="hover:bg-green-50 dark:hover:bg-gray-700">Fattening</SelectItem>
                    <SelectItem value="Breeder" className="hover:bg-green-50 dark:hover:bg-gray-700">Breeder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium text-white dark:text-gray-200 mb-2 block">
                  Price Range
                </label>
                <div className="space-y-2">
                  <Input 
                    placeholder="Min Price" 
                    value={filter.min_price}
                    onChange={(e) => setFilter({ ...filter, min_price: e.target.value })}
                    className="bg-white/10 border-green-500/30 text-white placeholder:text-green-200/60
                              dark:bg-gray-800/50 dark:border-gray-600 dark:placeholder:text-gray-400"
                  />
                  <Input 
                    placeholder="Max Price" 
                    value={filter.max_price}
                    onChange={(e) => setFilter({ ...filter, max_price: e.target.value })}
                    className="bg-white/10 border-green-500/30 text-white placeholder:text-green-200/60
                              dark:bg-gray-800/50 dark:border-gray-600 dark:placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Clear Filters Button */}
              <Button 
                className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border border-white/30
                          dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:border-gray-600 
                          transition-all duration-200"
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {/* Sticky Search Bar */}
            <form
              onSubmit={handleSearch}
              className="sticky sm:top-[48px] top-[32px] z-40 
                        bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg 
                        border-b border-gray-200/50 dark:border-gray-700/50 
                        p-4 shadow-sm transition-colors duration-300"
            >
              <div className="max-w-7xl mx-auto flex gap-3 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                   text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <Input
                    placeholder="Search by breed, location, or farmer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 
                              dark:border-gray-700 focus:border-green-500 
                              focus:ring-green-500/20 dark:focus:ring-green-500/30"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 
                            dark:hover:bg-green-600 text-white transition-colors duration-200 
                            px-6 shadow-md"
                >
                  Search
                </Button>

                {/* Mobile Filter Button */}
                <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="md:hidden bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 
                                dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 
                                border-gray-300 dark:border-gray-600"
                      variant="outline"
                      size="icon"
                    >
                      <Filter className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-sm bg-white dark:bg-gray-800 
                                            border-gray-200 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        <Filter className="inline w-5 h-5 mr-2" />
                        Filter Options
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Barangay
                        </label>
                        <Select
                          value={filter.barangay_id}
                          onValueChange={(val) => setFilter({ ...filter, barangay_id: val })}
                        >
                          <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                            <SelectValue placeholder="Select Barangay" />
                          </SelectTrigger>
                          <SelectContent>
                            {barangays?.map((b: any) => (
                              <SelectItem key={b.id} value={b.id.toString()}>
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Category
                        </label>
                        <Select
                          value={filter.category}
                          onValueChange={(val) => setFilter({ ...filter, category: val })}
                        >
                          <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Piglet">Piglet</SelectItem>
                            <SelectItem value="Fattening">Fattening</SelectItem>
                            <SelectItem value="Breeder">Breeder</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Price Range
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Min"
                            value={filter.min_price}
                            onChange={(e) => setFilter({ ...filter, min_price: e.target.value })}
                          />
                          <Input
                            placeholder="Max"
                            value={filter.max_price}
                            onChange={(e) => setFilter({ ...filter, max_price: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4"
                        variant="outline"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </form>

            {/* Marketplace Overview Card with Stats */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 ">
              <Card className="rounded-2xl overflow-hidden p-0
                              bg-gradient-to-br from-white via-green-50/50 to-white
                              dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900
                              border border-green-100/50 dark:border-gray-700
                              shadow-lg shadow-green-100/20 dark:shadow-gray-900/30
                              transition-all duration-300 hover:shadow-xl">
                <div className="p-2 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 
                                      bg-gradient-to-br from-green-100 to-green-200 
                                      dark:from-green-900/30 dark:to-green-800/30 
                                      rounded-2xl p-4 shadow-inner">
                        <img
                          src="/marketplace.png"
                          alt="Marketplace"
                          className="w-full h-full object-contain transform hover:scale-105 
                                     transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 bg-green-100/80 dark:bg-green-900/30 
                                      text-green-800 dark:text-green-300 px-4 py-2 rounded-full mb-4">
                        <Store className="w-5 h-5" />
                        <span className="text-sm font-semibold">SWINE MARKETPLACE</span>
                      </div>
                      
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Discover Quality Swine
                      </h1>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                        Connect directly with verified farmers. Browse available piglets, 
                        fattening pigs, and breeders in your area with transparent pricing 
                        and detailed listings.
                      </p>

                      {/* Stats - Updated with dynamic data */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 
                                        px-4 py-3 rounded-xl shadow-sm">
                          <PigIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {totalAvailableSwine || 0}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Available Swine
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 
                                        px-4 py-3 rounded-xl shadow-sm">
                          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {totalFarmers || 0}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Active Farmers
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Listings Grid */}
            <div className="px-2 sm:px-6 lg:px-8 pb-12 flex-1">
              {items.length > 0 ? (
                <div
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 
                             gap-2 sm:gap-6 auto-rows-fr"
                >
                  {items.map((listing: any) => (
                    <Card
                      key={listing.id}
                      className="relative group h-full rounded-2xl overflow-hidden 
                                 bg-white dark:bg-gray-800 
                                 border border-gray-200 dark:border-gray-700
                                 shadow-sm hover:shadow-xl 
                                 transition-all duration-300 
                                 hover:border-green-300 dark:hover:border-green-700
                                 hover:scale-[1.02] py-0 cursor-pointer"
                    >
                      {/* Clickable Card Body */}
                      <div
                        onClick={() =>
                          router.get(route("marketplace.show", listing.id))
                        }
                        className="h-full"
                      >
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                          <img
                            src={
                              listing.image
                                ? `/storage/${listing.image}`
                                : "/storage/listings/default.png"
                            }
                            alt={listing.title || "Listing Image"}
                            className="w-full h-full object-cover 
                                       group-hover:scale-105 
                                       transition-transform duration-500"
                          />

                          {/* Available Quantity Badge */}
                          <div
                            className="absolute top-3 right-3 
                                       bg-green-600/90 dark:bg-green-700/90 
                                       text-white text-xs font-semibold 
                                       px-3 py-1 rounded-full backdrop-blur-sm"
                          >
                            {listing.available_quantity} available
                          </div>

                          {/* Category Badge */}
                          <div
                            className="absolute bottom-3 left-3 
                                       bg-black/60 backdrop-blur-sm
                                       text-white text-xs font-semibold 
                                       px-3 py-1.5 rounded-lg"
                          >
                            {listing.category}
                          </div>
                        </div>

                        {/* Content - Title removed as requested */}
                        <div className="p-2 sm:p-3 flex flex-col h-[calc(100%-12rem)]">
                          {/* Breed and Rating */}
                          <div className="mb-3">
                            {listing.breed && (
                              <div
                                className="inline-flex items-center gap-1 
                                           bg-green-50 dark:bg-green-900/30 
                                           text-green-800 dark:text-green-300 
                                           px-2 py-1 rounded text-xs mb-2"
                              >
                                <PigIcon className="w-3 h-3" />
                                <span className="italic">{listing.breed}</span>
                              </div>
                            )}
                            
                            {/* Farmer Rating Display */}
                            {listing.seller?.formatted_rating && (
                              <div className="flex items-center gap-1 mt-1">
                                {/* {renderStars(listing.seller.average_rating)} */}
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {listing.seller.formatted_rating} for Farmer
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p
                            className="text-sm text-gray-600 dark:text-gray-300 
                                       line-clamp-2 mb-4 flex-grow"
                          >
                            {listing.description || "No description available"}
                          </p>

                          {/* Price + Location */}
                          <div className="mt-auto space-y-3">
                            {/* Price */}
                            <div>
                              <span
                                className="text-2xl font-bold 
                                           text-green-700 dark:text-green-400"
                              >
                                ₱{Number(listing.price_per_unit).toLocaleString()}
                              </span>

                              <span
                                className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                              >
                                {" "}
                                {listing.price_unit_type?.replace(/_/g, " ") ||
                                  "unit"}
                              </span>
                            </div>

                            {/* Location */}
                            <div
                              className="flex items-center gap-2 text-sm 
                                         text-gray-500 dark:text-gray-400 
                                         pt-3 border-t border-gray-100 
                                         dark:border-gray-700"
                            >
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="line-clamp-1 text-xs">
                                {formatAddress(listing)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seller Badge with Rating */}
                      {listing.seller?.name && (
                        <Link
                          href={route(
                            "marketplace.profile.show",
                            listing.seller.id
                          )}
                          className="absolute top-3 left-3 z-20
                                     bg-white/95 dark:bg-gray-800/95 
                                     backdrop-blur-sm
                                     text-gray-800 dark:text-white 
                                     text-xs font-medium px-3 py-2 
                                     rounded-full shadow-md 
                                     flex flex-col gap-0.5
                                     max-w-[80%]
                                     hover:text-green-600 
                                     dark:hover:text-green-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="truncate hover:underline font-semibold">
                              {listing.seller.name}
                            </span>
                          </div>
                          {listing.seller.formatted_rating && listing.seller.formatted_rating !== 'No ratings yet' && (
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                              {renderStars(listing.seller.average_rating)}
                            </div>
                          )}
                        </Link>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-64 h-64 mb-6 opacity-50 dark:opacity-30">
                    <img
                      src="/marketplace.png"
                      alt="No Listings"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2">
                    No listings found
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Try adjusting your filters or search keywords.
                    <br />
                    Check back later for new listings!
                  </p>

                  <Button
                    className="mt-6 bg-green-600 hover:bg-green-700 
                               dark:bg-green-700 dark:hover:bg-green-600"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Infinite Scroll Loader */}
              {loading && (
                <div className="text-center py-8">
                  <div
                    className="inline-block animate-spin rounded-full h-8 w-8 
                               border-b-2 border-green-600 dark:border-green-400"
                  ></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Loading more listings...
                  </p>
                </div>
              )}

              <div ref={loaderRef} className="h-10" />
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
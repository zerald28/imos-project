import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, PiggyBank, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { route } from "ziggy-js";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";

export default function MarketplaceIndex() {
  const { props }: any = usePage();
  const { listings, filters, search, provinces, municipals, barangays } = props;

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

  // 🧭 Auto-refresh listings when filters change
  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasActiveFilter = Object.values(filter).some((v) => v !== "");
      if (hasActiveFilter) {
        router.visit(route("marketplace.index"), {
          data: { ...filter, search: searchTerm },
          preserveScroll: true,
          preserveState: true,
          replace: true,
        });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [filter]);

  // 🔍 Search manually triggered
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(route("marketplace.index"), {
      data: { ...filter, search: searchTerm },
      preserveScroll: true,
      preserveState: true,
    });
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

    // 🔁 Reset listings
    if (!searchTerm) {
      router.visit(route("marketplace.index"), {
        data: {},
        preserveScroll: true,
        preserveState: true,
      });
    } else {
      // keep search term if not empty
      router.visit(route("marketplace.index"), {
        data: { search: searchTerm },
        preserveScroll: true,
        preserveState: true,
      });
    }
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

  return (
    <>
      <Head title="Marketplace" />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* Sidebar for md+ */}
        <aside className="hidden md:flex md:flex-col w-64 p-5 bg-white dark:bg-gray-800 shadow-md border-r border-gray-200 sticky top-0 h-screen">
          <h2 className="font-semibold text-lg mb-4">Filter Listings</h2>

         <label className="text-sm font-medium mb-1 block">Barangay</label>
  <Select
    value={filter.barangay_id}
    onValueChange={(val) => setFilter({ ...filter, barangay_id: val })}
  >
    <SelectTrigger><SelectValue placeholder="Select Barangay" /></SelectTrigger>
    <SelectContent>
      {barangays?.map((b: any) => (
        <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>

          {/* Category */}
          <label className="text-sm font-medium mb-1 block mt-3">Category</label>
          <Select value={filter.category} onValueChange={(val) => setFilter({ ...filter, category: val })}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Piglet">Piglet</SelectItem>
              <SelectItem value="Fattening">Fattening</SelectItem>
              <SelectItem value="Breeder">Breeder</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Price Range</label>
            <div className="flex gap-2">
              <Input placeholder="Min" value={filter.min_price} onChange={(e) => setFilter({ ...filter, min_price: e.target.value })} />
              <Input placeholder="Max" value={filter.max_price} onChange={(e) => setFilter({ ...filter, max_price: e.target.value })} />
            </div>
          </div>

          <Button className="w-full mt-4" variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 flex flex-col">
          {/* Floating / sticky search bar for small screens */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6 sticky top-0 z-50 bg-gray-50 dark:bg-gray-900 p-2 md:p-0 md:static shadow md:shadow-none rounded md:rounded-none">
            <Input
              placeholder="Search by title, breed, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="bg-sidebar text-white flex items-center gap-1">
              <Search className="h-4 w-4" /> Search
            </Button>

            {/* Floating filter button for small screens */}
            <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
              <DialogTrigger asChild>
                <Button className="md:hidden ml-2 flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                {/* Include same filter inputs as sidebar */}
                <label className="text-sm font-medium mb-1 block mt-3">Barangay</label>
                <Select value={filter.barangay_id} onValueChange={(val) => setFilter({ ...filter, barangay_id: val })}>
                  <SelectTrigger><SelectValue placeholder="Select Barangay" /></SelectTrigger>
                  <SelectContent>
                    {barangays?.map((b: any) => (
                      <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="text-sm font-medium mb-1 block mt-3">Category</label>
                <Select value={filter.category} onValueChange={(val) => setFilter({ ...filter, category: val })}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Piglet">Piglet</SelectItem>
                    <SelectItem value="Fattening">Fattening</SelectItem>
                    <SelectItem value="Breeder">Breeder</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-4">
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" value={filter.min_price} onChange={(e) => setFilter({ ...filter, min_price: e.target.value })} />
                    <Input placeholder="Max" value={filter.max_price} onChange={(e) => setFilter({ ...filter, max_price: e.target.value })} />
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
              </DialogContent>
            </Dialog>
          </form>

          {/* Scrollable listing grid */}
          <div className="overflow-y-auto flex-1">
            {listings.data.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {listings.data.map((listing: any) => (
                  <Link key={listing.id} href={route("marketplace.show", listing.id)}>
                    <Card className="rounded-2xl overflow-hidden hover:shadow-lg">
                      <img
                        src={listing.image ? `/storage/${listing.image}` : "/images/default-listing.jpg"}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold">{listing.breed}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                        <div className="text-green-700 font-bold mt-1">₱{listing.price_per_unit}</div>
                        <div className="text-xs text-gray-500">{formatAddress(listing)}</div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
                <img src="/images/empty-state.svg" alt="No Listings" className="w-40 h-40 mb-4 opacity-70"/>
                <h2 className="text-lg font-semibold text-gray-300">No listings found</h2>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search keyword.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

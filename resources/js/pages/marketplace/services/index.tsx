import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { route } from "ziggy-js";
import ServiceDetailsModal from "./servicedetailmodal";
import BookingConfirmationModal from "./BookingConfirmationModal";
import { Toaster } from "sonner";
import { toast } from "sonner";

import { 
  MapPin, 
  Phone, 
  User, 
  Search, 
  Filter,
  Clock,
  Edit,
  Star,
  Calendar,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/marketplaceLayout";

interface Props {
  services: {
    data: Array<{
      id: number;
      title: string;
      description: string;
      category: string;
      price: number;
      location: string;
      average_rating?: number;
      ratings_count?: number;
      has_pending_booking?: boolean;
      can_rate?: boolean;
      pending_rating_booking_id?: number;
      user_rating?: {
        id: number;
        rating: number;
        comment: string;
        booking_id?: number;
      } | null;
      blog_post?: {
        id: number;
        title: string;
        slug: string;
        thumbnail?: string | null;
      } | null;
      user: {
        id: number;
        name: string;
        contact?: string;
        profile_picture?: string | null;
        userInformation?: {
          contact: string;
          profile_picture?: string;
        };
      };
    }>;
    links: any[];
    meta?: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
  filters: {
    search?: string;
    location?: string;
  };
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };
}

const IndexServices: React.FC<Props> = ({ services, filters, auth }) => {
  const [search, setSearch] = useState(filters.search || "");
  const [location, setLocation] = useState(filters.location || "");
  const [bookingServiceId, setBookingServiceId] = useState<number | null>(null);
  const [ratingService, setRatingService] = useState<Props['services']['data'][0] | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);
  const [localServices, setLocalServices] = useState(services.data);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.get(route("marketplace.services.index"), { search, location });
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    Inertia.get(route("marketplace.services.index"));
  };

  const handleRatingSubmit = async () => {
    if (ratingValue === 0 || !ratingService?.pending_rating_booking_id) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmittingRating(true);
    try {
      const response = await fetch(route('marketplace.services.ratings.store'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          booking_id: ratingService.pending_rating_booking_id,
          rating: ratingValue,
          comment: ratingComment
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(errorData.message || 'Failed to submit rating');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message || 'Thank you for your rating!', {
          duration: 4000,
          description: ratingComment ? `Your ${ratingValue}-star rating has been submitted` : undefined
        });

        setRatingService(null);
        setRatingValue(0);
        setRatingComment("");
        
        setLocalServices(prevServices => 
          prevServices.map(s => 
            s.id === ratingService.id 
              ? { 
                  ...s, 
                  user_rating: { 
                    id: data.rating.id, 
                    rating: ratingValue, 
                    comment: ratingComment,
                    booking_id: ratingService.pending_rating_booking_id
                  },
                  can_rate: false
                }
              : s
          )
        );
      } else {
        throw new Error(data.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Rating error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred. Please try again.', {
        duration: 5000
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const handleBookingClick = (service: any) => {
    setSelectedService(service);
    setShowBookingConfirm(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedService) return;
    
    setIsBooking(true);
    setBookingServiceId(selectedService.id);
    
    try {
      const response = await fetch(route('marketplace.services.bookings.store'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ service_id: selectedService.id })
      });

      const data = await response.json();
      
      if (data.success) {
        setLocalServices(prevServices => 
          prevServices.map(s => 
            s.id === selectedService.id 
              ? { ...s, has_pending_booking: true }
              : s
          )
        );
        
        toast.success('Booking successful!', {
          duration: 4000,
          description: 'The provider will contact you soon.',
          icon: '🎉'
        });
        
        setShowBookingConfirm(false);
        setSuccessBooking(selectedService);
        setShowSuccessModal(true);
      } else {
        toast.error(data.message || 'An error occurred.', {
          duration: 5000
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 5000
      });
    } finally {
      setIsBooking(false);
      setBookingServiceId(null);
    }
  };

  const handleContactProvider = () => {
    if (!selectedService) return;
    
    setShowBookingConfirm(false);
    setShowDetailsModal(false);
    setShowSuccessModal(false);
    
    if (selectedService.user.contact) {
      window.location.href = `tel:${selectedService.user.contact}`;
    } else {
      Inertia.post(route("conversations.start"), {
        user_id: selectedService.user.id
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  const renderStars = (rating: number, size: number = 3) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-${size} h-${size} ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const totalCount = services.meta?.total ?? services.data.length;
  const hasServices = localServices.length > 0;

  const [ratingId, setRatingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleRatingUpdate = async () => {
    if (ratingValue === 0 || !ratingId) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmittingRating(true);
    try {
      const url = route('marketplace.services.ratings.update', ratingId);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          rating: ratingValue,
          comment: ratingComment
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error ${response.status}`);
      }
      
      if (data.success) {
        toast.success(data.message || 'Rating updated successfully!', {
          duration: 4000,
          description: ratingComment ? `Updated to ${ratingValue} stars` : undefined
        });

        setLocalServices(prevServices => 
          prevServices.map(s => 
            s.user_rating?.id === ratingId 
              ? { 
                  ...s, 
                  user_rating: { 
                    ...s.user_rating!, 
                    rating: ratingValue, 
                    comment: ratingComment 
                  }
                }
              : s
          )
        );

        setRatingService(null);
        setRatingValue(0);
        setRatingComment("");
        setRatingId(null);
        setIsEditing(false);
      } else {
        throw new Error(data.message || 'Failed to update rating');
      }
    } catch (error) {
      console.error('Update rating error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred. Please try again.', {
        duration: 5000
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-900 dark:to-green-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Livestock Services</h1>
            <p className="text-green-100 dark:text-green-300 text-sm sm:text-base mt-1 sm:mt-2">
              Find the best livestock services from trusted farmers, technicians, and veterinarians.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
          {/* Quick links for authenticated users */}
          {auth?.user && (
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = route('marketplace.services.bookings.my-bookings')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                My Bookings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = route('services.bookings.provider-bookings')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                Provider Dashboard
              </Button>
            </div>
          )}

          {/* Filter Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
              <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2 dark:text-gray-200">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                Filter Services
              </h2>
              {(search || location) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs sm:text-sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                <Input
                  placeholder="Search by title, category, description, or provider username..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                <Input
                  placeholder="Filter by location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-xs sm:text-sm">
                Apply Filters
              </Button>
            </form>
          </div>

          {/* Results count */}
          {hasServices && (
            <div className="flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Showing {localServices.length} of {totalCount} services
              </p>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {hasServices ? (
              localServices.map((service) => (
                <Card 
                  key={service.id} 
                  className="hover:shadow-md transition-shadow py-0 duration-300 overflow-hidden group border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Blog Post Thumbnail as Card Header Image */}
                  {service.blog_post?.thumbnail ? (
                    <Link
                      href={`/cms/blog/${service.blog_post.slug}`}
                      target="_blank"
                      className="block relative w-full h-28 sm:h-32 md:h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 group/image"
                    >
                      <img
                        src={service.blog_post.thumbnail}
                        alt={service.blog_post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Blog+Post';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity">
                        <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                          <div className="flex items-center gap-0.5 sm:gap-1 text-white text-[10px] sm:text-xs">
                            <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="truncate">Read related blog post</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-28 sm:h-32 md:h-40 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-700 dark:to-green-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                          <span className="text-white text-lg sm:text-xl md:text-2xl">📋</span>
                        </div>
                        <p className="text-white text-[10px] sm:text-xs font-medium">Service Listing</p>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-1 sm:pb-2 pt-2 sm:pt-3 px-2 sm:px-3">
                    <div className="flex flex-wrap justify-between items-start gap-1">
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-[10px] sm:text-xs">
                        {service.category}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs dark:border-gray-600 dark:text-gray-400">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        Available
                      </Badge>
                    </div>
                    <CardTitle className="text-xs sm:text-sm md:text-base mt-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1 dark:text-gray-200">
                      {service.title}
                    </CardTitle>
                    
                    {/* Rating Display */}
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1">
                      {renderStars(service.average_rating || 0, 3)}
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({service.ratings_count || 0})
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-1.5 sm:space-y-2 px-2 sm:px-3 pb-2 sm:pb-3">
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs line-clamp-2">{service.description}</p>

                    <div className="flex items-center gap-0.5 sm:gap-1 text-green-700 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 p-1 sm:p-1.5 rounded-md">
                      <span className="text-xs sm:text-sm">{formatPrice(service.price)}</span>
                    </div>

                    <div className="flex items-start gap-0.5 sm:gap-1 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs line-clamp-1">{service.location}</span>
                    </div>

                    {/* Owner Info */}
                    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-white dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600">
                          {service.user.profile_picture ? (
                            <img
                              src={service.user.profile_picture}
                              alt={service.user.name}
                              className="w-full h-full object-cover object-center"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : null}
                          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white font-semibold text-[8px] sm:text-[10px] ${service.user.profile_picture ? 'hidden' : ''}`}>
                            {getInitials(service.user.name)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <User className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-gray-400" />
                          <p className="text-[10px] sm:text-xs font-medium text-gray-900 dark:text-gray-200 truncate">
                            {service.user.name}
                          </p>
                        </div>
                        
                        {service.user.contact ? (
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <Phone className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-green-600 dark:text-green-400" />
                            <p className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400 truncate">
                              {service.user.contact}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">No contact</p>
                        )}
                      </div>
                    </div>

                    {/* Status and Action Buttons */}
                    <div className="flex gap-1 sm:gap-1.5 pt-1">
                      {service.has_pending_booking ? (
                        <Badge variant="secondary" className="w-full justify-center py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-[10px] sm:text-xs">
                          <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          Pending Booking
                        </Badge>
                      ) : service.user.id === auth?.user?.id ? (
                        <Badge variant="secondary" className="w-full justify-center py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 text-[10px] sm:text-xs">
                          Your Service
                        </Badge>
                      ) : service.can_rate ? (
                        <Button 
                          size="sm" 
                          className="flex-1 h-6 sm:h-7 text-[10px] sm:text-xs bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
                          onClick={() => setRatingService(service)}
                        >
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          Rate Service
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1 h-6 sm:h-7 text-[10px] sm:text-xs bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                          onClick={() => handleBookingClick(service)}
                          disabled={isBooking && bookingServiceId === service.id}
                        >
                          {isBooking && bookingServiceId === service.id ? (
                            'Booking...'
                          ) : (
                            <>
                              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                              Book Now
                            </>
                          )}
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 h-6 sm:h-7 text-[10px] sm:text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => handleViewDetails(service)}
                      >
                        View Details
                      </Button>
                    </div>

                    {/* Show user's existing rating if any */}
                    {service.user_rating && (
                      <div className="mt-1 p-1 sm:p-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            {renderStars(service.user_rating.rating, 2.5)}
                            <span className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400">Your rating</span>
                          </div>
                          <button
                            onClick={() => {
                              const userRating = service.user_rating;
                              if (userRating) {
                                setRatingService({
                                  ...service,
                                  pending_rating_booking_id: userRating.booking_id || service.id,
                                });
                                setRatingValue(userRating.rating);
                                setRatingComment(userRating.comment || "");
                                setRatingId(userRating.id);
                                setIsEditing(true);
                              }
                            }}
                            className="text-[9px] sm:text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Edit Link - Only show for service owner */}
                    {service.user.id === auth?.user?.id && (
                      <div className="text-right">
                        <Link
                          className="inline-flex items-center gap-0.5 text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          href={route("marketplace.services.edit", service.id)}
                        >
                          <Edit className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          Edit
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200 mb-1 sm:mb-2">No services found</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                {(search || location) && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="mt-3 sm:mt-4 text-xs sm:text-sm"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {services.links && services.links.length > 3 && (
            <div className="mt-4 sm:mt-6 flex justify-center gap-0.5 sm:gap-1">
              {services.links.map((link: any, idx: number) => {
                if (!link) return null;
                
                return (
                  <Button
                    key={idx}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    className={`min-w-[28px] sm:min-w-[32px] h-7 sm:h-8 text-[10px] sm:text-xs ${
                      link.active ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' : 'dark:border-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => link.url && Inertia.get(link.url)}
                  >
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* Rating Dialog */}
        <Dialog open={!!ratingService} onOpenChange={() => {
          setRatingService(null);
          setRatingValue(0);
          setRatingComment("");
          setRatingId(null);
          setIsEditing(false);
        }}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-200">{isEditing ? 'Edit Rating' : 'Rate Service'}</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {isEditing 
                  ? 'Update your rating for this service'
                  : `How was your experience with ${ratingService?.title}?`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
              <div className="flex justify-center gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${
                        star <= (hoveredStar || ratingValue)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Your Review {isEditing ? '(Optional)' : '(Optional)'}
                </label>
                <Textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your experience with this service..."
                  rows={4}
                  className="w-full text-xs sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => {
                setRatingService(null);
                setRatingValue(0);
                setRatingComment("");
                setRatingId(null);
                setIsEditing(false);
              }} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancel
              </Button>
              
              {isEditing ? (
                <Button 
                  onClick={handleRatingUpdate}
                  disabled={ratingValue === 0 || isSubmittingRating}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm"
                >
                  {isSubmittingRating ? (
                    <span className="flex items-center gap-1 sm:gap-2">
                      <span className="animate-spin">⏳</span> Updating...
                    </span>
                  ) : 'Update Rating'}
                </Button>
              ) : (
                <Button 
                  onClick={handleRatingSubmit}
                  disabled={ratingValue === 0 || isSubmittingRating}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm"
                >
                  {isSubmittingRating ? (
                    <span className="flex items-center gap-1 sm:gap-2">
                      <span className="animate-spin">⏳</span> Submitting...
                    </span>
                  ) : 'Submit Rating'}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Service Details Modal */}
        <ServiceDetailsModal
          service={selectedService}
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          onBookNow={() => {
            setShowDetailsModal(false);
            setShowBookingConfirm(true);
          }}
          onContact={handleContactProvider}
          authUser={auth?.user}
        />

        {/* Booking Confirmation Modal */}
        <BookingConfirmationModal
          open={showBookingConfirm}
          onOpenChange={setShowBookingConfirm}
          service={selectedService}
          onConfirm={handleConfirmBooking}
          onContact={handleContactProvider}
          isProcessing={isBooking && bookingServiceId === selectedService?.id}
        />
      </div>
    </AppLayout>
  );
};

export default IndexServices;
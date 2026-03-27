import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { route } from "ziggy-js";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  User,
  Edit
} from "lucide-react";
import AppLayout from "@/layouts/marketplaceLayout";

interface Props {
  bookings: {
    data: Array<{
      id: number;
      status: 'pending' | 'accepted' | 'completed' | 'cancelled';
      scheduled_date: string;
      notes: string;
      created_at: string;
      completed_at?: string;
      service: {
        id: number;
        title: string;
        description: string;
        price: number;
        user: {
          id: number;
          name: string;
          contact?: string;
        };
      };
      provider: {
        id: number;
        name: string;
      };
      rating?: {
        id: number;
        rating: number;
        comment: string;
      } | null;
    }>;
    links: any[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function MyBookings({ bookings, flash }: Props) {
  const [cancelDialog, setCancelDialog] = useState<{open: boolean; booking: any}>({
    open: false,
    booking: null
  });
  const [completeDialog, setCompleteDialog] = useState<{open: boolean; booking: any}>({
    open: false,
    booking: null
  });
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean; booking: any}>({
    open: false,
    booking: null
  });
  const [ratingDialog, setRatingDialog] = useState<{open: boolean; booking: any}>({
    open: false,
    booking: null
  });
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [localBookings, setLocalBookings] = useState(bookings.data);

  // Handle flash messages
  useEffect(() => {
    if (flash?.success) {
      setNotification({ type: 'success', message: flash.success });
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
    if (flash?.error) {
      setNotification({ type: 'error', message: flash.error });
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Update localBookings when props change
  useEffect(() => {
    setLocalBookings(bookings.data);
  }, [bookings.data]);

  // Handle cancel booking
  const handleCancelBooking = () => {
    if (!cancelDialog.booking) return;

    router.post(route('marketplace.services.bookings.update-status', cancelDialog.booking.id), {
      status: 'cancelled'
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setCancelDialog({ open: false, booking: null });
        router.reload({ only: ['bookings'] });
      },
      onError: (errors) => {
        console.error('Cancel error:', errors);
      }
    });
  };

  // Handle mark as completed
  const handleCompleteBooking = () => {
    if (!completeDialog.booking) return;

    router.post(route('marketplace.services.bookings.complete', completeDialog.booking.id), {}, {
      preserveScroll: true,
      onSuccess: () => {
        setCompleteDialog({ open: false, booking: null });
        
        router.reload({ 
          only: ['bookings'],
          onSuccess: (page) => {
            const updatedBookings = page.props.bookings as any;
            const completedBooking = updatedBookings.data.find(
              (b: any) => b.id === completeDialog.booking.id
            );
            
            if (completedBooking && completedBooking.status === 'completed' && !completedBooking.rating) {
              setRatingValue(0);
              setRatingComment("");
              setRatingDialog({ open: true, booking: completedBooking });
            }
          }
        });
      },
      onError: (errors) => {
        console.error('Complete error:', errors);
      }
    });
  };

  // Handle delete booking
  const handleDeleteBooking = () => {
    if (!deleteDialog.booking) return;

    router.delete(route('marketplace.services.bookings.destroy', deleteDialog.booking.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteDialog({ open: false, booking: null });
        router.reload({ only: ['bookings'] });
      },
      onError: (errors) => {
        console.error('Delete error:', errors);
      }
    });
  };

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (ratingValue === 0 || !ratingDialog.booking) {
      setNotification({
        type: 'error',
        message: 'Please select a rating'
      });
      return;
    }

    setIsSubmittingRating(true);
    try {
      const isEditing = !!ratingDialog.booking?.rating;
      const url = isEditing 
        ? route('marketplace.services.ratings.update', ratingDialog.booking.rating.id)
        : route('marketplace.services.ratings.store');
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          booking_id: ratingDialog.booking.id,
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
        setNotification({
          type: 'success',
          message: data.message || (isEditing ? 'Rating updated successfully!' : 'Thank you for your rating!')
        });

        setLocalBookings(prevBookings => 
          prevBookings.map(b => 
            b.id === ratingDialog.booking.id 
              ? { 
                  ...b, 
                  rating: { 
                    id: data.rating.id, 
                    rating: ratingValue, 
                    comment: ratingComment 
                  } 
                }
              : b
          )
        );
        
        setRatingDialog({ open: false, booking: null });
        setRatingValue(0);
        setRatingComment("");
      } else {
        throw new Error(data.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Rating error:', error);
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Handle edit rating
  const handleEditRating = (booking: any) => {
    if (booking.rating) {
      setRatingValue(booking.rating.rating);
      setRatingComment(booking.rating.comment || "");
      setRatingDialog({ open: true, booking });
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400', icon: Clock, label: 'Pending' },
      accepted: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400', icon: CheckCircle, label: 'Accepted' },
      completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400', icon: CheckCircle, label: 'Completed' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-400', icon: XCircle, label: 'Cancelled' }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.bg} ${variant.text} border-0 flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  // Render stars for rating display
  const renderStars = (rating: number, size: number = 3) => {
    return (
      <div className="flex gap-0.5">
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

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <AppLayout>
        <Head title="My Bookings" />
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Notification */}
            {notification && (
              <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-in slide-in-from-top-2 ${
                notification.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-800' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  {notification.message}
                </div>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <Link
                href={route('marketplace.services.index')}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Services
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Bookings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your service bookings</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {bookings.meta?.total ?? localBookings.length}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {localBookings.filter(b => b.status === 'pending').length}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {localBookings.filter(b => b.status === 'accepted').length}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {localBookings.filter(b => b.status === 'completed').length}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">My Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {localBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">You haven't made any bookings yet</p>
                    <Button 
                      className="mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                      onClick={() => window.location.href = route('marketplace.services.index')}
                    >
                      Browse Services
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {localBookings.map((booking) => (
                      <Card key={booking.id} className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            {/* Left side - Service Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                  {booking.service.title}
                                </h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                {booking.service.description}
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                  <User className="w-3 h-3" />
                                  <span>Provider: {booking.provider.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                  <span>₱{Number(booking.service.price).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                  <Calendar className="w-3 h-3" />
                                  <span>Scheduled: {formatDate(booking.scheduled_date)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-3 h-3" />
                                  <span>Booked: {formatDate(booking.created_at)}</span>
                                </div>
                              </div>

                              {booking.notes && booking.notes !== 'Booked via quick booking' && (
                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                                  <span className="font-medium">Your note:</span> {booking.notes}
                                </div>
                              )}

                              {/* Rating Display for Completed Bookings */}
                              {booking.status === 'completed' && booking.rating && (
                                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      {renderStars(booking.rating.rating, 4)}
                                      <span className="text-sm font-medium dark:text-gray-300">
                                        {booking.rating.rating}/5
                                      </span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-xs dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                                      onClick={() => handleEditRating(booking)}
                                    >
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit
                                    </Button>
                                  </div>
                                  {booking.rating.comment && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                      "{booking.rating.comment}"
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Right side - Actions */}
                            <div className="flex flex-col gap-2 min-w-[120px]">
                              {booking.status === 'pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setCancelDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setDeleteDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </>
                              )}

                              {booking.status === 'accepted' && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                                    onClick={() => setCompleteDialog({ open: true, booking })}
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Mark Completed
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setCancelDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setDeleteDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </>
                              )}

                              {booking.status === 'completed' && (
                                <>
                                  {!booking.rating ? (
                                    <Button
                                      size="sm"
                                      className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
                                      onClick={() => {
                                        setRatingValue(0);
                                        setRatingComment("");
                                        setRatingDialog({ open: true, booking });
                                      }}
                                    >
                                      <Star className="w-3 h-3 mr-1" />
                                      Rate Service
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950/30"
                                      onClick={() => handleEditRating(booking)}
                                    >
                                      <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                                      Edit Rating
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setDeleteDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </>
                              )}

                              {booking.status === 'cancelled' && (
                                <div className="flex flex-col gap-2">
                                  <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-fit">
                                    Cancelled
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                                    onClick={() => setDeleteDialog({ open: true, booking })}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Delete Booking
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Pagination */}
                    {bookings.links && bookings.links.length > 3 && (
                      <div className="mt-6 flex justify-center gap-1">
                        {bookings.links.map((link: any, idx: number) => {
                          if (!link) return null;
                          
                          return (
                            <Button
                              key={idx}
                              variant={link.active ? "default" : "outline"}
                              size="sm"
                              disabled={!link.url}
                              className={`min-w-[32px] h-8 text-xs ${
                                link.active ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => link.url && router.get(link.url)}
                            >
                              <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={cancelDialog.open} onOpenChange={(open) => !open && setCancelDialog({ open: false, booking: null })}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Cancel Booking</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            {cancelDialog.booking && (
              <div className="py-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Service:</span> {cancelDialog.booking.service.title}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Provider:</span> {cancelDialog.booking.provider.name}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Schedule:</span> {formatDate(cancelDialog.booking.scheduled_date)}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelDialog({ open: false, booking: null })} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                No, Keep It
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800" onClick={handleCancelBooking}>
                Yes, Cancel Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Complete Confirmation Dialog */}
        <Dialog open={completeDialog.open} onOpenChange={(open) => !open && setCompleteDialog({ open: false, booking: null })}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Mark as Completed</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Have you received this service? Marking as completed will allow you to rate the provider.
              </DialogDescription>
            </DialogHeader>
            
            {completeDialog.booking && (
              <div className="py-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Service:</span> {completeDialog.booking.service.title}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Provider:</span> {completeDialog.booking.provider.name}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setCompleteDialog({ open: false, booking: null })} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Not Yet
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" onClick={handleCompleteBooking}>
                Yes, Mark Completed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, booking: null })}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-red-600 dark:text-red-400">Delete Booking</DialogTitle>
              <DialogDescription className="pt-2 dark:text-gray-400">
                Are you sure you want to permanently delete this booking? 
                This action cannot be undone and the booking will be removed from your history.
              </DialogDescription>
            </DialogHeader>
            
            {deleteDialog.booking && (
              <div className="py-4">
                <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg space-y-2 border border-red-100 dark:border-red-800">
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Service:</span> {deleteDialog.booking.service.title}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Provider:</span> {deleteDialog.booking.provider.name}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Scheduled:</span> {formatDate(deleteDialog.booking.scheduled_date)}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Status:</span> 
                    <Badge variant="outline" className="ml-2">
                      {deleteDialog.booking.status}
                    </Badge>
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialog({ open: false, booking: null })}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Keep Booking
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={handleDeleteBooking}
              >
                Yes, Permanently Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rating Dialog */}
        <Dialog open={ratingDialog.open} onOpenChange={(open) => !open && setRatingDialog({ open: false, booking: null })}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">
                {ratingDialog.booking?.rating ? 'Edit Rating' : 'Rate Service'}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {ratingDialog.booking?.rating 
                  ? 'Update your rating for this service'
                  : `How was your experience with ${ratingDialog.booking?.service?.title}?`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-center gap-2">
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
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredStar || ratingValue)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review (Optional)
                </label>
                <Textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your experience with this service..."
                  rows={4}
                  className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setRatingDialog({ open: false, booking: null });
                setRatingValue(0);
                setRatingComment("");
              }} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancel
              </Button>
              <Button 
                onClick={handleRatingSubmit}
                disabled={ratingValue === 0 || isSubmittingRating}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              >
                {isSubmittingRating 
                  ? 'Submitting...' 
                  : ratingDialog.booking?.rating ? 'Update Rating' : 'Submit Rating'
                }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppLayout>
    </>
  );
}
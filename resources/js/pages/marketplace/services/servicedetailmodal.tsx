import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  User, 
  Star, 
  Calendar,
  Clock,
  AlertCircle,
  MessageCircle,
  Shield,
  ThumbsUp,
  Info,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { route } from 'ziggy-js';

interface ServiceDetailsModalProps {
  service: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookNow: () => void;
  onContact: () => void;
  authUser?: any;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  open,
  onOpenChange,
  onBookNow,
  onContact,
  authUser
}) => {
  if (!service) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isOwner = authUser?.id === service.user?.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {service.title}
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {service.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Image/Icon */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">
                    {service.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-800">
                    {formatPrice(service.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(service.average_rating || 0)}
                    <span className="text-sm text-gray-600">
                      ({service.ratings_count || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              {/* <Badge variant="outline" className="bg-white">
                <Clock className="w-3 h-3 mr-1" />
                Available Now
              </Badge> */}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Service Description
            </h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {service.description}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Service Location</p>
              <p className="text-gray-600">{service.location}</p>
            </div>
          </div>

          <Separator />

          {/* Provider Information */}
          <div>
            <h3 className="font-semibold mb-3">Service Provider</h3>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-green-500 to-green-600 flex-shrink-0">
                {service.user.profile_picture ? (
                  <img
                    src={service.user.profile_picture}
                    alt={service.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                    {getInitials(service.user.name)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-lg">{service.user.name}</h4>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{service.user.contact || 'No contact provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Member since {new Date(service.user.created_at).getFullYear()}</span>
                  </div>
                </div>

                {/* Provider Stats */}
                <div className="flex gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total Services</p>
                    <p className="font-semibold">{service.user.services_count || 1}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completed Bookings</p>
                    <p className="font-semibold">{service.user.completed_bookings || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Information & Important Notes */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-blue-800">
              <AlertCircle className="w-5 h-5" />
              Important Information About Booking
            </h3>
            
            <div className="space-y-2 text-sm text-blue-700">
              <p className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  <strong>Booking Purpose:</strong> The "Book Now" feature is primarily for:
                  <ul className="list-disc ml-5 mt-1 text-blue-600">
                    <li>Tracking service requests for the provider</li>
                    <li>Enabling you to rate the service after completion</li>
                    <li>Building provider reputation and history</li>
                  </ul>
                </span>
              </p>
              
              <p className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  <strong>For Faster Service:</strong> We recommend contacting the provider directly 
                  via phone or message to discuss availability, schedule, and specific requirements.
                </span>
              </p>
              
              <p className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  <strong>Rating System:</strong> You'll be able to rate this service after the 
                  provider accepts and marks your booking as completed. Your ratings help the 
                  community find trusted providers!
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {!isOwner && (
              <>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={onBookNow}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={onContact}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Provider
                </Button>

                {service.user.contact && (
                  <Button 
                    variant="secondary"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${service.user.contact}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                )}
              </>
            )}

            {isOwner && (
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => window.location.href = route('marketplace.services.edit', service.id)}
              >
                <Info className="w-4 h-4 mr-2" />
                Manage This Service
              </Button>
            )}
          </div>

          {/* Additional Tips */}
          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
            <p className="flex items-start gap-1">
              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Tip:</strong> Always discuss pricing, schedule, and specific requirements 
                with the provider before confirming the service.
              </span>
            </p>
            <p className="flex items-start gap-1 mt-1">
              <Shield className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Safety:</strong> Verify provider credentials and meet in safe locations 
                when availing services in person.
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal;
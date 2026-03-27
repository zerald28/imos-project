import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowLeft } from "lucide-react";
import { route } from "ziggy-js";

interface Props {
  booking: {
    id: number;
    scheduled_date: string;
    notes: string;
    service: {
      id: number;
      title: string;
      description: string;
      price: number;
      user: {
        name: string;
      };
    };
    provider: {
      name: string;
    };
  };
}

export default function CreateRating({ booking }: Props) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const { data, setData, post, processing, errors } = useForm({
    booking_id: booking.id,
    rating: 0,
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.rating === 0) return;
    post(route('ratings.store'));
  };

  return (
    <>
      <Head title="Rate Service" />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Link
            href={route('bookings.my-bookings')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to My Bookings
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{booking.service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Provider: {booking.provider.name}</p>
                <p className="text-sm text-gray-600">Service Date: {new Date(booking.scheduled_date).toLocaleDateString()}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star);
                          setData('rating', star);
                        }}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoveredStar || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-red-600 mt-1">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review (Optional)
                  </label>
                  <Textarea
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                    placeholder="Tell others about your experience..."
                    rows={5}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={processing || rating === 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Rating
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
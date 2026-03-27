import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: number;
  sellerName: string;
  existingRating?: {
    rating: number;
    comment: string;
  } | null;
  onRatingSubmitted?: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  transactionId,
  sellerName,
  existingRating,
  onRatingSubmitted,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setComment(existingRating.comment || "");
    } else {
      setRating(0);
      setComment("");
    }
  }, [existingRating, isOpen]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/marketplace/transactions/${transactionId}/rate`, {
        rating,
        comment,
      });

      toast.success(
        existingRating ? "Rating updated successfully!" : "Rating submitted successfully!"
      );

      onRatingSubmitted?.();
      onClose();
      
      // Reload the page to show updated rating
      setTimeout(() => {
        router.reload({ only: ['transaction'] });
      }, 500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4">
          <h3 className="text-lg font-semibold">
            {existingRating ? "Update Your Rating" : "Rate Your Experience"}
          </h3>
          <p className="text-sm text-yellow-100 mt-1">
            {existingRating
              ? `Update your rating for ${sellerName}`
              : `How was your transaction with ${sellerName}?`}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="flex flex-col items-center space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        isActive
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 dark:fill-gray-700 text-gray-300 dark:text-gray-600"
                      } transition-colors`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {rating === 1 && "Poor - Very dissatisfied"}
              {rating === 2 && "Fair - Somewhat dissatisfied"}
              {rating === 3 && "Good - Satisfied"}
              {rating === 4 && "Very Good - Very satisfied"}
              {rating === 5 && "Excellent - Extremely satisfied"}
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Review (Optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with the seller..."
              rows={4}
              className="resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {comment.length}/1000 characters
            </p>
          </div>

          {/* Rating Preview */}
          {rating > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {rating === 5 && "🌟 Excellent! Thank you for your feedback!"}
                {rating === 4 && "👍 Great! We're glad you had a good experience."}
                {rating === 3 && "😊 Thanks for your honest feedback."}
                {rating === 2 && "😕 We'll work on improving."}
                {rating === 1 && "🙏 Sorry to hear that. We'll do better."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="px-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            {isSubmitting
              ? "Submitting..."
              : existingRating
              ? "Update Rating"
              : "Submit Rating"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
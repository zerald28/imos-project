<?php

namespace App\Http\Controllers;

use App\Models\FarmerRating;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\ImosNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FarmerRatingController extends Controller
{
    /**
     * Store a new rating or update existing one.
     */
    public function storeOrUpdate(Request $request, MarketplaceTransaction $transaction)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $userId = auth()->id();
        $rater = auth()->user();

        // Simple validation: Transaction must be completed
     if (!in_array($transaction->state, ['completed', 'done'])) {
    return response()->json([
        'message' => 'You can only rate completed transactions.'
    ], 403);
}

        // User must be either the buyer or seller
        if ($transaction->buyer_id !== $userId && $transaction->seller_id !== $userId) {
            return response()->json([
                'message' => 'You are not part of this transaction.'
            ], 403);
        }

        // Check if rating already exists
        $existingRating = FarmerRating::where('transaction_id', $transaction->id)
            ->where('rater_id', $userId)
            ->first();

        if ($existingRating) {
            // Update existing rating - NO NOTIFICATION
            $existingRating->update([
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);
            
            $message = 'Rating updated successfully!';
            $rating = $existingRating;
        } else {
            // Create new rating - SEND NOTIFICATION
            $rating = FarmerRating::create([
                'rater_id' => $userId,
                'farmer_id' => $transaction->seller_id, // Always rating the seller
                'transaction_id' => $transaction->id,
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);
            
            $message = 'Rating submitted successfully!';
            
            // 🔔 Send notification ONLY for new rating
            $this->sendRatingNotification($transaction, $rater, $request->rating, $request->comment);
        }

        // Get updated average rating
        $averageRating = FarmerRating::where('farmer_id', $transaction->seller_id)->avg('rating');
        $totalRatings = FarmerRating::where('farmer_id', $transaction->seller_id)->count();

        return response()->json([
            'message' => $message,
            'rating' => $rating,
            'average_rating' => round($averageRating, 2),
            'total_ratings' => $totalRatings,
        ]);
    }

    /**
     * Send notification to the farmer about the new rating (ONLY ON CREATE)
     */
    /**
 * Send notification to the farmer about the new rating (ONLY ON CREATE)
 */
protected function sendRatingNotification($transaction, $rater, $rating, $comment)
{
    try {
        $farmerId = $transaction->seller_id; // The farmer receiving the rating
        $raterName = $rater->name;
        
        // Build star emoji string based on rating
        $starEmojis = str_repeat('⭐', $rating) . str_repeat('☆', 5 - $rating);
        
        // Build notification message
        $message = "{$starEmojis} {$raterName} rated you {$rating} stars for transaction #{$transaction->id}" . ($comment ? ": {$comment}" : "");
        
        // Create notification for the farmer (user_id = farmer, actor_id = rater)
        ImosNotification::create([
            'user_id' => $farmerId,        // Farmer receives notification
            'actor_id' => $rater->id,       // Rater triggered the notification
            'type' => 'marketplace',
            'action' => 'rating_received',
            'message' => $message,
            'url' => route('marketplace.transaction.setup', $transaction->id), // Seller transaction URL
        ]);
        
        Log::info("Rating notification sent to farmer ID: {$farmerId} for transaction: {$transaction->id}");
        
    } catch (\Exception $e) {
        Log::error("Failed to send rating notification: " . $e->getMessage());
    }
}

    /**
     * Get existing rating for a transaction.
     */
    public function getRating(MarketplaceTransaction $transaction)
    {
        $userId = auth()->id();

        // User must be part of the transaction
        if ($transaction->buyer_id !== $userId && $transaction->seller_id !== $userId) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $rating = FarmerRating::where('transaction_id', $transaction->id)
            ->where('rater_id', $userId)
            ->first();

        return response()->json([
            'has_rating' => $rating !== null,
            'rating' => $rating ? [
                'id' => $rating->id,
                'rating' => $rating->rating,
                'comment' => $rating->comment,
                'created_at' => $rating->created_at,
                'updated_at' => $rating->updated_at,
            ] : null,
        ]);
    }

    /**
     * Delete a rating.
     */
    public function destroy(FarmerRating $rating)
    {
        // Check if user owns this rating
        if ($rating->rater_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $rating->delete();

        // Get updated average rating
        $averageRating = FarmerRating::where('farmer_id', $rating->farmer_id)->avg('rating');
        $totalRatings = FarmerRating::where('farmer_id', $rating->farmer_id)->count();

        return response()->json([
            'message' => 'Rating deleted successfully.',
            'average_rating' => round($averageRating, 2),
            'total_ratings' => $totalRatings,
        ]);
    }
}
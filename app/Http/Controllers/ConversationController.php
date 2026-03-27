<?php
namespace App\Http\Controllers;

use App\Models\MarketplaceConversation;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;


class ConversationController extends Controller
{
    /**
     * List all conversations of the authenticated user
     * Returns last message for preview and users info
     */
    // ConversationController@index (for listing all conversations)
 public function index()
{
    $user = auth()->user();

    $conversations = Conversation::with([
        'userOne:id,name,last_seen',
        'userTwo:id,name,last_seen',
        'latestMessage.sender:id,name',
        'marketplaceConversations.listing:id,title,price_per_unit,image,description,price_unit_type',
        'marketplaceConversations.listingSwine:id,listing_id,breed,sex,estimated_weight,thumbnail'
    ])
    ->where(function($q) use ($user) {
        $q->where('user_one_id', $user->id)
          ->orWhere('user_two_id', $user->id);
    })
    // 🔴 IMPORTANT: Order by the most recent activity
    ->orderByRaw('COALESCE(
        (SELECT MAX(created_at) FROM messages WHERE conversation_id = conversations.id), 
        conversations.updated_at,
        conversations.created_at
    ) DESC')
    ->get()
    ->map(function ($conv) use ($user) {
        // Count unread messages
        $unreadCount = Message::where('conversation_id', $conv->id)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->count();
        
        $conv->unread_count = $unreadCount;
        
        // Set last_message from the loaded relationship
        $conv->last_message = $conv->latestMessage;
        
        // Transform marketplace conversations
        $conv->marketplace_conversations = $conv->marketplaceConversations->map(function ($mc) {
            return [
                'id' => $mc->id,
                'listing_id' => $mc->listing_id,
                'listing_swine_id' => $mc->listing_swine_id,
                'listing' => $mc->listing ? [
                    'id' => $mc->listing->id,
                    'title' => $mc->listing->title,
                    'photo_url' => $mc->listing->image ? asset('storage/'.$mc->listing->image) : null,
                    'price' => $mc->listing->price_per_unit,
                    'price_unit_type' => $mc->listing->price_unit_type ?? null,
                    'description' => $mc->listing->description ?? null,
                ] : null,
                'listing_swine' => $mc->listingSwine ? [
                    'id' => $mc->listingSwine->id,
                    'listing_id' => $mc->listingSwine->listing_id,
                    'breed' => $mc->listingSwine->breed ?? null,
                    'sex' => $mc->listingSwine->sex ?? null,
                    'estimated_weight' => $mc->listingSwine->estimated_weight ?? $mc->listingSwine->scaled_weight ?? null,
                    'thumbnail' => $mc->listingSwine->thumbnail ? asset('storage/'.$mc->listingSwine->thumbnail) : null,
                ] : null,
            ];
        })->values();

        unset($conv->marketplaceConversations);
        unset($conv->latestMessage); // Remove the relationship to clean up
        
        return $conv;
    });

    return response()->json(['data' => $conversations]);
}





// ConversationController@show (used for Conversation.tsx)
public function show($id)
    {
        $conversation = Conversation::with([
            'userOne:id,name,last_seen',
            'userTwo:id,name,last_seen',
            'marketplaceConversations.listing:id,title,price_per_unit,image,description,price_unit_type',
            'marketplaceConversations.listingSwine:id,listing_id,breed,sex,estimated_weight,thumbnail',
            'messages' => fn($q) => $q->with('sender:id,name')->orderBy('created_at', 'asc')
        ])->findOrFail($id);

        // map marketplace_conversations to desired shape (same as above)
        $conversation->marketplace_conversations = $conversation->marketplaceConversations->map(function ($mc) {
            return [
                'id' => $mc->id,
                'listing_id' => $mc->listing_id,
                'listing_swine_id' => $mc->listing_swine_id,
                'listing' => $mc->listing ? [
                    'id' => $mc->listing->id,
                    'title' => $mc->listing->title,
                    'photo_url' => $mc->listing->image ? asset('storage/'.$mc->listing->image) : null,
                    'price' => $mc->listing->price_per_unit,
                    'price_unit_type' => $mc->listing->price_unit_type ?? null,
                    'description' => $mc->listing->description ?? null,
                ] : null,
                'listing_swine' => $mc->listingSwine ? [
                    'id' => $mc->listingSwine->id,
                    'listing_id' => $mc->listingSwine->listing_id,
                    'breed' => $mc->listingSwine->breed ?? null,
                    'sex' => $mc->listingSwine->sex ?? null,
                    'estimated_weight' => $mc->listingSwine->estimated_weight ?? $mc->listingSwine->scaled_weight ?? null,
                    'thumbnail' => $mc->listingSwine->thumbnail ? asset('storage/'.$mc->listingSwine->thumbnail) : null,
                ] : null,
            ];
        })->values();

        unset($conversation->marketplaceConversations);

        return response()->json(['data' => $conversation]);
    }




    /**
     * Start a new conversation or return existing
     */
    public function store(Request $request)
    {
        $receiverId = $request->input('receiver_id');
        $authId = $request->user()->id;

        if ($receiverId == $authId) {
            return response()->json(['message' => "Cannot start conversation with yourself"], 422);
        }

        // check if conversation exists
        $conversation = Conversation::where(function ($q) use ($authId, $receiverId) {
           $q->where('user_one_id', $authId)->where('user_two_id', $receiverId);

        })->orWhere(function ($q) use ($authId, $receiverId) {
            $q->where('user_one_id', $receiverId)->where('user_two_id', $authId);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $authId,
                'user_two_id' => $receiverId
            ]);
        }

        $conversation->load(['userOne:id,name,last_seen','userTwo:id,name,last_seen']);

        return response()->json(['data' => $conversation]);
    }

public function start(Request $request)
{
    $request->validate([
        'receiver_id' => 'required|exists:users,id',
        'listing_id' => 'nullable|exists:marketplace_listings,id',
        'listing_swine_ids' => 'nullable|array',
        'listing_swine_ids.*' => 'exists:listing_swine,id',
    ]);

    $authUser = auth()->user();

    // Find or create the conversation
    $conversation = Conversation::where(function ($q) use ($authUser, $request) {
        $q->where('user_one_id', $authUser->id)
          ->where('user_two_id', $request->receiver_id);
    })->orWhere(function ($q) use ($authUser, $request) {
        $q->where('user_one_id', $request->receiver_id)
          ->where('user_two_id', $authUser->id);
    })->first();

    if (!$conversation) {
        $conversation = Conversation::create([
            'user_one_id' => $authUser->id,
            'user_two_id' => $request->receiver_id,
        ]);
    }

    $swineIds = $request->input('listing_swine_ids', []);
    $listingId = $request->input('listing_id');

    // Fetch existing rows for this conversation
    $existingRows = MarketplaceConversation::where('conversation_id', $conversation->id)->get();

    // Determine if deletion is needed
    $shouldDelete = false;

    if (!empty($swineIds)) {
        // Case 1: New swine selected → delete all old rows
        $shouldDelete = true;
    } elseif ($listingId && $existingRows->pluck('listing_id')->unique()->count() > 0 && !$existingRows->pluck('listing_id')->contains($listingId)) {
        // Case 2: Listing_id is different → delete old rows
        $shouldDelete = true;
    }

    if ($shouldDelete) {
        MarketplaceConversation::where('conversation_id', $conversation->id)->delete();
        // Refresh existing rows after deletion
        $existingRows = collect();
    }

    // Create new marketplace_conversation rows
    if ($listingId) {
        if (empty($swineIds)) {
            // Only create a row if no row with this listing_id exists
            $exists = $existingRows->where('listing_id', $listingId)->count() > 0;
            if (!$exists) {
                MarketplaceConversation::create([
                    'conversation_id' => $conversation->id,
                    'listing_id' => $listingId,
                    'listing_swine_id' => null,
                ]);
            }
        } else {
            // One row per selected swine
            foreach ($swineIds as $swineId) {
                MarketplaceConversation::create([
                    'conversation_id' => $conversation->id,
                    'listing_id' => $listingId,
                    'listing_swine_id' => $swineId,
                ]);
            }
        }
    }

    return response()->json([
        'data' => $conversation
    ]);
}




}

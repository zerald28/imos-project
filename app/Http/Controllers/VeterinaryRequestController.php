<?php

// app/Http/Controllers/VeterinaryRequestController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VeterinaryRequest;

class VeterinaryRequestController extends Controller
{
  public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'animal_id' => 'required|exists:livestock_animals,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'request_type' => 'nullable|string|max:255',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'errors' => $e->errors()
        ], 422);
    }

    $vetRequest = VeterinaryRequest::create([
        'animal_id' => $validated['animal_id'],
        'title' => $validated['title'],
        'description' => $validated['description'] ?? null,
        'status' => 'pending',
        'user_id' => auth()->id(),
        'request_type' => $validated['request_type'],
    ]);

    return response()->json($vetRequest, 201);
}

// app/Http/Controllers/VeterinaryRequestController.php
public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:pending,in_progress,completed'
    ]);

    $vr = VeterinaryRequest::findOrFail($id);
    $vr->status = $request->status;
    $vr->save();

    return response()->json(['success' => true, 'status' => $vr->status]);
}

 public function destroy($id)
    {
        try {
            $vetRequest = VeterinaryRequest::findOrFail($id);
            
            // Optional: Check if user is authorized to delete
            // if (auth()->id() !== $vetRequest->user_id) {
            //     return response()->json([
            //         'success' => false,
            //         'message' => 'Unauthorized to delete this request.'
            //     ], 403);
            // }
            
            $vetRequest->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Veterinary request deleted successfully.'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete veterinary request.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

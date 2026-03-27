<?php

// app/Http/Controllers/CMS/MediaController.php
namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
   public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,webp|max:10240',
        ]);

        // --- FIX: Change the store method call ---
        // Specify 'public' disk as the third argument
        $path = $request->file('file')->store('uploads', 'public');
        // The path variable now looks like: 'uploads/GIW7tAK9QepqXzYtH6mj...png'

        return response()->json([
            'url' => Storage::url($path), // This correctly generates 127.0.0.1...
            'path' => $path,
        ]);
    }

    // You also need to fix the delete method to use the 'public' disk explicitly
    public function delete(Request $request)
    {
        $request->validate(['path' => 'required|string']);

        // Check and delete using the 'public' disk
        if (Storage::disk('public')->exists($request->path)) {
            Storage::disk('public')->delete($request->path);
        }

        return response()->json(['success' => true]);
    }

}

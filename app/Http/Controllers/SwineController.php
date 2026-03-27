<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Swine;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SwineController extends Controller
{
    /**
     * Display a listing of the resource.
     */     
     
        public function index()
    {
     

        return Inertia::render('swine/index');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'name' => 'required|string|max:255',
        // ]);

        // Swine::create([
        //     ...$validated,
        //     'owner_id' => auth()->id(),
        // ]);
        // return redirect()->route('swine.index')->with('success', 'Swine created successfully.');
    }

  
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Swine $swine)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //     ]);
    //     $swine->update($validated);
    //     return redirect()->back()->with('success', 'Swine updated successfully.');
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Swine $swine)
    // {
    //     $swine->delete();
    //     return redirect()->back()->with('success', 'Swine deleted successfully.');
    // }
                            
}

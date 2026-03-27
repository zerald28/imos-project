<?php

namespace App\Http\Controllers;

use App\Models\Location\Province;
use App\Models\Location\Municipal;
use App\Models\Location\Barangay;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getProvinces()
    {
        return response()->json(Province::orderBy('name')->get());
    }

    public function getMunicipalities($province_id)
    {
        return response()->json(
            Municipal::where('province_id', $province_id)->orderBy('name')->get()
        );
    }

    public function getBarangays($municipal_id)
    {
        return response()->json(
            Barangay::where('municipal_id', $municipal_id)->orderBy('name')->get()
            
        );
    }
}

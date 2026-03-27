<?php

namespace App\Http\Requests\Marketplace;

use Illuminate\Foundation\Http\FormRequest;

class StoreListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only logged-in users (sellers) can create listings
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            // 🏷️ Core listing fields
            'title' => 'required|string|max:190',
            'category' => 'required|in:breeder,piglet,fattening',
            'breed' => 'nullable|string|max:190',

            'description' => 'nullable|string',
            'price_per_unit' => 'required|numeric|min:0',
            'price_unit_type' => 'required|in:per_head,per_kg',

            // 🖼️ Image upload validation (security)
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            // 📍 Location fields (must exist in lookup tables)
            'province_id' => 'nullable|exists:provinces,id',
            'municipal_id' => 'nullable|exists:municipals,id',
            'barangay_id' => 'nullable|exists:barangays,id',
            'purok' => 'nullable|string|max:100',
            'street' => 'nullable|string|max:190',

            // 🧬 Swine group summary
            'sex_summary' => 'nullable|string|max:100', // e.g., "3 male, 2 female"
            'age_range' => 'nullable|string|max:100', // e.g., "3–6 months"

            // 📦 Available swine count
            'available_quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'category.in' => 'Invalid category. Must be breeder, piglet, or fattening.',
            'price_unit_type.in' => 'Invalid unit type. Must be per_head or per_kg.',
            'image.image' => 'Uploaded file must be an image (jpg, jpeg, or png).',
        ];
    }
}

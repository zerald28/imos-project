<?php

namespace App\Http\Requests\Swine;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Request validation for storing a Swine record
 * File: app/Http/Requests/Swine/StoreSwineRequest.php
 */
class StoreSwineRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Any authenticated user (farmer) can register swine
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'tag_number'   => 'nullable|string|max:50',
            'sex'          => 'required|in:male,female',
            'birthdate'    => 'required|date',
            'breed_id'     => 'nullable|exists:breeds,id',
            'cuztom_breed' => 'nullable|string|max:100',
            'category'     => 'required|in:barrow,gilt,boar,sow,piglet',
            'purpose'      => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
            'weight'       => 'required|numeric|min:0',
            'description'  => 'nullable|string',
        ];
    }
}

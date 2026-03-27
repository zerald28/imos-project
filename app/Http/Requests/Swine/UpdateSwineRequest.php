<?php

namespace App\Http\Requests\Swine;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSwineRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only allow if user can update this swine (policy will check ownership)
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'tag_number'     => 'nullable|string|max:50',
            'sex'          => 'required|in:male,female',
            'birthdate'      => 'required|date',
            'breed_id'       => 'nullable|exists:breeds,id',
            'cuztom_breed'   => 'nullable|string|max:100',
             'category'     => 'required|in:barrow,gilt,boar,sow,piglet',
            'purpose'        => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
            'weight'         => 'required|numeric|min:0',
            'status'         => 'required|in:active,sold,dead,slaughtered,available,inactive',
            'description'    => 'nullable|string',
        ];
    }
}

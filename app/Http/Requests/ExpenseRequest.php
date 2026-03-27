<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by policy or middleware
    }

    public function rules(): array
    {
        return [
            // Category validation
            'category' => 'required|string|in:feed,medicine,labor,utilities,maintenance,equipment,transportation,other',

            // Description
            'description' => 'nullable|string|max:500',

            // Expense details
            'amount' => 'required|numeric|min:0.01',
            'quantity' => 'nullable|numeric|min:0',     // 🆕
            'unit' => 'nullable|string|max:50',         // 🆕

            // Date
            'date' => 'required|date',

            // Group or individual swines
            'group_id' => 'nullable|integer|exists:swine_groups,id',
            'swine_ids' => 'nullable|array',
            'swine_ids.*' => 'integer|exists:swine,id',
        ];
    }

    public function messages(): array
    {
        return [
            'category.required' => 'Please select a category for the expense.',
            'amount.required' => 'Please enter the total amount of the expense.',
            'amount.min' => 'The amount must be at least 0.01.',
            'date.required' => 'Please select the expense date.',
            'swine_ids.*.exists' => 'One or more selected swines are invalid.',
        ];
    }
}

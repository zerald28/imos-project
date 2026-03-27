<?php
namespace App\Http\Requests\Marketplace;

use Illuminate\Foundation\Http\FormRequest;

class AddSwineRequest extends FormRequest
{
    public function authorize()
    {
       return $this->user()?->hasRole('seller');
    }

    public function rules()
    {
        return [
            'swine_ids' => 'required|array|min:1',
            'swine_ids.*' => 'integer|exists:swine,id',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "product_name" => ['required', 'unique:App\Models\Product,product_name', 'max:255'],
            "product_reference" => ['required'],
            "product_size" => ['required'], // Multiple rules in Array format
            "product_description" => ['required', 'max:255', 'nullable'],
            "product_image" => 'nullable|max:255', //Multiple rules in String format
            "category_id" => ['required','integer'],
            "product_price" => ['required', 'integer']
        ];
    }
}

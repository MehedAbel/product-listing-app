<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductUserCart;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddToCartRequest extends FormRequest
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
            'product_id' => ['required', 'numeric', 'exists:products,id'],
        ];
    }

    public function addToCart()
    {
        $user = Auth::user();

        $product_user_cart = ProductUserCart::create([
            'user_id' => $user->id,
            'product_id' => $this->product_id
        ]);

        return $product_user_cart;
    }
}

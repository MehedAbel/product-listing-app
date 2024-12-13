<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'description' => ['required', 'string'],
            'category_id' => ['numeric', 'nullable'],
            'images.*' => ['image', 'nullable', 'mimes:jpeg,png,jpg,gif,svg'],
        ];
    }

    public function createProduct()
    {
        $product = Product::create([
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'user_id' => app('auth')->user()->id,
        ]);

        if ($this->hasFile('images')) {
            foreach ($this->file('images') as $file) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $file->store('products_images', 'public'),
                ]);
            }
        }

        return $product;
    }
}

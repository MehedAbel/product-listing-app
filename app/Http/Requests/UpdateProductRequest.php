<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class UpdateProductRequest extends FormRequest
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
            'deleted_images_ids.*' => ['numeric'],
            'new_images.*' => ['image', 'nullable', 'mimes:jpeg,png,jpg,gif,svg'],
        ];
    }

    public function updateProduct(Product $product)
    {
        $product->update([
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'category_id' => $this->category_id,
        ]);

        if ($this->has('deleted_images_ids')) {
            $imagesToDelete = $product->images()->whereIn('id', $this->deleted_images_ids)->get();
            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->path);
            }

            $product->images()->whereIn('id', $this->deleted_images_ids)->delete();
        }

        if ($this->hasFile('new_images')) {
            foreach ($this->file('new_images') as $file) {
                $product->images()->create([
                    'path' => $file->store('products_images', 'public'),
                ]);
            }
        }

        return $product;
    }
}

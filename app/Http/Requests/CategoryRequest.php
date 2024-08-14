<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Category;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'order' => ['required', 'numeric'],
        ];
    }

    public function updateOrCreate(?Category $category = null)
    {
        if (!$category) {
            $category = new Category();
        }

        $category->name = $this->name;
        $category->order = $this->order;
        $category->save();
    }
}

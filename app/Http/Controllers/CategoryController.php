<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function list()
    {
        return Inertia::render('Categories/List', [
            'user' => Auth::user(),
            'paginated' => Category::orderBy('created_at', 'desc')->paginate(15),
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/AddEdit', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Category $category)
    {
        return Inertia::render('Categories/AddEdit', [
            'user' => Auth::user(),
            'category' => $category
        ]);
    }

    public function store(?Category $category = null, CategoryRequest $request)
    {
        $request->updateOrCreate($category);

        return redirect()->route('categories.list')->with('success', 'Category saved successfully');
    }

    public function delete(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.list')->with('success', 'Category deleted successfully');
    }
}

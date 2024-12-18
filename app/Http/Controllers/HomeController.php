<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $queryParameters = request()->query();
        $categories = explode('_', $queryParameters['categories'] ?? '');
        $search = $queryParameters['search'] ?? '';
        $query = Product::orderBy('created_at', 'desc');

        if (!empty($categories[0])) {
            if (in_array('none', $categories)) {
                $query->whereIn('category_id', $categories)->orwhereNull('category_id');
            } else {
                $query->whereIn('category_id', $categories);
            }
        }

        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $products = $query->paginate(12);

        foreach ($products as $product) {
            $images = $product->images()->get();
            foreach ($images as $image) {
                $image->path = Storage::url($image->path);
            }
            $category = $product->category()->get()->first();
            $product->images = $images;
            $product->category = $category;
        }

        $products->appends($queryParameters);

        $categories = Category::all();
        $categories->prepend((object) ['id' => 'none', 'name' => 'No Category']);

        return Inertia::render('Welcome', [
            'user' => Auth::user(),
            'paginated' => $products,
            'categories' => $categories,
            'queryParameters' => $queryParameters,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}

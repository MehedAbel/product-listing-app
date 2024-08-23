<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        return Inertia::render('Products/List', [
            'paginated' => $products,
            'categories' => $categories,
            'queryParameters' => $queryParameters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Products/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $request->createProduct();

        return redirect()->route('products.index')->with('success', 'Product saved successfully : ');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $images = $product->images()->get();
        foreach ($images as $image) {
            $image->path = Storage::url($image->path);
        }

        return Inertia::render('Products/Show', [
            'product' => $product,
            'category' => $product->category()->get()->first(),
            'images' => $images,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $images = $product->images()->get();
        foreach ($images as $image) {
            $image->path = Storage::url($image->path);
        }

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::all(),
            'images' => $images,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product = $request->updateProduct($product);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $product->delete();

        return back()->with('success', 'Product deleted successfully');
    }
}

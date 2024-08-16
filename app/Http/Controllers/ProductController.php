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
        $products = Product::paginate(12);

        foreach ($products as $product) {
            $images = $product->images()->get();
            $category = $product->category()->get()->first();
            $product->images = $images;
            $product->category = $category;
        }

        return Inertia::render('Products/List', [
            'paginated' => $products,
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
        $product = $request->createProduct();
        $image = ProductImage::where('product_id', $product->id)->first();
        $json_product = $product->toArray();

        return redirect()->route('products.index')->with('success', 'Product saved successfully : ' . json_encode($json_product) . ' Image : ' . json_encode($image));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product,
            'category' => $product->category()->get()->first(),
            'images' => $product->images()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::all(),
            'images' => $product->images()->get(),
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
        $product->images()->delete();
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}

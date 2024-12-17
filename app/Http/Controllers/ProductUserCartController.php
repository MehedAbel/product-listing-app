<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use Illuminate\Http\Request;
use App\Models\ProductUserCart; 
use App\Models\Product; 
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductUserCartController extends Controller
{
    public function addProduct(Request $request) {
        $user = Auth::user();
        $product_id = $request->product_id;
        $product = Product::find($product_id);

        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
    
        $exists = ProductUserCart::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->exists();
    
        if ($exists) {
            return redirect()->back()->with('success', 'Product is already in your shopping bag.');
        }

        if ($product) {
            ProductUserCart::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
            ]);
        }
    
        return redirect()->back()->with('success', 'Product added to shopping bag successfully.');
    }

    public function delete(Request $request) {

        $id = $request->query('id');

        $deleted = ProductUserCart::where('id', $id)->delete();

        if ($deleted) {
            return back()->with('success', 'Product removed successfully.');
        }

        return back()->with('error', 'Failed to remove the product.');
    }

    public function getProducts(Request $request) {
        $user = Auth::user();
        $products = ProductUserCart::where('user_id', $user->id)->with('product')->get();
            
        return Inertia::render('Bag/List', [
            'user' => $user,
            'products' => $products
        ]);
    }
}

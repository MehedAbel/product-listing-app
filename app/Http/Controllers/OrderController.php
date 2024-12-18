<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ProductUserCart;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function createOrder(Request $request) {
        $user = Auth::user();

        $request->validate([
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20' 
        ]);

        $shoppingBagProducts = ProductUserCart::where('user_id', $user->id)->get();

        if ($shoppingBagProducts->isEmpty()) {
            return back()->with('error', 'Your shopping bag is empty.');
        }

        $products = $shoppingBagProducts->map(function($cartItem) {
            $product = $cartItem->product;
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
            ];
        });

        $totalPrice = $products->sum('price');

        $order = Order::create([
            'user_id' => $user->id,
            'products' => $products, 
            'total_price' => $totalPrice,
            'address' => $request->address,
            'phone_number' => $request->phone_number
        ]);

        ProductUserCart::where('user_id', $user->id)->delete();

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function index() {
        $orders = Auth::user()->orders;

        return Inertia::render('Orders/Index', [
            'user' => Auth::user(),
            'orders' => $orders
        ]);
    }

    public function allOrders() {
        $orders = Order::all();

        return Inertia::render('Orders/All', [
           'user' => Auth::user(),
           'orders' => $orders
        ]);
    }

    public function deleteOrder(Request $request) {
        $id = $request->query('id');

        $deleted = Order::where('id', $id)->delete();

        if ($deleted) {
            return back()->with('success', 'Order removed successfully.');
        }

        return back()->with('error', 'Failed to remove the order.');
    }
}

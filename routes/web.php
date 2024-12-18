<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductUserCartController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products/{product}', [ProductController::class, 'show'])->where('product', '[0-9]+')->name('products.show');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/', [CategoryController::class, 'list'])->name('list');
        Route::get('/create', [CategoryController::class, 'create'])->name('create');
        Route::get('/edit/{category}', [CategoryController::class, 'update'])->name('update');
        Route::post('/store/{category?}', [CategoryController::class, 'store'])->name('store');
        Route::delete('{category}', [CategoryController::class, 'delete'])->name('delete');
    });

    Route::resource('products', ProductController::class)->except(['show']);

    Route::group(['prefix' => 'shopping-bag', 'as' => 'shopping-bag.'], function () {
        Route::get('/', [ProductUserCartController::class, 'getProducts'])->name('list');
        Route::post('/add', [ProductUserCartController::class, 'addProduct'])->name('add');
        Route::delete('/remove', [ProductUserCartController::class, 'delete'])->name('remove');
    });

    Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
        Route::post('/', [OrderController::class, 'createOrder'])->name('create');
        Route::get('/index', [OrderController::class, 'index'])->name('index');
        Route::get('/all', [OrderController::class, 'allOrders'])->name('all');
        Route::delete('/delete', [OrderController::class, 'deleteOrder'])->name('delete');
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

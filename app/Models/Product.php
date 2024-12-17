<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    // use HasFactory;
    use HasTimestamps, HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shoppingBags() {
        return $this->belongsToMany(ShoppingBag::class)->withPivot('quantity');
    }

    public function orders() {
        return $this->belongsToMany(Order::class)->withPivot('quantity', 'price');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}

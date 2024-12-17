<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingBag extends Model
{
    // use HasFactory;
    use HasTimestamps, HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->hasMany(Product::class)->withPivot('quantity');
    }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    // use HasFactory;
    use HasTimestamps, HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'products',
        'address',
        'phone_number'
    ];

    protected $casts = [
        'products' => 'array'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

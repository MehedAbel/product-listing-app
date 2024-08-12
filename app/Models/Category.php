<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Testing\Fluent\Concerns\Has;

class Category extends Model
{
    // use HasFactory;
    use HasTimestamps, HasFactory;

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}

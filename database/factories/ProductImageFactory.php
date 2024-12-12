<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Stringable;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $directory = 'products_images';
        Storage::disk('public')->makeDirectory($directory);

        $imageUrl = 'https://picsum.photos/900/700';

        $filename = Str::random(10) . '.jpg';

        try {
            $imageContent = Http::get($imageUrl)->body();
            Storage::disk('public')->put($directory . '/' . $filename, $imageContent);
        } catch (\Exception $e) {
            Log::warning("Error downloading image: " . $e->getMessage());

            $filename = 'frozen_lake.jpg';
        }

        return [
            'product_id' => $this->faker->numberBetween(1, 24),
            'path' => $directory . '/' . $filename,
        ];
    }
}

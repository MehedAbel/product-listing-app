<?php

namespace Database\Seeders;

use App\Models\Favorite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 2; $i++) {
            $u_id = $i;
            for ($j = 1; $j <= 10; $j += 2) {
                $p_id = $j;
                $favorite = new Favorite();

                if ($favorite->where('user_id', $u_id)->where('product_id', $p_id)->exists()) {
                    continue;
                }

                $favorite->user_id = $u_id;
                $favorite->product_id = $p_id;
                $favorite->save();
            }
        }
    }
}

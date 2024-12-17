<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shopping_bag_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shopping_bag_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); 
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_bag_product');
    }
};

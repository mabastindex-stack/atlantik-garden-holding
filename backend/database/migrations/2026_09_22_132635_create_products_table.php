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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category');
            $table->foreignId('factory_id')->constrained('factories')->cascadeOnDelete();
            $table->decimal('price', 10, 2);
            $table->string('unit');
            $table->unsignedTinyInteger('discount')->default(0);
            $table->string('art')->nullable();
            $table->string('tint')->nullable();
            $table->string('image')->nullable();
            $table->string('short');
            $table->text('description');
            $table->json('features');
            $table->string('packaging');
            $table->string('shelf_life');
            $table->string('moq');
            $table->string('season');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

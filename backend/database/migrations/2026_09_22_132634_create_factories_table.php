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
        Schema::create('factories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('country');
            $table->string('code', 2);
            $table->string('city');
            $table->string('agency');
            $table->string('director');
            $table->string('since', 4);
            $table->string('employees');
            $table->string('capacity');
            $table->json('certs');
            $table->string('image')->nullable();
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factories');
    }
};

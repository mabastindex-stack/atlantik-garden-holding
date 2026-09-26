<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('factories', function (Blueprint $table) {
            $table->string('video')->nullable()->after('image');
            $table->json('gallery')->nullable()->after('video');
            $table->decimal('lat', 10, 7)->nullable()->after('gallery');
            $table->decimal('lng', 10, 7)->nullable()->after('lat');
        });
    }

    public function down(): void
    {
        Schema::table('factories', function (Blueprint $table) {
            $table->dropColumn(['video', 'gallery', 'lat', 'lng']);
        });
    }
};

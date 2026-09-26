<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agents', function (Blueprint $table) {
            $table->string('video')->nullable()->after('logo');
            $table->json('gallery')->nullable()->after('video');
            $table->text('bio')->nullable()->after('gallery');
        });
    }

    public function down(): void
    {
        Schema::table('agents', function (Blueprint $table) {
            $table->dropColumn(['video', 'gallery', 'bio']);
        });
    }
};

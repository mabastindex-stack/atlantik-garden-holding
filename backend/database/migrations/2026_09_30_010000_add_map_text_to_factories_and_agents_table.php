<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('factories', function (Blueprint $table) {
            $table->string('mapHeading')->nullable()->after('lng');
            $table->string('mapText')->nullable()->after('mapHeading');
        });

        Schema::table('agents', function (Blueprint $table) {
            $table->string('mapHeading')->nullable()->after('lng');
            $table->string('mapText')->nullable()->after('mapHeading');
        });
    }

    public function down(): void
    {
        Schema::table('factories', function (Blueprint $table) {
            $table->dropColumn(['mapHeading', 'mapText']);
        });

        Schema::table('agents', function (Blueprint $table) {
            $table->dropColumn(['mapHeading', 'mapText']);
        });
    }
};

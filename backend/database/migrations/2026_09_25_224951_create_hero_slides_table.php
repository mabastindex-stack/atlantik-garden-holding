<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->timestamps();
        });

        $this->seedDefaults();
    }

    private function seedDefaults(): void
    {
        $unsplash = fn (string $id, int $w = 1920) => "https://images.unsplash.com/photo-{$id}?auto=format&fit=crop&w={$w}&q=80";

        $settings = DB::table('settings')->first();
        $companyHero = null;
        if ($settings && $settings->company) {
            $company = json_decode($settings->company, true);
            $companyHero = $company['hero'] ?? null;
        }

        DB::table('hero_slides')->insert([
            [
                'image' => $companyHero ?: $unsplash('1758573728869-d25eb4bafb67'),
                'caption' => $companyHero ? null : 'Golden wheat, Egypt',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'image' => $unsplash('1635176490410-5116fc497d45'),
                'caption' => 'Wheat ready for harvest',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'image' => $unsplash('1689954517393-a60459f43f77'),
                'caption' => 'Pomegranate after rain, Morocco',
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};

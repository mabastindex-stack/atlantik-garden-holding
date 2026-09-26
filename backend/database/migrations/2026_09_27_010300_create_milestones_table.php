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
        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->string('year', 8);
            $table->string('text');
            $table->timestamps();
        });

        $this->backfillFromSettings();
    }

    private function backfillFromSettings(): void
    {
        $settings = DB::table('settings')->first();
        if (! $settings || ! $settings->company) {
            return;
        }

        $company = json_decode($settings->company, true);
        $milestones = $company['milestones'] ?? [];

        foreach ($milestones as $m) {
            $year = trim($m['y'] ?? '');
            $text = trim($m['t'] ?? '');
            if ($year === '' && $text === '') {
                continue;
            }

            DB::table('milestones')->insert([
                'year' => $year,
                'text' => $text,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};

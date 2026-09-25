<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('question');
            $table->text('answer');
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
        $faqs = $company['faqs'] ?? [];
        $slugs = [];

        foreach ($faqs as $f) {
            $question = trim($f['q'] ?? '');
            if ($question === '') {
                continue;
            }

            $base = Str::slug($question) ?: 'question';
            $slug = $base;
            $i = 2;
            while (in_array($slug, $slugs) || DB::table('faqs')->where('slug', $slug)->exists()) {
                $slug = $base.'-'.$i++;
            }
            $slugs[] = $slug;

            DB::table('faqs')->insert([
                'slug' => $slug,
                'question' => $question,
                'answer' => trim($f['a'] ?? ''),
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
        Schema::dropIfExists('faqs');
    }
};

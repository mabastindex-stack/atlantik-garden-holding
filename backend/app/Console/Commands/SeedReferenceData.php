<?php

namespace App\Console\Commands;

use App\Models\Agent;
use App\Models\Category;
use App\Models\Country;
use App\Models\Factory;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SeedReferenceData extends Command
{
    protected $signature = 'agh:seed-reference-data';

    protected $description = 'Create Category and Country rows for values already used by existing products, factories or agents, without touching any existing data';

    private const KNOWN_COUNTRIES = [
        'ES' => 'Spain', 'IT' => 'Italy', 'FR' => 'France', 'DE' => 'Germany',
        'NL' => 'Netherlands', 'PT' => 'Portugal', 'GR' => 'Greece', 'TR' => 'Türkiye',
        'IQ' => 'Iraq', 'KU' => 'Kurdistan Region', 'EG' => 'Egypt', 'MA' => 'Morocco',
        'AE' => 'United Arab Emirates', 'SA' => 'Saudi Arabia', 'IN' => 'India', 'BR' => 'Brazil',
    ];

    public function handle(): int
    {
        $categoryNames = Product::query()->pluck('category')->filter()->unique();
        foreach ($categoryNames as $name) {
            if (Category::where('name', $name)->exists()) {
                continue;
            }
            Category::create([
                'slug' => $this->uniqueSlug(Category::class, $name),
                'name' => $name,
            ]);
            $this->info("Created category: {$name}");
        }

        $codes = Factory::query()->pluck('code')
            ->merge(Agent::query()->pluck('code'))
            ->filter()
            ->map(fn ($code) => strtoupper($code))
            ->unique();

        foreach ($codes as $code) {
            if (Country::where('code', $code)->exists()) {
                continue;
            }
            $name = self::KNOWN_COUNTRIES[$code] ?? $code;
            Country::create([
                'slug' => $this->uniqueSlug(Country::class, $name),
                'name' => $name,
                'code' => $code,
            ]);
            $this->info("Created country: {$name} ({$code})");
        }

        $this->info('Reference data is up to date. Nothing else was changed.');

        return self::SUCCESS;
    }

    private function uniqueSlug(string $model, string $name): string
    {
        $base = Str::slug($name) ?: 'item';
        $slug = $base;
        $i = 2;
        while ($model::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}

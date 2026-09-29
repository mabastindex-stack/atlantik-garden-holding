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
        Schema::create('highlights', function (Blueprint $table) {
            $table->id();
            $table->enum('section', ['home_pillars', 'process_steps', 'about_pillars']);
            $table->string('icon')->default('leaf');
            $table->string('title');
            $table->text('text');
            $table->string('linkUrl')->nullable();
            $table->string('linkLabel')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('statNumber')->nullable();
            $table->string('statLabel')->nullable();
            $table->timestamps();
        });

        $this->seedDefaults();
    }

    private function seedDefaults(): void
    {
        $now = now();

        $countries = DB::table('factories')->distinct()->count('code');
        $products = DB::table('products')->count();
        $agents = DB::table('agents')->count();

        $rows = [
            [
                'section' => 'home_pillars', 'icon' => 'leaf',
                'title' => 'Grown near the source',
                'text' => 'Growers work within a short drive of each factory, so fruit and grain reach the packing line hours after harvest.',
                'linkUrl' => '#/factories', 'linkLabel' => 'Meet the factories',
            ],
            [
                'section' => 'home_pillars', 'icon' => 'box',
                'title' => 'Packed where it is picked',
                'text' => 'Sorting, packing and quality checks happen on site, with lot numbers that follow the product all the way to you.',
                'linkUrl' => '#/products', 'linkLabel' => 'Browse products',
            ],
            [
                'section' => 'home_pillars', 'icon' => 'route',
                'title' => 'Delivered by people you can call',
                'text' => 'Every order goes through an authorised agent who knows your market, your paperwork and your delivery window.',
                'linkUrl' => '#/agents', 'linkLabel' => 'Find an agent',
            ],
            [
                'section' => 'process_steps', 'icon' => 'leaf',
                'title' => 'Harvest',
                'text' => 'Picked at peak ripeness by the growers we work with, close to each factory.',
            ],
            [
                'section' => 'process_steps', 'icon' => 'search',
                'title' => 'Sort and grade',
                'text' => 'Optical and hand sorting by size, colour and quality, with samples tested in our lab.',
            ],
            [
                'section' => 'process_steps', 'icon' => 'box',
                'title' => 'Pack and label',
                'text' => 'Packed on site in the format you need, with a lot number that stays with the product.',
            ],
            [
                'section' => 'process_steps', 'icon' => 'route',
                'title' => 'Ship and deliver',
                'text' => 'Sent by sea or road, in refrigerated containers where needed, and handed to your agent.',
            ],
            [
                'section' => 'about_pillars', 'icon' => 'leaf',
                'title' => 'Grown near the source',
                'text' => 'We choose growers who work close to each factory, so produce reaches the packing line hours after harvest.',
                'statNumber' => $countries, 'statLabel' => 'countries of origin',
            ],
            [
                'section' => 'about_pillars', 'icon' => 'box',
                'title' => 'Handled with care',
                'text' => 'Every factory packs on site, so nothing travels further than it has to before it reaches your agent.',
                'statNumber' => $products, 'statLabel' => 'products packed at source',
            ],
            [
                'section' => 'about_pillars', 'icon' => 'route',
                'title' => 'Delivered in person',
                'text' => 'No call centres. Every order is answered by an agent who knows your market by name.',
                'statNumber' => $agents, 'statLabel' => 'authorised agents on call',
            ],
        ];

        foreach ($rows as $row) {
            DB::table('highlights')->insert(array_merge([
                'linkUrl' => null, 'linkLabel' => null, 'image' => null,
                'statNumber' => null, 'statLabel' => null,
                'created_at' => $now, 'updated_at' => $now,
            ], $row));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('highlights');
    }
};

<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\Announcement;
use App\Models\Factory;
use App\Models\Product;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@atlantikgarden.com'],
            ['name' => 'Admin', 'password' => 'Atlantik@2025']
        );

        Setting::query()->delete();
        Setting::create([
            'company' => [
                'name' => 'Atlantik Garden Holding',
                'tagline' => 'Rooted in good soil, sent gently across the world.',
                'intro' => 'We grow, pack and ship fruit, grain, oils and nuts from working factories in four countries, straight to buyers and trusted agents.',
                'email' => 'hello@atlantikgarden.com',
                'phone' => '+964 750 000 0000',
                'address' => 'Head office, City, Country',
                'currency' => '$',
                'logo' => '',
                'hero' => '',
                'aboutImage' => '',
                'story' => "Atlantik Garden Holding began with a simple idea: the best produce is grown close to good soil and handled by people who care how it arrives. Today we work through factories in Spain, Türkiye, the Kurdistan Region and Egypt, each partnered with growers nearby.\n\nEvery factory packs at source, keeps its own quality records and ships through our network of authorised agents, so buyers deal with a person they can call rather than a faceless catalogue.",
                'milestones' => [
                    ['y' => '2011', 't' => 'Our first factory opens in Almería, Spain, pressing olive oil and packing almonds.'],
                    ['y' => '2014', 't' => 'A second factory in Türkiye begins packing pomegranates and pistachios.'],
                    ['y' => '2016', 't' => 'The Kurdistan Region factory starts milling wheat and packing vegetables.'],
                    ['y' => '2018', 't' => 'Egypt joins the group with citrus and date orchards.'],
                    ['y' => '2024', 't' => 'Authorised agent network expands to four regions.'],
                ],
            ],
            'socials' => [
                'facebook' => 'https://www.facebook.com/',
                'instagram' => 'https://www.instagram.com/',
                'whatsapp' => 'https://wa.me/9647500000000',
                'telegram' => 'https://t.me/',
                'linkedin' => 'https://www.linkedin.com/',
                'tiktok' => '',
                'youtube' => '',
            ],
            'agent' => [
                'name' => 'Atlantik Kurdistan Sales Center',
                'tagline' => 'Authorised agent of Atlantik Garden Holding for Iraq and the Kurdistan Region.',
                'since' => '2016',
                'territory' => 'Iraq and the Kurdistan Region',
                'license' => 'AGH-AG-0412',
                'logo' => '',
                'story' => "Our team represents Atlantik Garden Holding across Iraq and the Kurdistan Region. We handle orders, cold storage and last-mile delivery, and we keep buyers informed about prices, seasons and new arrivals in Kurdish, Arabic and English.\n\nWhether you supply a single shop or a chain of supermarkets, you get one contact who knows your orders and your delivery window.",
                'services' => [
                    'Wholesale supply of all Atlantik products',
                    'Cold-chain storage and delivery',
                    'Private-label packing on request',
                    'Weekly price and season updates',
                    'Sample packs for new buyers',
                ],
                'stats' => [
                    ['n' => '8', 'l' => 'Years as authorised agent'],
                    ['n' => '140+', 'l' => 'Active buyers'],
                    ['n' => '3,200 t', 'l' => 'Delivered each year'],
                ],
            ],
        ]);

        Product::query()->delete();
        Factory::query()->delete();

        $factories = [
            [
                'slug' => 'f-es', 'country' => 'Spain', 'code' => 'ES', 'city' => 'Almería, Andalusia',
                'agency' => 'Atlantik Iberia S.L.', 'director' => 'Carlos Mendoza Ruiz', 'since' => '2011',
                'employees' => '240', 'capacity' => '18,000 tonnes a year',
                'certs' => ['GlobalG.A.P.', 'BRC Food', 'EU Organic'],
                'description' => "Our oldest factory sits between olive groves and the greenhouse belt of southern Spain. Olives are pressed within hours of picking, and almonds are shelled, sorted and packed in a single line.\n\nThe plant runs its own laboratory, so every lot of oil is tested for acidity and taste before it is bottled. Growers within 60 km supply most of the fruit.",
            ],
            [
                'slug' => 'f-tr', 'country' => 'Türkiye', 'code' => 'TR', 'city' => 'Gaziantep and İzmir',
                'agency' => 'Atlantik Anadolu Tarım A.Ş.', 'director' => 'Elif Yılmaz', 'since' => '2014',
                'employees' => '160', 'capacity' => '9,500 tonnes a year',
                'certs' => ['ISO 22000', 'HACCP', 'GlobalG.A.P.'],
                'description' => "Two sites work together here: Gaziantep for pistachios and İzmir for pomegranates. Both regions have grown these crops for centuries, and our growers know the trees by name.\n\nFruit is graded by colour and size on optical sorters, then packed in cartons or vacuum bags depending on the market.",
            ],
            [
                'slug' => 'f-ku', 'country' => 'Kurdistan Region, Iraq', 'code' => 'KU', 'city' => 'Erbil',
                'agency' => 'Atlantik Kurdistan Agro', 'director' => 'Dilshad Karim', 'since' => '2016',
                'employees' => '120', 'capacity' => '22,000 tonnes a year',
                'certs' => ['ISO 9001', 'HACCP'],
                'description' => "The Erbil plain is some of the best wheat land in the region. Our mill cleans, grades and stores durum wheat, while a packing hall handles tomatoes and fresh herbs from nearby farms.\n\nBecause the factory is close to our home market, produce reaches shops in Erbil, Sulaymaniyah and Kirkuk within a day.",
            ],
            [
                'slug' => 'f-eg', 'country' => 'Egypt', 'code' => 'EG', 'city' => 'Beheira Governorate',
                'agency' => 'Atlantik Nile Farms', 'director' => 'Omar El-Sayed', 'since' => '2018',
                'employees' => '190', 'capacity' => '14,000 tonnes a year',
                'certs' => ['GlobalG.A.P.', 'HACCP', 'Halal'],
                'description' => "West of the Nile delta, our orchards produce navel oranges in winter and Siwi dates in autumn. Fruit goes from tree to cold room in under four hours.\n\nThe factory ships by sea from Alexandria and by road to neighbouring markets, with temperature loggers in every container.",
            ],
        ];

        $factoryIds = [];
        foreach ($factories as $f) {
            $slug = $f['slug'];
            $f['image'] = "assets/img/factories/{$slug}.jpg";
            $factoryIds[$slug] = Factory::create($f)->id;
        }

        $products = [
            ['slug' => 'p-oil', 'name' => 'Extra Virgin Olive Oil', 'category' => 'Oils', 'factory' => 'f-es', 'price' => 9.8, 'unit' => 'L', 'discount' => 8, 'art' => 'oil', 'tint' => '#C9D67A',
                'short' => 'Cold-extracted from Picual olives and bottled within days of pressing.',
                'description' => 'Pressed within hours of harvest at our Almería mill and bottled under nitrogen to keep the fruitiness intact. A green-gold oil with a soft peppery finish, made for dressing, dipping and finishing rather than frying.',
                'features' => ['Cold extracted below 27 °C', 'Acidity under 0.4%', 'Dark glass, nitrogen-flushed', 'Traceable to the harvest lot'],
                'packaging' => '250 ml, 500 ml and 1 L bottles; 5 L tins', 'shelf_life' => '18 months', 'moq' => '1 pallet (about 600 L)', 'season' => 'Harvest October to December'],
            ['slug' => 'p-olives', 'name' => 'Manzanilla Green Olives', 'category' => 'Fruit', 'factory' => 'f-es', 'price' => 3.4, 'unit' => 'kg', 'discount' => 0, 'art' => 'olives', 'tint' => '#B7CC78',
                'short' => 'Firm, buttery table olives cured in brine the traditional way.',
                'description' => 'Hand-sorted by size and cured slowly in stainless tanks. Available whole, pitted or stuffed with almond, pepper or garlic.',
                'features' => ['Brine-cured, no artificial colour', 'Sizes 18/20 to 24/26', 'Whole, pitted or stuffed', 'Ready-to-serve pouches'],
                'packaging' => '1 kg to 5 kg pouches; 20 kg drums', 'shelf_life' => '24 months', 'moq' => '2 tonnes', 'season' => 'September to November'],
            ['slug' => 'p-almonds', 'name' => 'Marcona Almonds', 'category' => 'Nuts', 'factory' => 'f-es', 'price' => 11.2, 'unit' => 'kg', 'discount' => 0, 'art' => 'almonds', 'tint' => '#E6C79A',
                'short' => 'Soft, sweet and rounder than any ordinary almond.',
                'description' => 'Grown on dry-farmed Andalusian slopes and shelled the same week they are dried. Raw, blanched or lightly roasted with sea salt.',
                'features' => ['Raw, blanched or roasted', 'Low moisture, long crunch', 'Sorted by optical grader', 'Aflatoxin tested per lot'],
                'packaging' => '500 g and 1 kg bags; 10 kg cartons', 'shelf_life' => '12 months', 'moq' => '1 tonne', 'season' => 'Harvest August to October'],
            ['slug' => 'p-pom', 'name' => 'Hicaz Pomegranates', 'category' => 'Fruit', 'factory' => 'f-tr', 'price' => 2.1, 'unit' => 'kg', 'discount' => 0, 'art' => 'pomegranate', 'tint' => '#F0B6B0',
                'short' => 'Deep-red arils with a bright, balanced sweetness.',
                'description' => 'Hicaz is the classic Turkish variety: thick-skinned, deep crimson and juicy. Picked by hand and graded by size before they leave İzmir.',
                'features' => ['Sizes 350 g and up', 'Deep-red arils', 'Thick skin for long transport', 'Fresh fruit or fresh arils'],
                'packaging' => '4 kg and 5 kg cartons', 'shelf_life' => '8 weeks in cold storage', 'moq' => '1 container (about 20 t)', 'season' => 'October to January'],
            ['slug' => 'p-pist', 'name' => 'Antep Pistachios', 'category' => 'Nuts', 'factory' => 'f-tr', 'price' => 16.5, 'unit' => 'kg', 'discount' => 5, 'art' => 'pistachio', 'tint' => '#CFE0A0',
                'short' => 'Small, intensely green kernels with a rich, buttery flavour.',
                'description' => 'Sourced from family orchards around Gaziantep and dried on raised racks. Sold in shell, shelled or roasted.',
                'features' => ['In shell, shelled or roasted', 'Naturally split shells', 'Vivid green kernels', 'Sorted for colour and size'],
                'packaging' => '1 kg bags; 10 kg vacuum cartons', 'shelf_life' => '12 months', 'moq' => '500 kg', 'season' => 'Harvest September'],
            ['slug' => 'p-wheat', 'name' => 'Hard Durum Wheat', 'category' => 'Grains', 'factory' => 'f-ku', 'price' => 420, 'unit' => 'ton', 'discount' => 0, 'art' => 'wheat', 'tint' => '#EBD08A',
                'short' => 'Clean, high-protein wheat for pasta, bulgur and bread.',
                'description' => 'Grown on the Erbil plain and stored in our own silos. Every lot is tested for protein, moisture and gluten before it is released.',
                'features' => ['Protein 13% or higher', 'Moisture under 12.5%', 'Cleaned and graded', 'Bulk or 50 kg sacks'],
                'packaging' => '50 kg sacks; bulk trucks', 'shelf_life' => '12 months', 'moq' => '25 tonnes', 'season' => 'Harvest May to July'],
            ['slug' => 'p-tomato', 'name' => 'Vine Tomatoes', 'category' => 'Vegetables', 'factory' => 'f-ku', 'price' => 1.2, 'unit' => 'kg', 'discount' => 0, 'art' => 'tomato', 'tint' => '#F2B5A5',
                'short' => 'Sun-ripened tomatoes packed the morning they are picked.',
                'description' => 'Field-grown near Erbil and packed on site. Firm enough for shipping, sweet enough to eat like fruit.',
                'features' => ['Picked vine-ripe', 'Graded by size', 'Cold-room packed', 'Fresh or for paste'],
                'packaging' => '6 kg crates', 'shelf_life' => '10 days', 'moq' => '1 pallet', 'season' => 'May to November'],
            ['slug' => 'p-mint', 'name' => 'Fresh Mint', 'category' => 'Herbs', 'factory' => 'f-ku', 'price' => 6, 'unit' => 'kg', 'discount' => 0, 'art' => 'mint', 'tint' => '#A9D8B6',
                'short' => 'Fragrant spearmint, cut and cooled within the hour.',
                'description' => 'Grown in shaded beds and washed in cold water before packing. A staple for teas, salads and yoghurt dishes.',
                'features' => ['Cut to order', 'Triple washed', 'Bundled or loose', 'Cold-chain delivery'],
                'packaging' => '500 g bundles; 5 kg boxes', 'shelf_life' => '7 days', 'moq' => '50 kg', 'season' => 'Year round'],
            ['slug' => 'p-orange', 'name' => 'Navel Oranges', 'category' => 'Fruit', 'factory' => 'f-eg', 'price' => 1.05, 'unit' => 'kg', 'discount' => 10, 'art' => 'orange', 'tint' => '#F8C98A',
                'short' => 'Seedless, sweet and easy to peel.',
                'description' => 'Tree-ripened in the Nile delta and waxed lightly for shipping. Juicy, low in acid and loved by children.',
                'features' => ['Seedless', 'Brix 11 or higher', 'Sizes 56 to 88', 'Food-grade wax only'],
                'packaging' => '15 kg cartons', 'shelf_life' => '6 weeks in cold storage', 'moq' => '1 container (about 22 t)', 'season' => 'November to April'],
            ['slug' => 'p-dates', 'name' => 'Siwi Dates', 'category' => 'Fruit', 'factory' => 'f-eg', 'price' => 5.6, 'unit' => 'kg', 'discount' => 12, 'art' => 'dates', 'tint' => '#D8B49A',
                'short' => 'Soft, honeyed dates with a caramel finish.',
                'description' => 'Siwi dates are picked at the soft stage and packed by hand. No added sugar, no syrup, just fruit.',
                'features' => ['Hand-packed', 'No added sugar', 'Soft and moist', 'Pitted option'],
                'packaging' => '500 g boxes; 5 kg cartons', 'shelf_life' => '12 months', 'moq' => '500 kg', 'season' => 'September to November'],
        ];

        foreach ($products as $p) {
            $slug = $p['slug'];
            $factorySlug = $p['factory'];
            unset($p['factory']);
            $p['factory_id'] = $factoryIds[$factorySlug];
            $p['image'] = "assets/img/products/{$slug}.jpg";
            Product::create($p);
        }

        Agent::query()->delete();
        $agents = [
            ['slug' => 'a-ku', 'name' => 'Atlantik Kurdistan Sales Center', 'contact' => 'Awat Rashid', 'role' => 'Sales manager', 'code' => 'KU', 'city' => 'Erbil', 'territory' => 'Kurdistan Region and Iraq', 'phone' => '+964 750 000 0001', 'whatsapp' => '+964 750 000 0001', 'email' => 'kurdistan@atlantikgarden.com', 'hours' => 'Saturday to Thursday, 9:00 to 17:00'],
            ['slug' => 'a-ae', 'name' => 'Atlantik Gulf Trading', 'contact' => 'Layla Haddad', 'role' => 'Regional director', 'code' => 'AE', 'city' => 'Dubai', 'territory' => 'GCC countries', 'phone' => '+971 4 000 0002', 'whatsapp' => '+971 50 000 0002', 'email' => 'gulf@atlantikgarden.com', 'hours' => 'Sunday to Thursday, 8:30 to 17:30'],
            ['slug' => 'a-nl', 'name' => 'Atlantik Europe Partners', 'contact' => 'Daan de Vries', 'role' => 'Account lead', 'code' => 'NL', 'city' => 'Rotterdam', 'territory' => 'Benelux and Germany', 'phone' => '+31 10 000 0003', 'whatsapp' => '+31 6 0000 0003', 'email' => 'europe@atlantikgarden.com', 'hours' => 'Monday to Friday, 9:00 to 17:00'],
            ['slug' => 'a-eg', 'name' => 'Nile Fresh Distribution', 'contact' => 'Mona Farouk', 'role' => 'Distribution manager', 'code' => 'EG', 'city' => 'Cairo', 'territory' => 'Egypt and North Africa', 'phone' => '+20 2 0000 0004', 'whatsapp' => '+20 100 000 0004', 'email' => 'egypt@atlantikgarden.com', 'hours' => 'Sunday to Thursday, 9:00 to 16:00'],
        ];
        foreach ($agents as $a) {
            Agent::create($a);
        }

        Announcement::query()->delete();
        $announcements = [
            ['slug' => 'n-dates', 'type' => 'offer', 'title' => 'Autumn dates offer', 'body' => 'Order 500 kg or more of Siwi dates and take 12% off the list price.', 'discount' => 12, 'code' => 'DATES12', 'until' => now()->addDays(45)],
            ['slug' => 'n-oil', 'type' => 'offer', 'title' => 'New-season olive oil', 'body' => "Introductory price on this year's extra virgin olive oil for first-time buyers.", 'discount' => 8, 'code' => 'OLIVE8', 'until' => now()->addDays(30)],
            ['slug' => 'n-ship', 'type' => 'notice', 'title' => 'Holiday shipping schedule', 'body' => 'Dispatch desks close on public holidays. Please book shipments at least ten days ahead.', 'discount' => 0, 'code' => '', 'until' => now()->addDays(60)],
            ['slug' => 'n-samples', 'type' => 'note', 'title' => 'Samples on request', 'body' => 'We send 1 kg sample packs of any product to registered buyers. Ask your agent.', 'discount' => 0, 'code' => '', 'until' => null],
        ];
        foreach ($announcements as $n) {
            Announcement::create($n);
        }
    }
}

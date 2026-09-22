<?php

namespace Tests\Feature\Api;

use App\Models\Factory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CoreApiTest extends TestCase
{
    use RefreshDatabase;

    private function makeFactory(string $slug = 'f-es'): Factory
    {
        return Factory::create([
            'slug' => $slug,
            'country' => 'Spain',
            'code' => 'ES',
            'city' => 'Almería',
            'agency' => 'Atlantik Iberia S.L.',
            'director' => 'Carlos Mendoza Ruiz',
            'since' => '2011',
            'employees' => '240',
            'capacity' => '18,000 tonnes a year',
            'certs' => ['GlobalG.A.P.'],
            'description' => 'A factory.',
        ]);
    }

    public function test_factories_are_publicly_readable(): void
    {
        $this->makeFactory();

        $this->getJson('/api/factories')
            ->assertOk()
            ->assertJsonPath('data.0.id', 'f-es');
    }

    public function test_writing_a_factory_requires_authentication(): void
    {
        $this->postJson('/api/factories', ['slug' => 'f-new'])
            ->assertStatus(401);
    }

    public function test_login_fails_with_wrong_password(): void
    {
        User::factory()->create([
            'email' => 'admin@atlantikgarden.com',
            'password' => 'Atlantik@2025',
        ]);

        $this->postJson('/api/login', [
            'email' => 'admin@atlantikgarden.com',
            'password' => 'wrong',
        ])->assertStatus(422);
    }

    public function test_login_succeeds_and_allows_authenticated_writes(): void
    {
        $this->makeFactory();
        User::factory()->create([
            'email' => 'admin@atlantikgarden.com',
            'password' => 'Atlantik@2025',
        ]);

        $login = $this->postJson('/api/login', [
            'email' => 'admin@atlantikgarden.com',
            'password' => 'Atlantik@2025',
        ])->assertOk();

        $token = $login->json('token');

        $this->postJson('/api/products', [
            'slug' => 'p-test',
            'name' => 'Test Product',
            'category' => 'Fruit',
            'factoryId' => 'f-es',
            'price' => 1.5,
            'unit' => 'kg',
            'short' => 'short',
            'description' => 'description',
            'features' => ['a'],
            'packaging' => 'a box',
            'shelfLife' => '1 week',
            'moq' => '1',
            'season' => 'all',
        ], ['Authorization' => "Bearer {$token}"])
            ->assertStatus(201)
            ->assertJsonPath('data.id', 'p-test')
            ->assertJsonPath('data.factoryId', 'f-es')
            ->assertJsonPath('data.discount', 0);
    }

    public function test_product_rejects_unknown_factory(): void
    {
        User::factory()->create([
            'email' => 'admin@atlantikgarden.com',
            'password' => 'Atlantik@2025',
        ]);
        $token = $this->postJson('/api/login', [
            'email' => 'admin@atlantikgarden.com',
            'password' => 'Atlantik@2025',
        ])->json('token');

        $this->postJson('/api/products', [
            'slug' => 'p-bad',
            'name' => 'Bad',
            'category' => 'Fruit',
            'factoryId' => 'does-not-exist',
            'price' => 1,
            'unit' => 'kg',
            'short' => 's',
            'description' => 'd',
            'features' => ['a'],
            'packaging' => 'p',
            'shelfLife' => '1 week',
            'moq' => '1',
            'season' => 'all',
        ], ['Authorization' => "Bearer {$token}"])
            ->assertStatus(422);
    }
}

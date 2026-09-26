<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    protected $fillable = [
        'slug', 'name', 'contact', 'role', 'code', 'city', 'territory',
        'phone', 'whatsapp', 'email', 'hours', 'logo', 'video', 'gallery', 'bio',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

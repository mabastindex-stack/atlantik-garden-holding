<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Factory extends Model
{
    protected $fillable = [
        'slug', 'country', 'code', 'city', 'agency', 'director',
        'since', 'employees', 'capacity', 'certs', 'image', 'description',
    ];

    protected function casts(): array
    {
        return [
            'certs' => 'array',
        ];
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

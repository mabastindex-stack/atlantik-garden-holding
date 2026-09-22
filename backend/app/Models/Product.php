<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'slug', 'name', 'category', 'factory_id', 'price', 'unit', 'discount',
        'art', 'tint', 'image', 'short', 'description', 'features',
        'packaging', 'shelf_life', 'moq', 'season',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount' => 'integer',
            'features' => 'array',
        ];
    }

    public function factory(): BelongsTo
    {
        return $this->belongsTo(Factory::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

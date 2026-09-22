<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'slug', 'type', 'title', 'body', 'discount', 'code', 'until',
    ];

    protected function casts(): array
    {
        return [
            'discount' => 'integer',
            'until' => 'date',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

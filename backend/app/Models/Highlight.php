<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Highlight extends Model
{
    protected $fillable = [
        'section', 'icon', 'title', 'text',
        'linkUrl', 'linkLabel', 'image',
        'statNumber', 'statLabel',
    ];

    protected function casts(): array
    {
        return [
            'statNumber' => 'integer',
        ];
    }
}

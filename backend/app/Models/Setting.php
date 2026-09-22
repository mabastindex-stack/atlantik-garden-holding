<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['company', 'socials', 'agent'];

    protected function casts(): array
    {
        return [
            'company' => 'array',
            'socials' => 'array',
            'agent' => 'array',
        ];
    }
}

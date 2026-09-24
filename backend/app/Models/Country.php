<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = ['slug', 'name', 'code', 'flag_image'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

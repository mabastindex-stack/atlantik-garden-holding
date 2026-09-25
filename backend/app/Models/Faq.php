<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['slug', 'question', 'answer'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

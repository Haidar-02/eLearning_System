<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    use HasFactory;

    function materials(): HasMany
    {
        return $this->hasMany(Course_Material::class);
    }

    function tasks(): HasMany
    {
        return $this->hasMany(Task::class);

    }

    function sessions(): HasMany
    {
        return $this->hasMany(Session::class);

    }
}

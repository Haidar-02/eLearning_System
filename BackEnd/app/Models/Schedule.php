<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    use HasFactory;

    public function materials(): HasMany
    {
        return $this->hasMany(CourseMaterial::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);

    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);

    }
}

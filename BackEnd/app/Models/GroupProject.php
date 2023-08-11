<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroupProject extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function members(): HasMany
    {
        return $this->hasMany(StudentProject::class);

    }
}


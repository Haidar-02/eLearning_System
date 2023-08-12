<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function submissions(): HasMany
    {
        return $this->hasMany(TaskSubmission::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Schedule;

class CourseMaterial extends Model
{
    use HasFactory;

    public $timestamps = false;
    public function materials(): BelongsTo
    {
        return $this->belongsTo(Schedule::class);
    }

}
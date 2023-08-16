<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroupProject extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function members(): HasMany
    {
        return $this->hasMany(StudentProject::class,"project_id");

    }
    public function membersInfo(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'student_projects','project_id','student_id');
    }
}


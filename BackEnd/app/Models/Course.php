<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    
    public function users() :BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_enrollments','course_id','student_id');
    }

    public $timestamps = false;

}

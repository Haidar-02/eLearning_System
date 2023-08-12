<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'teacher_id',
        'enrollment_limit',
        'class_code'
        ];    
    public function teacher(): HasOne{
       return $this->hasOne(User::class,'id','teacher_id')->select('id','name','email');
    }

    public function students(): BelongsToMany
    {
    return $this->belongsToMany(User::class, 'course_enrollments', 'course_id', 'student_id');
    }

    public function schedules(): HasMany
    {
    return $this->hasMany(Schedule::class);
    }
}

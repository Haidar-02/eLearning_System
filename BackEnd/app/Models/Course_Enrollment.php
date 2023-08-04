<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Course_Enrollment extends Model
{
    use HasFactory;
    protected $table = 'course_enrollments';

    function course()
    {
        return $this->belongsTo(Course::class);
    }

}
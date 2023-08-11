<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class StudentProject extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function info(): HasOne
    {
        return $this->hasOne(User::class,"id","student_id");

    }
}

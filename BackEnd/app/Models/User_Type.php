<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_Type extends Model
{
    protected $table = 'user_types';
    use HasFactory;
    public function users()
    {
        return $this->hasMany(User::class, "user_type");
    }

}
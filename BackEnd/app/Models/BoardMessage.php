<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BoardMessage extends Model
{
    use HasFactory;

    public function user(): HasOne
    {
        return $this->hasOne(User::class)->select('user.id','user.name','user.email');
    }
}

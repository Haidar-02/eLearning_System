<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Message extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function isSender(): HasOne
    {
        return $this->hasOne(User::class, "id", "sender_id")->select('id', 'name', 'user_type');
    }

    public function isReceiver(): HasOne
    {
        return $this->hasOne(User::class, "id", "receiver_id")->select('id', 'name', 'user_type');

    }

}
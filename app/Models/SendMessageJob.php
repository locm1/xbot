<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SendMessageJob extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = ['id'];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function sendMessageJobUser()
    {
        return $this->hasMany(SendMessageJobUser::class);
    }
}

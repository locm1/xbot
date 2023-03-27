<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SendMessage extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function sendMessageUsers()
    {
        return $this->hasMany(SendMessageUser::class);
    }
}

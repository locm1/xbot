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

    public function sendMessage()
    {
        return $this->belongsTo(SendMessage::class);
    }
}

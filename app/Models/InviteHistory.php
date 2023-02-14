<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviteHistory extends Model
{
    use HasFactory;

    public function inviterUsers()
    {
        return $this->belongsTo(User::class, 'inviter_user_id', 'id');
    }

    public function inviteeUsers()
    {
        return $this->belongsTo(User::class, 'invitee_user_id', 'id');
    }
}

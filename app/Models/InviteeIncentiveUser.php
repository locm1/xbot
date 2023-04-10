<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InviteeIncentiveUser extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function inviteIncentive()
    {
        return $this->belongsTo(InviteIncentive::class);
    }

    public function inviterIncentiveUser()
    {
        return $this->belongsTo(InviterIncentiveUser::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

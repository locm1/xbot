<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviterIncentive extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function inviteIncentiveJob()
    {
        return $this->belongsTo(InviteIncentiveJob::class);
    }

    public function inviteIncentive()
    {
        return $this->belongsTo(InviteIncentive::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

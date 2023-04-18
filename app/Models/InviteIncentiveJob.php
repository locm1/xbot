<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviteIncentiveJob extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function inviteIncentive()
    {
        return $this->belongsTo(inviteIncentive::class);
    }
}

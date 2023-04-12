<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DefaultInviteIncentive extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Get the user associated with the DefaultInviteIncentive
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function inviteIncentive()
    {
        return $this->belongsTo(InviteIncentive::class);
    }
}

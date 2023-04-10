<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InviteIncentive extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Get the user associated with the Invitation
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    /**
     * Get the user that owns the Invitation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function inviterIncentiveUsers()
    {
        return $this->hasMany(InviterIncentiveUser::class);
    }
}

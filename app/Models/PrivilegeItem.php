<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrivilegeItem extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'privilege_id',
        'name'
    ];

    /**
     * Get the user that owns the PrivilegeItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function privilege()
    {
        return $this->belongsTo(Privilege::class);
    }
}

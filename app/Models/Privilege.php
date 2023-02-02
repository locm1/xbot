<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Privilege extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'visits_times',
    ];

    /**
     * Get all of the comments for the Privilege
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function privilegeItems()
    {
        return $this->hasMany(PrivilegeItem::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Postage extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'pref_id',
        'postage',
    ];
    
    /**
     * Get the user that owns the Postage
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class);
    }
}

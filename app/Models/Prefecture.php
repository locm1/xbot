<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prefecture extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Get the user associated with the Prefecture
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function postage()
    {
        return $this->hasOne(postage::class);
    }
}

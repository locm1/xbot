<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultSegment extends Model
{
    use HasFactory;

    public function defaultSegmentItems()
    {
        return $this->hasMany(DefaultSegmentItem::class);
    }
}

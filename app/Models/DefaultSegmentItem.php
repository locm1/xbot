<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultSegmentItem extends Model
{
    use HasFactory;

    public function defaultSegmentTemplateItems()
    {
        return $this->hasOne(DefaultSegmentTemplateItem::class);
    }
}

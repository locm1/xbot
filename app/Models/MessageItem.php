<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MessageItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    public function messageItems()
    {
        return $this->belongsTo(Message::class);
    }

    public function CarouselImages()
    {
        return $this->hasMany(MessageItemCarouselImage::class);
    }

    public function CarouselProducts()
    {
        return $this->hasMany(MessageItemCarouselProduct::class);
    }
}

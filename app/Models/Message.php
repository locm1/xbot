<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    
    /**
     * Get all of the comments for the Message
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messageItems()
    {
        return $this->hasMany(MessageItem::class);
    }
}

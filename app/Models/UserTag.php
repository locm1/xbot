<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserTag extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'tag_user');
    }
}

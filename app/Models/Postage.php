<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postage extends Model
{
    use HasFactory;

    protected $fillable = [
        'pref_id',
        'postage',
    ];
    
}

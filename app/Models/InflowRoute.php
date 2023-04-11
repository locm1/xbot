<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InflowRoute extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = ['id'];

    public function inflowRouteUsers()
    {
        return $this->hasMany(InflowRouteUser::class);
    }
}

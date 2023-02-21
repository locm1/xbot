<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function orderUser()
    {
        return $this->belongsTo(OrderUser::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
}

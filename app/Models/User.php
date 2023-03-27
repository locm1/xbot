<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function events()
    {
        return $this->belongsToMany(User::class);
    }

    public function questionnaireAnswers()
    {
        return $this->hasMany(QuestionnaireAnswer::class);
    }

    public function occupation()
    {
        return $this->hasOne(Occupation::class);
    }

    /**
     * The roles that belong to the Coupon
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function coupons()
    {
        return $this->belongsToMany(Coupons::class);
    }

    public function userTags()
    {
        return $this->belongsToMany(UserTag::class, 'tag_user');
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function orderDestinations()
    {
        return $this->hasMany(OrderDestination::class);
    }

    public function orderPaymentMethod()
    {
        return $this->hasOne(OrderPaymentMethod::class);
    }

    public function visitorHistories()
    {
        return $this->hasMany(VisitorHistory::class);
    }

    public function inviteHistories()
    {
        return $this->hasMany(InviteHistory::class, 'inviter_user_id');
    }

    public function inviteeHistories()
    {
        return $this->hasOne(InviteHistory::class, 'invitee_user_id');
    }

    public function fromInvitedUser()
    {
        return $this->hasOneThrough(User::class, InviteHistory::class, 'invitee_user_id', 'id', 'id', 'inviter_user_id');
    }

    public function toInviteUser()
    {
        return $this->hasManyThrough(User::class, InviteHistory::class, 'inviter_user_id', 'id', 'id', 'invitee_user_id');
    }

    public function reserveHistories()
    {
        return $this->hasMany(ReserveHistory::class);
    }
}

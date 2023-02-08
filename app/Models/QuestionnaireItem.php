<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionnaireItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionnaireTitle extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }
}

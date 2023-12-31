<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireAnswer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function questionnaireAnswerItems()
    {
        return $this->hasMany(QuestionnaireAnswerItem::class);
    }
}

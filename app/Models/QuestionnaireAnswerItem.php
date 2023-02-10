<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireAnswerItem extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the comments for the Questionnaire
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questionnaireAnswer()
    {
        return $this->belongsTo(QuestionnaireAnswer::class);
    }
}

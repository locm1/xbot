<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireAnswer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the comments for the Questionnaire
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }
}

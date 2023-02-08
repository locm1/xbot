<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Questionnaire extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Get all of the comments for the Questionnaire
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questionnaireItems()
    {
        return $this->hasMany(QuestionnaireItem::class);
    }
}

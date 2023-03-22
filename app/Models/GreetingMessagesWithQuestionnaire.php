<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreetingMessagesWithQuestionnaire extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $table = 'greeting_messages_with_questionnaire';
}

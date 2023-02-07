<?php

namespace App\Services\management\prefecture;

use App\Models\Prefecture;

class PrefectureService
{

    public function index() 
    {
        return Prefecture::all();
    }
}

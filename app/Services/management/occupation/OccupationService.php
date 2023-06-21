<?php

namespace App\Services\management\occupation;

use App\Models\Occupation;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class OccupationService
{

    public function index() 
    {
        return Occupation::all();
    }


    public function store($request) 
    {
        //
    }


    public function show(Occupation $occupation) 
    {
        return $occupation;
    }


    public function update($request, Model $model) 
    {
        //
    }


    public function destroy(Model $model) 
    {
        //
    }

}

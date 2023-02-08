<?php

namespace App\Services\management\occupation;

use App\Models\Occupation;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class OccupationService extends AbstractManagementService 
{

    public function index() 
    {
        return Occupation::all();
    }


    public function store($request) 
    {
        //
    }


    public function show(Model $model) 
    {
        //
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

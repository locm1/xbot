<?php

namespace App\Services\management\postage;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Postage;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class PostageService extends AbstractManagementService 
{
    public function index() :Collection
    {
        return Postage::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request) :Postage
    {
        $data = $request->only(['pref_id', 'postage']);
        return Postage::create($data);
    }


    /**
     * Display the specified resource.
     *
     * @param  Postage $postage
     * @return Postage
     */
    public function show(Model $postage): Postage
    {
        return $postage;
    }


    public function update($request, Model $postage) :array
    {
        $data = $request->only(['pref_id', 'postage']);
        $postage->update($data);
        return $data;
    }


    public function destroy(Model $postage) 
    {
        return $postage->delete();
    }

}

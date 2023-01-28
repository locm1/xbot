<?php

namespace App\Services\management\specific_trade;

use Illuminate\Database\Eloquent\Collection;
use App\Models\SpecificTrade;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class SpecificTradeService extends AbstractManagementService
{

    public function index() :Collection
    {
        return SpecificTrade::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request) :SpecificTrade
    {
        $data = $request->only(['title', 'content']);
        return SpecificTrade::create($data);
    }


    /**
     * Display the specified resource.
     *
     * @param  SpecificTrade $specific
     * @return SpecificTrade
     */
    public function show(Model $specific): SpecificTrade
    {
        return $specific;
    }


    public function update($request, Model $specific) :array
    {
        $data = $request->only(['title', 'content']);
        $specific->update($data);
        return $data;
    }


    public function destroy(Model $specific) 
    {
        return $specific->delete();
    }

}


<?php

namespace App\Services\setting;

use Illuminate\Database\Eloquent\Collection;
use App\Models\SpecificTrade;

class SpecificTradeService 
{

    public function getAllSpecificTrades() :Collection
    {
        //
        return SpecificTrade::all();
    }


    public function createSpecificTrade(array $data) :Collection
    {
        //
        $specific = SpecificTrade::upsert($data, ['id'], ['title', 'content']);
        return SpecificTrade::all();
    }


    public function getSpecificTradeById() 
    {
        //
    }


    public function updateSpecificTrade(array $data, int $id) :Collection
    {
        //
        $specific = SpecificTrade::upsert($data, ['id'], ['title', 'content']);
        return SpecificTrade::all();
    }


    public function deleteSpecificTrade() 
    {
        //
    }

}


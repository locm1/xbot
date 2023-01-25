<?php

namespace App\Services\setting;

use App\Models\SpecificTrade;

class SpecificTradeService
{

    public function getAllSpecificTrades()
    {
        //
        return SpecificTrade::all();
    }


    public function createSpecificTrade(string $title, string $content) :SpecificTrade
    {
        //
        $save_data = ['title' => $title, 'content' => $content];
        $specific = SpecificTrade::create($save_data);

        return $specific;
    }


    public function getSpecificTradeById()
    {
        //
    }


    public function updateSpecificTrade(int $id, string $title, string $content) :SpecificTrade
    {
        //
        $update = ['title' => $title, 'content' => $content];
        SpecificTrade::find($id)->update($update);
        $specific = SpecificTrade::find($id);

        return $specific;
    }


    public function deleteSpecificTrade()
    {
        //
    }

}
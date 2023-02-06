<?php

namespace App\Services\management\postage;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Postage;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class PostageService
{
    public function index() :Collection
    {
        return Postage::with('prefecture')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function upsert($request) :array
    {
        $postages = $request->postages;
        Postage::upsert($postages, ['id'], ['postage', 'prefecture_id']);
        return $postages;
    }
}

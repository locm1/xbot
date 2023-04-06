<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\postage\StorePostageRequest;
use App\Http\Requests\management\postage\UpdatePostageRequest;
use App\Services\management\postage\PostageService;
use Illuminate\Http\Request;

class PostageController extends Controller
{
    private $postage_service;

    public function __construct(PostageService $postage_service) {
        $this->postage_service = $postage_service;
    }
    

    public function index(Request $request)
    {
        $postages = $this->postage_service->index($request);
        return response()->json(['postages' => $postages], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostageRequest $request)
    {
        $postages = $this->postage_service->upsert($request);
        return response()->json(['postages' => $postages], 201);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostageRequest $request)
    {
        $postages = $this->postage_service->upsert($request);
        return response()->json(['postages' => $postages], 200);
    }
}

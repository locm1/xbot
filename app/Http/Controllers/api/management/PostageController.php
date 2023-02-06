<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Postage;
use App\Http\Requests\management\privacy_policy\StorePostageRequest;
use App\Http\Requests\management\privacy_policy\UpdatePostageRequest;
use App\Services\management\postage\PostageService;

class PostageController extends Controller
{
    private $postage_service;

    public function __construct(PostageService $postage_service) {
        $this->postage_service = $postage_service;
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostageRequest $request)
    {
        //
        $postage = $this->postage_service->store($request);
        return response()->json(['postage' => $postage], 201);
    }

    public function index()
    {
        $postage = $this->postage_service->index();
        return response()->json(['postages' => $postage], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResource
     */
    public function show(Postage $postage)
    {
        $postage = $this->postage_service->show($postage);
        return response()->json(['postage' => $postage], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostageRequest $request, Postage $postage)
    {
        $postage = $this->postage_service->update($request, $postage);
        return response()->json(['postage' => $postage], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Postage $postage)
    {
        $this->postage_service->destroy($postage);
        return response()->json([], 204);
    }
}

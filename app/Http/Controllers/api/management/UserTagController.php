<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;
use App\Http\Requests\management\tag\StoreTagRequest;
use App\Http\Requests\management\tag\UpdateTagRequest;
use App\Models\UserTag;
use App\Services\management\user_tag\UserTagService;

class UserTagController extends Controller
{
    private $tag_service;

    public function __construct(UserTagService $tag_service) {
        $this->tag_service = $tag_service;
    }

    public function index()
    {
        $tag = $this->tag_service->index();
        return response()->json(['tags' => $tag], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTagRequest $request)
    {
        $tag = $this->tag_service->store($request);
        return response()->json(['tag' => $tag], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResource
     */
    public function show(UserTag $user_tag)
    {
        $tag = $this->tag_service->show($user_tag);
        return response()->json(['tag' => $tag], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTagRequest $request, UserTag $user_tag)
    {
        $tag = $this->tag_service->update($request, $user_tag);
        return response()->json(['tag' => $tag], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserTag $user_tag)
    {
        $this->tag_service->destroy($user_tag);
        return response()->json([], 204);
    }
}

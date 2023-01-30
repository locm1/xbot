<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;
use App\Http\Requests\management\tag\StoreTagRequest;
use App\Http\Requests\management\tag\UpdateTagRequest;
use App\Services\management\tag\TagService;

class TagController extends Controller
{
    private $tag_service;

    public function __construct(TagService $tag_service) {
        $this->tag_service = $tag_service;
    }

    public function index()
    {
        $tag = $this->tag_service->index();
        return response()->json(['tag_service' => $tag], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTagRequest $request)
    {
        //
        $tag = $this->tag_service->store($request);
        return response()->json(['tag' => $tag], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResource
     */
    public function show(Tag $tag)
    {
        $tag = $this->tag_service->show($tag);
        return response()->json(['tag' => $tag], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $tag = $this->tag_service->update($request, $tag);
        return response()->json(['tag' => $tag], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        $this->tag_service->destroy($tag);
        return response()->json([], 204);
    }
}

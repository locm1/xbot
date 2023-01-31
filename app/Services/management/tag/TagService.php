<?php

namespace App\Services\management\tag;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Tag;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class TagService extends AbstractManagementService 
{

    public function index() 
    {
        //
        return Tag::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request) :Tag
    {
        $data = $request->only(['name']);
        return Tag::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  Tag $tag
     * @return Tag
     */
    public function show(Model $tag): Tag
    {
        return $tag;
    }


    public function update($request, Model $tag) :array
    {
        $data = $request->only(['name']);
        $tag->update($data);
        return $data;
    }


    public function destroy(Model $tag) 
    {
        return $tag->delete();
    }

}

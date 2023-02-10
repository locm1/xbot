<?php

namespace App\Services\management\user_tag;

use Illuminate\Database\Eloquent\Collection;
use App\Models\UserTag;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class UserTagService extends AbstractManagementService 
{

    public function index() 
    {
        //
        return UserTag::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request) :UserTag
    {
        $data = $request->only(['name']);
        return UserTag::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  UserTag $tag
     * @return UserTag
     */
    public function show(Model $tag): UserTag
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

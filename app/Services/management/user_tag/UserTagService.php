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
        return UserTag::orderBy('id', 'desc')->get();
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
     * @param  UserTag $user_tag
     * @return UserTag
     */
    public function show(Model $user_tag): UserTag
    {
        return $user_tag;
    }


    public function update($request, Model $user_tag) :array
    {
        $data = $request->only(['name']);
        $user_tag->update($data);
        return $data;
    }


    public function destroy(Model $user_tag) 
    {
        return $user_tag->delete();
    }

}

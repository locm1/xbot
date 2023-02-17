<?php

namespace App\Http\Controllers\api\management;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TagUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        return ['user_tags' => $user->userTags()->get()];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResource
     */
    public function show()
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
    }
}

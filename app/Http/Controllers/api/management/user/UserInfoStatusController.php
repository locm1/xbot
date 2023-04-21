<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Services\management\user\UserInfoStatusService;
use Illuminate\Http\Request;

class UserInfoStatusController extends Controller
{
    private $service;
    
    public function __construct(UserInfoStatusService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *@param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_info_statuses = $this->service->index();
        return response()->json(['user_info_statuses' => $user_info_statuses], 200);
    }
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User $user
     * @return JsonResource
     */
    public function update(Request $request)
    {
        $user_info_statuses = $this->service->update($request);
        return response()->json(['user_info_statuses' => $user_info_statuses], 200);
    }
}

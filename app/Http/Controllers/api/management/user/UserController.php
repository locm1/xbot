<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\management\user\StoreUserRequest;
use App\Http\Requests\management\user\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Services\management\user\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{
    private $user_service;
    
    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    /**
     * Display a listing of the resource.
     *@param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->user_service->index($request);
        return response()->json(['users' => $users], 200);
    }
    

    public function store(StoreUserRequest $request)
    {
        $users = $this->user_service->store($request);
        return response()->json(['users' => $users], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @return JsonResource
     */
    public function show(User $user)
    {
        $user = $this->user_service->show($user);
        return response()->json(['user' => $user], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User $user
     * @return JsonResource
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $update_data = $this->user_service->update($request, $user);
        return response()->json(['user' => $update_data], 200);
    }

    public function destroy(User $user)
    {
        $this->user_service->destroy($user);
        return response()->json([], 204);
    }
}

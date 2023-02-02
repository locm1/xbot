<?php

namespace App\Http\Controllers\api\management\privilege;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\management\privilege\PrivilegeService;
use App\Http\Requests\management\privilege\StorePrivilegeRequest;
use App\Http\Requests\management\privilege\UpdatePrivilegeRequest;
use App\Models\Privilege;

class PrivilegeController extends Controller
{
    private $privilege_service;

    public function __construct(PrivilegeService $privilege_service) {
        $this->privilege_service = $privilege_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $privileges = $this->privilege_service->index();
        return response()->json(['privileges' => $privileges], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePrivilegeRequest $request)
    {
        $privilege = $this->privilege_service->store($request);
        return response()->json(['privilege' => $privilege], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrivilegeRequest $request, Privilege $privilege)
    {
        $privilege = $this->privilege_service->update($request, $privilege);
        return response()->json(['privilege' => $privilege], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Privilege $privilege
     * @return \Illuminate\Http\Response
     */
    public function destroy(Privilege $privilege)
    {
        $this->privilege_service->destroy($privilege);
        return response()->json([], 204);
    }
}

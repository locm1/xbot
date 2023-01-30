<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Services\management\admin\AdminService;
use Illuminate\Http\Request;
use App\Http\Requests\management\admin\UpdateAdminRequest;
use App\Http\Requests\management\admin\StoreAdminRequest;
use App\Models\Admin;
use Symfony\Component\HttpFoundation\JsonResponse;

class AdminController extends Controller
{
    private $admin_service;
    
    public function __construct(AdminService $admin_service)
    {
        $this->admin_service = $admin_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index()
    {
        $admins = $this->admin_service->index();
        return response()->json(['admins' => $admins], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAdminRequest $request)
    {
        $admin = $this->admin_service->store($request);
        return response()->json(['admin' => $admin], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Admin $admin
     * @return JsonResource
     */
    public function show(Admin $admin)
    {
        $admin = $this->admin_service->show($admin);
        return response()->json(['admin' => $admin], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Admin $admin
     * @return JsonResource
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $update_data = $this->admin_service->update($request, $admin);
        return response()->json(['admin' => $update_data], 200);
    }

    /**
     * Delete the specified resource.
     *
     * @param  Admin $admin
     * @return JsonResource
     */
    public function destroy(Admin $admin)
    {
        $this->admin_service->destroy($admin);
        return response()->json([], 204);
    }
}

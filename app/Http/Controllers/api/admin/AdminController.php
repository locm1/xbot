<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Services\admin\AdminService;
use Illuminate\Http\Request;
use App\Http\Requests\admin\AdminUpdateRequest;
use App\Http\Requests\admin\AdminStoreRequest;
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
        $admins = $this->admin_service->getAllAdmins();
        return response()->json(['admins' => $admins], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminStoreRequest $request)
    {
        $attributes = $request->only(['login_id', 'name', 'role', 'password']);
        $admin = $this->admin_service->createAdmin($attributes);
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
        return response()->json(['admin' => $admin], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  AdminUpdateRequest $request
     * @param  Admin $admin
     * @return JsonResource
     */
    public function update(AdminUpdateRequest $request, Admin $admin)
    {
        $update_data = $this->admin_service->updateAdmin($request->data, $admin, $request->is_checked);
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
        $this->admin_service->deleteAdmin($admin);
        return response()->json([], 204);
    }
}

<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Services\admin\AdminService;
use Illuminate\Http\Request;
use App\Http\Requests\admin\AdminUpdateRequest;
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
    public function store(Request $request)
    {
        //
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
        $update_data = $this->admin_service->updateAdmin($request->all(), $admin);
        return response()->json(['admin' => $update_data], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

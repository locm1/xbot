<?php

namespace App\Services\admin;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Collection;

class AdminService 
{

    public function getAllAdmins(): Collection
    {
        return Admin::all();
    }


    public function createAdmin() 
    {
        //
    }


    public function getAdminById() 
    {
        //
    }


    public function updateAdmin() 
    {
        //
    }


    public function deleteAdmin() 
    {
        //
    }

}

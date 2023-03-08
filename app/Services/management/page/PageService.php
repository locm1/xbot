<?php

namespace App\Services\management\page;

use App\Models\Page;
use App\Services\management\AbstractManagementService;

class PageService
{

    public function index() 
    {
        return Page::all();
    }

    public function update($request) 
    {
        return Page::upsert($request->pages, ['id']);
    }


    public function destroy() 
    {
        //
    }

}

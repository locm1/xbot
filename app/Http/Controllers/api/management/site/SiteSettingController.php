<?php

namespace App\Http\Controllers\api\management\site;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\site\StoreSiteSettingRequest;
use App\Models\SiteSetting;
use App\Services\management\site\SiteSettingService;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    private $service;
    
    public function __construct(SiteSettingService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index()
    {
        $site_setting = $this->service->index();
        return response()->json(['site_setting' => $site_setting], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSiteSettingRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSiteSettingRequest $request)
    {
        $site_setting = $this->service->store($request);
        return response()->json(['site_setting' => $site_setting], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $site_setting = $this->service->update($request);
        return response()->json(['site_setting' => $site_setting], 200);
    }
}

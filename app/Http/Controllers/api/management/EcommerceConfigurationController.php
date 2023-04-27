<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\ec_configuration\StoreEcommerceConfigurationRequest;
use App\Http\Requests\management\ec_configuration\UpdateEcommerceConfigurationRequest;
use App\Models\EcommerceConfiguration;
use App\Services\management\ec_configuration\EcommerceConfigurationService;
use Illuminate\Http\Request;

class EcommerceConfigurationController extends Controller
{
    private $ecommerce_configuration_service;

    public function __construct(EcommerceConfigurationService $ecommerce_configuration_service)
    {
        $this->ecommerce_configuration_service = $ecommerce_configuration_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ecommerce_configuration = $this->ecommerce_configuration_service->index();
        return response()->json(['ecommerce_configuration' => $ecommerce_configuration], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEcommerceConfigurationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEcommerceConfigurationRequest $request)
    {
        $ecommerce_configuration = $this->ecommerce_configuration_service->store($request);
        return response()->json(['ecommerce_configuration' => $ecommerce_configuration], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEcommerceConfigurationRequest  $request
     * @param  EcommerceConfiguration  $ecommerce_configuration
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEcommerceConfigurationRequest $request, $id)
    {
        $ecommerce_configuration = $this->ecommerce_configuration_service->update($request, $id);
        return response()->json(['ecommerce_configuration' => $ecommerce_configuration], 200);
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

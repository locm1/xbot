<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TermsOfService;
use App\Http\Requests\management\terms_of_service\UpdateTermsOfServiceRequest;
use App\Services\setting\TermsOfServiceService;

class TermsOfServiceController extends Controller
{
    private $terms_of_service_service;

    public function __construct(TermsOfServiceService $terms_of_service_service) {
        $this->terms_of_service_service = $terms_of_service_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $terms_of_services = $this->terms_of_service_service->getTermsOfServiceById();
        return response()->json(['terms_of_service' => $terms_of_services], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTermsOfServiceRequest $request, TermsOfService $terms_of_service)
    {
        $res = $this->terms_of_service_service->updateTermsOfService($terms_of_service, $request->content);
        return response()->json(['terms_of_service' => $res], 200);
    }
}

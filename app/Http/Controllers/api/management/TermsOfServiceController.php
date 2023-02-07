<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TermsOfService;
use App\Http\Requests\management\terms_of_service\CreateTermsOfServiceRequest;
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
        $terms_of_services = $this->terms_of_service_service->getAllTermsOfServices();
        return response()->json(['terms_of_services' => $terms_of_services], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTermsOfServiceRequest $request)
    {
        $terms_of_service = $this->terms_of_service_service->createTermsOfService($request->content);
        return response()->json(['terms_of_service' => $terms_of_service], 201);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTermsOfServiceRequest $request, TermsOfService $terms_of_service)
    {
        //
        $update = [
            'content' => $request->content,
        ];
        $res = $this->terms_of_service_service->updateTermsOfService($terms_of_service, $request->content);
        return response()->json(['terms' => $res], 200);
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

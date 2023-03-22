<?php

namespace App\Http\Controllers\api\liff\terms_of_service;

use App\Http\Controllers\Controller;
use App\Models\TermsOfService;
use App\Services\setting\TermsOfServiceService;
use Illuminate\Http\Request;

class TermsOfServiceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  TermsOfServiceService  $terms_of_service_service
     * @return \Illuminate\Http\Response
     */
    public function __invoke(TermsOfServiceService $terms_of_service_service)
    {
        $terms_of_services = $terms_of_service_service->getTermsOfServiceById();
        return response()->json(['terms_of_service' => $terms_of_services], 200);
    }
}

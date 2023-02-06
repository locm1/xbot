<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\management\user\UserDemographicService;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserDemographicController extends Controller
{
    private $user_demographic_service;

    public function __construct(UserDemographicService $user_demographic_service)
    {
        $this->user_demographic_service = $user_demographic_service;
    }

    /**
     * Handle the incoming request.
     *
     * 
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $user_demographic = $this->user_demographic_service->getUserDemographic();
        return response()->json(['genders' => $user_demographic], 200);
    }
}

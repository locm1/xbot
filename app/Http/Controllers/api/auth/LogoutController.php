<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * @param AuthManager $auth
     */
    public function __construct(
        private readonly AuthManager $auth,
    ) {
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        if ($this->auth->guard()->guest()) {
            return new JsonResponse([
                'message' => 'Already Unauthenticated.',
            ]);
        }

        $this->auth->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse([
            'message' => 'Unauthenticated.',
        ]);
    }
}

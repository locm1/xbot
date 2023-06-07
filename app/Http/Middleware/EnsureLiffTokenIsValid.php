<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnsureLiffTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $User = $request->route()->parameter('user');
        $liff_token = $request->liffToken;
        $verify_service = new VerifyService;
        $verify_response = $verify_service->verifyIdToken($liff_token);

        if ($User->line_id !== $verify_response['sub']) {
            abort(401, 'Unauthorized');
        }

        return $next($request);
    }
}

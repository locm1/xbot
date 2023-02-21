<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\DefaultSegment;
use Illuminate\Http\Request;

class DefaultSegmentController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return ['segments' => DefaultSegment::with('defaultSegmentItems')->get()];
    }
}

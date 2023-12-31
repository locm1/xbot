<?php
namespace App\Services\management\inflow_route_user;

use App\Models\InflowRoute;
use App\Models\InflowRouteUser;
use App\Services\api\line\verify\VerifyService;
use App\Services\common\CreateLineBotUtility;
use Illuminate\Http\Request;

class InflowRouteUserService  
{
    public function store(Request $request)
    {
        $bot = (new CreateLineBotUtility)();
        $verify_service = new VerifyService;
        $line_id = $verify_service->verifyIdToken($request->idToken)['sub'];
        $inflow_route_id = InflowRoute::where('key', $request->key)->firstOrFail()->id;
        $basicId = $bot->getBotInfo()->getJSONDecodedBody()['basicId'];
        $create_data = InflowRouteUser::create(['inflow_route_id' => $inflow_route_id, 'line_id' => $line_id]);

        return ['InflowRouteUser' => $create_data, 'basicId' => $basicId];
    }
}

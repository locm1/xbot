<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Services\common\CreateLineBotUtility;
use Illuminate\Http\Request;

class BasicIdController extends Controller
{
    private $bot;

    public function __construct() {
        $this->bot = (new CreateLineBotUtility)();
    }

    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $basic_id = $this->bot->getBotInfo()->getJSONDecodedBody()['basicId'];
        return response()->json(['basic_id' => $basic_id], 200);
    }
}

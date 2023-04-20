<?php

namespace App\Services\liff\questionnaire;

use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentive;
use App\Models\InviterIncentiveUser;
use App\Models\OrderDestination;
use App\Models\QuestionnaireAnswer;
use App\Models\QuestionnaireAnswerItem;
use App\Models\User;
use App\Services\api\line\invite\InviteService;
use App\Services\common\CreateLineBotUtility;
use App\Services\liff\invite\IssueInviteIncentiveService;
use App\Services\liff\order_destination\OrderDestinationService;
use Illuminate\Support\Facades\DB;
use App\Services\liff\questionnaire\FormatQuestionnaireAnswerAction;
use App\Services\liff\user\UserService;
use App\Services\management\invitation\InviteeIncentiveUserService;
use App\Services\management\invitation\InviterIncentiveUserService;
use Illuminate\Support\Facades\Log;

class QuestionnaireAnswerService
{
    private $format_questionnaire_answer_action;
    private $user_service;
    private $order_destination_service;

    public function __construct(
        FormatQuestionnaireAnswerAction $format_questionnaire_answer_action,
        UserService $user_service,
        OrderDestinationService $order_destination_service
    )
    {
        $this->format_questionnaire_answer_action = $format_questionnaire_answer_action;
        $this->user_service = $user_service;
        $this->order_destination_service = $order_destination_service;
    }

    public function store($request, User $User)
    {
        $merged_questionnaire_answers = $this->format_questionnaire_answer_action->mergeUserIdToArray($User, $request->questionnaires);
        # トランザクションの実行
        DB::transaction(function() use($merged_questionnaire_answers, $request, $User) {
            $questionnaire_answer_ids = $this->getQuestionnaireAnswerIds($merged_questionnaire_answers);

            $merged_questionnaire_answer_items = $this->format_questionnaire_answer_action->mergeQuestionnaireAnswerIdToArray($questionnaire_answer_ids, $merged_questionnaire_answers);
            QuestionnaireAnswerItem::upsert($merged_questionnaire_answer_items, ['id']);

            #ユーザー情報の更新
            $this->user_service->update($request, $User);

            # 配送先の追加
            $this->order_destination_service->store($request, $User);

            # インセンティブ発行
            $issued = (new InviteService)($User->id, 2);
        });

        return $merged_questionnaire_answers;
    }


    private function getQuestionnaireAnswerIds($merged_questionnaire_answers)
    {
        $questionnaire_answer_ids = array();

        array_walk($merged_questionnaire_answers, function(&$merged_questionnaire_answer){ 
            unset($merged_questionnaire_answer['answer']);
        });

        # バルクインサート
        QuestionnaireAnswer::upsert($merged_questionnaire_answers, ['id']);
        $last_id = DB::getPdo()->lastInsertId();

        for ($i = 0; $i < count($merged_questionnaire_answers); $i++) {
            $questionnaire_answer_ids[] = $last_id + $i;
        }
        return $questionnaire_answer_ids;
    }
}

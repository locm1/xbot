<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;
use App\Models\QuestionnaireItem;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuestionnaireService
{
    private $action;
    private $service;

    public function __construct(FormatQuestionnaireAction $action, QuestionnaireItemService $service)
    {
        $this->action = $action;
        $this->service = $service;
    }

    public function index(): Collection
    {
        return Questionnaire::with('questionnaireItems')->orderBy('display_order', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */

    public function store($request): Questionnaire
    {
        $data = $request->only(['title', 'type', 'display_order', 'is_undisclosed', 'is_required']);
        $merged_admin_id = array_merge($data, ['admin_id' => Auth::id()]);
        $merged_data = $this->action->mergeDisplayorderToArray($merged_admin_id);

        return DB::transaction(function () use ($merged_data, $request) {
            $Questionnaire = Questionnaire::create($merged_data);

            # リクエストで送られた項目が存在するとき
            if (!empty($request->questionnaire_items)) {
                $this->service->store($request->questionnaire_items, $Questionnaire);
            }
            return $Questionnaire;
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  Questionnaire $questionnaire
     * @return Questionnaire
     */
    public function show(Questionnaire $questionnaire): Questionnaire
    {
        return Questionnaire::with('questionnaireItems')->find($questionnaire->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Questionnaire $questionnaire
     * 
     */
    public function update($request, Questionnaire $questionnaire)
    {
        $data = $request->only(['admin_id', 'title', 'type', 'display_order', 'is_undisclosed', 'is_required']);

        return DB::transaction(function () use ($data, $request, $questionnaire) {
            $questionnaire->update($data);

            # リクエストで送られた項目が存在するとき
            if (!empty($request->questionnaire_items)) {
                $this->service->store($request->questionnaire_items, $questionnaire);
            }

            # 削除対象IDの配列が送られていたら（空じゃないとき）
            if (!empty($request->delete_questionnaire_item_ids)) {
                $this->service->destroy($request->delete_questionnaire_item_ids);
            }
        });
        return $questionnaire;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Questionnaire $questionnaire
     * 
     */
    public function destroy(Questionnaire $questionnaire)
    {
        return $questionnaire->delete();
    }

}

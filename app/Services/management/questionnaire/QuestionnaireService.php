<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;
use App\Models\QuestionnaireItem;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class QuestionnaireService
{

    public function index(): Collection
    {
        return Questionnaire::with('questionnaireItems')->orderBy('display_order', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */

    public function store($reqest): Questionnaire
    {
        $data = $reqest->only(['title', 'type', 'display_order', 'is_undisclosed', 'is_required']);
        $merged_data = array_merge($data, ['admin_id' => Auth::id()]);
        return Questionnaire::create($merged_data);
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
        $questionnaire->update($data);
        foreach ($request->questionnaire_items as $k => $v) {
            if ($v['id'] === null) {
                QuestionnaireItem::create([
                    'questionnaire_id' => $questionnaire->id,
                    'name' => $v['name'],
                ]);
            } else {
                QuestionnaireItem::find($v['id'])->update([
                    'questionnaire_id' => $questionnaire->id,
                    'name' => $v['name'],
                ]);
            }
        }
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

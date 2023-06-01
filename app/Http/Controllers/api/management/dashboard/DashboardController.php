<?php

namespace App\Http\Controllers\api\management\dashboard;

use App\Consts\GenderConsts;
use App\Consts\GraphTypeConsts;
use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function getGraphData()
    {
        $Reports = Report::all();
        $send_data = [];
        foreach ($Reports as $k => $v) {
            $Users = $this->getUsersByTerms(json_decode($v['search_json'], true));
            $period = null;
            if ($v->xlabel === 1) {
                $data = $this->formatByPeriod($Users);
                $period = $this->getPeriod($v->period);
            } elseif ($v->xlabel === 2) {
                $data = $this->formatByGender($Users);
            } elseif ($v->xlabel === 3) {
                $data = $this->formatByBirthmonth($Users);
            }
            $send_data[] = [
                'id' => $v->id,
                'title' => $v->name,
                'name' => '人数',
                'data' => $data,
                'type' => GraphTypeConsts::TYPES[$v->type],
                'period' => $period,
                'xlabel' => $v->xlabel,
                'size' => $v->size,
                'terms' => json_decode($v->search_json)
            ];
        }

        return $send_data;
    }

    private function getUsersByTerms($terms): Builder
    {
        $Users = User::with(['visitorHistories', 'orders', 'questionnaireAnswers']);
        if ($terms['gender'] ?? false) {
            $Users->whereIn('gender', $terms['gender']);
        }
        if ($terms['start_age'] ?? false) {
            $start_date = Carbon::tomorrow('Asia/Tokyo')->subYear($terms['start_age'][0])->format('Y-m-d');
            $Users->where('birth_date', '<=', $start_date);
        } //20歳から30歳の流入数うまく取れない
        if ($terms['end_age'] ?? false) {
            $end_date = Carbon::tomorrow('Asia/Tokyo')->subYear($terms['end_age'][0])->format('Y-m-d');
            $Users->where('birth_date', '>=', $end_date);
        }
        if ($terms['birth_date'] ?? false) {
            $count = count($terms['birth_date']);
            $bindings = str_repeat("?, ", $count - 1) . "?";
            $Users->whereRaw("MONTH(birth_date) IN ($bindings)", [$terms['birth_date']]);
        }
        if ($terms['prefecture'] ?? false) {
            $Users->whereIn('prefecture', $terms['prefecture']);
        }
        if ($terms['redidence'] ?? false) {
            $Users->whereIn('redidence', $terms['redidence']);
        }
        if ($terms['start_last_visit_date'] ?? false) {
            $Users->whereHas('visitorHistories', function ($query) use ($terms) {
                $query->where('created_at', '>=', $terms['start_last_visit_date']);
            });
        }
        if ($terms['end_last_visit_date'] ?? false) {
            $Users->whereHas('visitorHistories', function ($query) use ($terms) {
                $query->where('created_at', '<=', $terms['end_last_visit_date']);
            });
        }
        if ($terms['start_buy_count'] ?? false) {
            $Users->withCount('orders')->having('orders_count', '>=', $terms['start_buy_count']);
        }
        if ($terms['end_buy_count'] ?? false) {
            $Users->withCount('orders')->having('orders_count', '<=', $terms['end_buy_count']);
        }
        foreach ($terms as $k => $v) {
            if (substr($k, 0, 15) === 'questionnaireId') {
                $questionnaire_id = substr($k, 16);
                $Users->whereHas('questionnaireAnswers', function ($query) use ($questionnaire_id, $v) {
                    $query->where('questionnaire_id', $questionnaire_id)->whereHas('questionnaireAnswerItems', function ($items) use ($v) {
                        $items->where('answer', $v);
                    });
                });

            }
        }

        return $Users;
    }

    private function formatByPeriod(Builder $Users): array
    {
        $group_users = $Users->orderBy('created_at')->selectRaw('DATE_FORMAT(created_at, "%Y-%m") AS date, COUNT(*) AS count')->groupBy('date')->get();
        $data = [];
        foreach ($group_users as $user) {
            $date = Carbon::parse($user->date)->format('Y-m');
            $count = $user->count;
            $data[] = [$date, $count];
        }

        return $data;
    }

    private function formatByGender(Builder $Users): array
    {
        $group_users = $Users->selectRaw('gender, COUNT(*) AS count')
        ->orderByRaw('ISNULL(gender), gender ASC')->groupBy('gender')->get();


        $data = [];
        foreach ($group_users as $user) {
            $data[] = [GenderConsts::TYPES[$user->gender], $user->count];
        }
        $hasFemale = false;
        foreach ($data as $innerArray) {
            if (in_array('女性', $innerArray)) {
                $hasFemale = true;
                break;
            }
        }
        if (!$hasFemale) {
            $data[] = array('女性', 0);
        }
        if (count($data) < 3) {
            $data[] = array ('未回答', 0);
        }

        return $data;
    }

    private function formatByBirthmonth(Builder $Users): array
    {
        $group_users = $Users->selectRaw('MONTH(birth_date) AS month, COUNT(*) AS count')
            ->orderBy('month')->groupBy('month')->get();
        $data = [];
        for ($i=1; $i < 13; $i++) { 
            $filtered = $group_users->first(function ($user, $key) use ($i) {
                return $user->month == $i;
            });
            if ($filtered) {
                $data[] = ["$i 月", $filtered->count];
            } else {
                $data[] = ["$i 月", 0];
            }
        }

        return $data;
    }

    private function getPeriod(int $period): array
    {
        $end_date = date("Y-m-d");
        switch ($period) {
            case '1':
                $start_date = Carbon::now()->subWeek(1)->format('Y-m-d');
                break;
            
            case '2':
                $start_date = Carbon::now()->subMonth(1)->format('Y-m-d');
                break;
        
            case '3':
                $start_date = Carbon::now()->subYear(1)->format('Y-m-d');
                break;
            
            default:
                $start_date = date("Y-m-d");
                break;
        }

        return [$start_date, $end_date];
    }
}
<?php

namespace App\Services\management\user;

use App\Models\User;

class UserDemographicService
{

    public function getUserDemographic() 
    {
        $users = User::orderBy('id', 'asc')->get();
        $genders = $this->getGender($users);
        $birth_months = $this->getBirthMonth($users);
        $prefectures = $this->getPrefecture($users);

        return [
            'genders' => $genders,
            'birth_months' => $birth_months,
            'prefectures' => $prefectures,
        ];
    }

    private function getGender($users)
    {
        return $users->groupBy(function ($row) {return $row->gender;})
            ->map(function ($gender) {
                return $gender->count();
            });
    }

    private function getBirthMonth($users)
    {
        $birth_months = array();
        $result_users = $users->groupBy(function ($row) {return $row->birth_date->format('m');})
            ->map(function ($month) {
                return $month->count();
            })->toArray();
        ksort($result_users);

        foreach ($result_users as $key => $value) {
            $birth_months[] = [
                'date' => ltrim($key, 0) .'月',
                'count' => $value,
            ];
        }
        return $birth_months;
    }

    private function getPrefecture($users)
    {
        $prefectures = array();

        $group_by_users = $users->groupBy(function ($row) {return $row->prefecture;})
        ->map(function ($prefecture) use ($users) {
            return [
                'count' => $prefecture->count(),
                'percent' => floor(($prefecture->count() / $users->count()) * 100)
            ];
        });
        
        foreach ($group_by_users as $key => $value) {
            $prefectures[] = [
                'name' => $key,
                'count' => $value['count'],
                'percent' => $value['percent'],
            ];
        }
        return $prefectures;
    }
}

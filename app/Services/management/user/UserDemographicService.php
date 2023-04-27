<?php

namespace App\Services\management\user;

use App\Models\User;

class UserDemographicService
{

    public function getUserDemographic() 
    {
        return [
            'friend' => $this->getFriendCount(),
            'blocked' => $this->getBlockedCount(),
            'registered' => $this->getRegisteredCount(),
            'genders' => $this->getGenderCount(),
            'birth_months' => $this->getBirthMonth(),
            'prefectures' => $this->getPrefecture(),
        ];
    }

    private function getFriendCount(): int
    {
        return User::count();
    }
    
    private function getBlockedCount(): int
    {
        return User::where('is_blocked', 1)->count();
    }

    private function getRegisteredCount(): int
    {
        return User::where('is_registered', 1)->count();
    }

    private function getGenderCount(): array
    {        
        return [
            'male' => User::where('gender', 1)->count(),
            'female' => User::where('gender', 2)->count(),
            'other' => User::where('gender', 3)->count(),
        ];
    }

    private function getBirthMonth()
    {
        $birth_months = array();
        $users = User::whereNotNull('birth_date')->orderBy('id', 'asc')->get();
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

    private function getPrefecture()
    {
        $prefectures = array();
        $users = User::whereNotNull('prefecture')->orderBy('id', 'asc')->get();
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

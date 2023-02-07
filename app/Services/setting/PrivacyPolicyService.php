<?php

namespace App\Services\setting;

use App\Models\PrivacyPolicy;

class PrivacyPolicyService 
{

    public function getAllPrivacyPolicies() 
    {
        return PrivacyPolicy::all();
    }


    public function createPrivacyPolicy(string $content) :PrivacyPolicy
    {
        $data = ['content' => $content];
        $policy = PrivacyPolicy::create($data);

        return $policy;
    }


    public function getPrivacyPolicyById() 
    {
        //
    }


    public function updatePrivacyPolicy(PrivacyPolicy $privacy_policy, string $content) :PrivacyPolicy
    {
        $update = ['content' => $content];
        $privacy_policy->update($update);

        return $privacy_policy;
    }


    public function deletePrivacyPolicy() 
    {
        //
    }

}

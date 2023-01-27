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


    public function updatePrivacyPolicy(PrivacyPolicy $policy, string $content) :PrivacyPolicy
    {
        $update = ['content' => $content];
	    $policy->update($update);

        return $policy;
    }


    public function deletePrivacyPolicy() 
    {
        //
    }

}

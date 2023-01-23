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


    public function updatePrivacyPolicy(int $id, string $content) :PrivacyPolicy
    {
        $update = ['content' => $content];
        PrivacyPolicy::find($id)->update($update);
        $policy = PrivacyPolicy::find($id);

        return $policy;
    }


    public function deletePrivacyPolicy() 
    {
        //
    }

}

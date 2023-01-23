<?php

namespace App\Services\setting;

use App\Models\PrivacyPolicy;

class PrivacyPolicyService 
{

    public function getAllPrivacyPolicys() 
    {
        return PrivacyPolicy::all();
    }


    public function createPrivacyPolicy() 
    {
        //
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

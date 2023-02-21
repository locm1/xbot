<?php

namespace App\Services\setting;

use App\Models\PrivacyPolicy;

class PrivacyPolicyService 
{
    public function getPrivacyPolicyById() 
    {
        return PrivacyPolicy::find(1);
    }


    public function updatePrivacyPolicy(PrivacyPolicy $privacy_policy, string $content) :PrivacyPolicy
    {
        $update = ['content' => $content];
        $privacy_policy->update($update);

        return $privacy_policy;
    }
}

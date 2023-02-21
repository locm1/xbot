<?php

namespace App\Services\setting;

use App\Models\TermsOfService;

class TermsOfServiceService 
{

    public function getTermsOfServiceById() 
    {
        return TermsOfService::find(1);
    }

    public function updateTermsOfService(TermsOfService $terms_of_service, string $content) :TermsOfService
    {
        $update = ['content' => $content];
        $terms_of_service->update($update);

        return $terms_of_service;
    }
}

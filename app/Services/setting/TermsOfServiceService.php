<?php

namespace App\Services\setting;

use App\Models\TermsOfService;

class TermsOfServiceService 
{

    public function getAllTermsOfServices() 
    {
        return TermsOfService::all();
    }


    public function createTermsOfService(string $content) :TermsOfService
    {
        $data = ['content' => $content];
        $term = TermsOfService::create($data);

        return $term;
    }


    public function getTermsOfServiceById() 
    {
        //
    }


    public function updateTermsOfService(TermsOfService $terms_of_service, string $content) :TermsOfService
    {
        $update = ['content' => $content];
        $terms_of_service->update($update);

        return $terms_of_service;
    }


    public function deleteTermsOfService() 
    {
        //
    }

}

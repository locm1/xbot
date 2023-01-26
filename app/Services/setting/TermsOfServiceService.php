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


    public function updateTermsOfService(TermsOfService $terms, string $content) :TermsOfService
    {
        $update = ['content' => $content];
        $terms->update($update);

        return $terms;
    }


    public function deleteTermsOfService() 
    {
        //
    }

}

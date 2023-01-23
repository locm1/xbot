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


    public function updateTermsOfService(int $id, string $content) :TermsOfService
    {
        $update = ['content' => $content];
        TermsOfService::find($id)->update($update);
        $term = TermsOfService::find($id);

        return $term;
    }


    public function deleteTermsOfService() 
    {
        //
    }

}

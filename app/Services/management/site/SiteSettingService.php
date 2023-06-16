<?php

namespace App\Services\management\site;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SiteSettingService
{

    public function index(): Collection
    {
        return SiteSetting::all();
    }

    public function store($request): SiteSetting
    {
        $logo_login_image_path = $this->storeFile($request, 'logo_login_image');
        $logo_sidebar_image_path = $this->storeFile($request, 'logo_sidebar_image');
        $data = [
            'logo_login_path' => $logo_login_image_path,
            'logo_sidebar_path' => $logo_sidebar_image_path
        ];
        return SiteSetting::create($data);
    }

    public function update($request)
    {
        $site_setting = SiteSetting::find(1);

        $logo_login_image_path = $request->hasFile('logo_login_image')
            ? $this->storeFile($request, 'logo_login_image')
            : $site_setting->logo_login_path;
        $logo_sidebar_image_path = $request->hasFile('logo_sidebar_image')
            ? $this->storeFile($request, 'logo_sidebar_image')
            : $site_setting->logo_sidebar_path;
        
        # 画像が送られてきたら、既存画像削除
        if ($request->hasFile('logo_login_image')) {
            $this->deleteFile($site_setting->logo_login_path);
        }

        if ($request->hasFile('logo_sidebar_image')) {
            $this->deleteFile($site_setting->logo_sidebar_path);
        }
        
        $data = [
            'logo_login_path' => $logo_login_image_path,
            'logo_sidebar_path' => $logo_sidebar_image_path
        ];
        return $site_setting->update($data);
    }


    private function storeFile($request, $image): string
    {
        $file = $request->file($image);
        $file_name = $file->getClientOriginalName();
        $file->storeAs("public/logo", $file_name);
        return "/storage/logo/$file_name";
    }


    private function deleteFile($current_path): string
    {
        $delete_file_path = str_replace("/storage/logo", 'logo', $current_path);
        return Storage::disk('public')->delete($delete_file_path);
    }

}


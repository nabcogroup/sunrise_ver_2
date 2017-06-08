<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/17/2017
 * Time: 11:09 AM
 */

namespace App\Services;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class  FileManager
{
    private  $configs = array();
    private  $fileName;
    private  static $_instance;


    public static function getInstance ()
    {
        if (self::$_instance === null) {
            self::$_instance = new self;
        }
        return self::$_instance;
    }


    public function settings(Array $configs = array()) {

        if(sizeof($this->configs) > 0) {
            foreach($configs as $key => $value) {
                $this->configs[$key] = $value;
            }
        }
        else {
            $this->configs = $configs;
        }


        return $this;
    }

    public function store($files) {

        if(is_array($files)) {
            foreach($files as $file) {
               $this->singleStore($file);
            }
        }
        else {
            $this->singleStore($files);
        }

        return $this;
    }

    public function singleStore($file) {

        $this->fileName = isset($this->configs['filename']) ? $this->configs['filename'] : $file->getClientOriginalName();

        if (isset($this->configs['enc']) && $this->configs['enc'] == true) {
            $this->fileName = hash("md5", $this->fileName);
        }

        $fullFilePath = isset($this->configs['path']) ? $this->configs['path'].'/'.$this->fileName  : $this->fileName;
        Storage::disk('local')->put($fullFilePath, File::get($file));
        return $this;
    }

    public function getFilePath($fileName) {
        $fullFilePath = isset($this->configs['path']) ? $this->configs['path'].'/'.$fileName  : $fileName;
        if(Storage::disk('local')->has($fullFilePath)) {
            $file = Storage::disk('local')->get($fullFilePath);
        }
        else {
            $file = Storage::disk('local')->get('img/noimage.jpg');
        }

        return $file;
    }

    public function getNoImageFile() {
        return Storage::disk('local')->get('img/noimage.jpg');
    }

    public function getFileName() {
        return $this->fileName;
    }
}
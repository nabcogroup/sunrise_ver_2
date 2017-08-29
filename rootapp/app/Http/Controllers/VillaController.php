<?php

namespace App\Http\Controllers;

use App\Http\Requests\VillaForm;
use App\Repositories\VillaRepository;
use App\Selection;
use App\Services\FileManager;
use App\Services\Result;
use Dompdf\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class VillaController extends Controller
{

    private $villaRepo;
    private $selection;
    private $fileManager;

    function __construct(VillaRepository $repo)
    {
        $this->villaRepo = $repo;
        $this->selection = new Selection();
        $this->fileManager = FileManager::getInstance()->settings(['path' => 'img/galleries/','enc' => true]);
    }

    public function index() {
        return view("villa.index",compact('villas'));
    }
    
    public function imageSource($fileName) {
        return Response($this->fileManager->getFilePath($fileName),200);
    }

    public function register($id = 0) {
        return view("villa.register",compact('id'));
    }

    public function apiList(Request $request) {
        try {
            $inputs = $request->all();
            $villas =  $this->villaRepo->getVillas($inputs);
            $status = $this->villaRepo->getStatusCount();
            
            return compact("villas","status");
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCreate($id = 0) {

        $model = array();
        
        if($id == 0) {
            //create an instace
            $model['instance'] = $this->villaRepo->create();
        }
        else {
            //get the item
            $model['instance'] = $this->villaRepo->includeGalleries()->find($id);
        }

        $model['lookups'] = $this->selection->getSelections(array("villa_type","villa_location"));

        return $model;
    }

    public function apiStore(VillaForm $request) {
        
        $inputs = $request->all();

        try {

            $files =   isset($request->galleries) ? $request->galleries : [];
            $inputs['galleries'] = $this->storeImages($files,$inputs['villa_no']);

            if(!isset($inputs['id'])) {
                $inputs['id'] = 0;
            }

            $this->villaRepo->saveVilla($inputs);

            return Result::ok();

        }
        catch(Exception $e) {
            Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiCancel(Request $request) {
        
        $id = $request->input('id');

        try{
            $villa = $this->villaRepo->find($id);
            if($villa == null) {
                throw new Exception("Villa cannot find");
            }
            else if($villa->isActive()) {

                throw new Exception("Villa is active");
            }

            $villa->delete();

            return Result::ok();

        }
        catch(Exception $e) {

            Result::badRequest(['message' => $e->getMessage()]);

        }
    }

    private function storeImages($files,$villaNo) {
        $galleries = array();
        if(sizeof($files) > 0) {
            foreach($files as $file) {
                $rules = ['file' => 'required|mimes:png,gif,jpeg']; //image only;
                $validator = Validator::make(array('file' => $file),$rules);
                if($validator->passes()) {
                    $origFileName = $villaNo;
                    $fileManager = $this->fileManager->settings(['filename' => $origFileName]);
                    $fileManager->singleStore($file);
                    //save rule
                    $galleries[] = array(
                        'image_name'    =>  $fileManager->getFileName(),
                        'mime_type'     =>  $file->getClientMimeType()
                    );
                }
            }
        }

        return $galleries;
    }
    

}

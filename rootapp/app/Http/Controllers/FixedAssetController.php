<?php

namespace App\Http\Controllers;

use App\Selection;
use App\Services\Result;
use Illuminate\Http\Request;
use App\Http\Requests\FixedAssetForm;
use App\Repositories\FixedAssetRepository;

class FixedAssetController extends Controller
{
    private $repository;


    public function __construct(FixedAssetRepository $repository)
    {
        
        $this->repository = $repository;
        
    }

    public function index() {
        
        return view('fixed-asset.index');
    }

    public function register($id = null) {
        return view('fixed-asset.register',compact('id'));
    }

    public function all() {
        return $this->repository->getAll();
    }


    public function create()
    {
        
        $data = $this->repository->createInstance();
        $lookups = Selection::getSelections(['villa_location','fixed_asset_type']);
        
        return compact('lookups', 'data');
    }

    public function edit($id)
    {
    }

    public function store(FixedAssetForm $request)
    {
        
        $input = $request->filterInput();
        
        try {
            $newEntry = $this->repository->attach($input)->instance();
            return Result::ok('successful',$newEntry);
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function cancel()
    {
    }
}

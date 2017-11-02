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

    public function all($property = null, Request $request) {

        $filter_field = $request->input('filter_field',null);
        $filter_value = $request->input('filter_value',null);

        return $this->repository->getAssets($property,$filter_field,$filter_value);
    }


    public function create()
    {
        $data = $this->repository->createInstance();

        $lookups = Selection::getSelections(['villa_location','fixed_asset_type']);

        return compact('lookups', 'data');
    }

    public function edit($id)
    {
         $fixedAsset = $this->repository->find($id);

         $lookups = Selection::getSelections(['villa_location','fixed_asset_type']);

         return compact('lookups','fixedAsset');
         
    }

    public function store(FixedAssetForm $request)
    {
        $input = $request->filterInput();
        try {
            
            $model = $this->repository->attach($input)->instance();
            return Result::ok('successful',$model);
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function cancel()
    {
    }

    public function addDepreciation(Request $request) {

        $this->validate($request,[
            'fixed_asset_id'    =>  'required',
            'ob_amount'         =>  'required',
            'ob_year'           =>  'required',
            'depreciated_value' =>  'required'
        ]);

    }
}

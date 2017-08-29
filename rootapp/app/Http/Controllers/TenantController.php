<?php

namespace App\Http\Controllers;

use App\Http\Requests\TenantForm;
use App\Repositories\TenantRepository;
use App\Selection;
use App\Services\Result;
use Dompdf\Exception;
use Illuminate\Http\Request;

class TenantController extends Controller
{

    private $repo;

    public function __construct(TenantRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index() {

        return view('tenant.index');

    }


    public function apiList() {

        $tenants = $this->repo->getTenants();
        return $tenants;

    }

    public function register($tenantId = null) {

        if($tenantId != null) {
            $model = $this->apiShow($tenantId);
        }

        return view('tenant.register',compact('model'));
    }

    public function apiShow($tenantId) {

        $tenant = $this->repo->includes(['TenantAddress'])->findById($tenantId)->single();
        $lookups = Selection::getSelections(['tenant_type']);

        return compact('tenant','lookups');
    }

    public function apiStore(TenantForm $request) {

        $inputs = $request->filterInput();

        try {

            $this->repo->saveTenant($inputs);
        }
        catch(Exception $e) {

            Result::badRequest(["message" => $e->getMessage()]);

        }
    }

    public function apiSearch($regId = "") {

        try {
            $tenant = $this->repo->getTenantByRegId($regId);
            if($tenant == null) {
                throw new Exception("Cannot Find Tenant");
            }
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }


        return $tenant;
    }

}

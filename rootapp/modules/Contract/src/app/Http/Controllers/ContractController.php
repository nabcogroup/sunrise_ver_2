<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 12/7/2017
 * Time: 10:34 AM
 */

namespace Contract\App\Http\Controllers;


use Contract\App\Repositories\ContractRepository;
use KielPack\LaraLibs\Base\Controller;

class ContractController extends Controller
{

    private $repo;

    public function __construct(ContractRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index($status = null) {

        $this->repo->contracts($status);

    }

    



}
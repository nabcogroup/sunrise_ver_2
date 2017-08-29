<?php

namespace App\Http\Controllers;

use App\Repositories\MenuRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public $repo;
    public function __construct(MenuRepository $repo) {
        $this->repo = $repo;
    }

    public function index() {

        $menus = $this->repo->getMenus();

        return view("dashboard.index",compact('menus'));

    }
}

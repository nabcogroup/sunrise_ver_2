<?php

namespace App\Http\Controllers;

use App\Selection;
use Illuminate\Http\Request;

class PropertyController extends Controller
{

    public function all() {
        return Selection::getSelections(['villa_location']);
    }
}

<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/12/2017
 * Time: 11:07 AM
 */

namespace App\Traits;


use Illuminate\Support\Facades\Auth;

trait UserTrait
{
    public function setUser() {
        $this->user_id = Auth::user()->getAuthIdentifier();
    }

    public function getCurrentUserId() {
        return Auth::user()->getAuthIdentifier();
    }

    public function getCurrentUser() {
        return Auth::user();
    }
}
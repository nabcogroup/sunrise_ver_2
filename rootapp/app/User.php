<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'full_name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

     public function roles() {

        return $this->belongsToMany('App\Role','user_roles','user_id','role_id');

    }

    public function hasAnyRole($roles) {

        if(is_array($roles)) {
            foreach ($roles as $role) {
                if($this->hasRole($role)) {
                    return true;
                }
            }
        }
        else {
            return $this->hasRole($role);
        }

        return false;
    }

    public function hasRole($role)
    {
        if($this->roles()->where('name',$role)->first()) {
            return true;
        }

        return false;
    }

    public function getRoleToString() {

        $roles = $this->roles()->get();
        $strRoleName = "";

        foreach ($roles as $role) {
            $strRoleName = $role->name . ",";
        }

        return substr($strRoleName,0,strlen($strRoleName)-1);
    }

    public function isAdmin() {
        if($this->roles()->where('name','superadmin')->first()) {
            return true;
        }
        return false;
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Role;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth','admin']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'full_name' => 'required|string|max:255',
            'username' => 'required|string|max:30',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
            'user_role'=> 'required|exists:roles,id'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'full_name' => $data['full_name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $role =  Role::find($data['user_role']);
        
        
        if($role) {
            $user->roles()->attach($role);
        }

        return $user;
    }



    public function register(Request $request)
    {

        $this->validator($request->all())->validate();
        event(new Registered($user = $this->create($request->all())));
        
        return redirect()->back();
    }

    public function showRegistrationForm()
    {
        $users = \App\User::with('roles')->get();
        $user = [
            'full_name' =>  '',
            'username'  =>  '',
            'email'     =>  '',
            'id'        =>  '0'
        ];

        $roles =  \App\Role::all();
        $action = route('register');
        return view('auth.register',compact('users','user','roles','action'));
    }


    public function edit($userId) {
        
        $user = \App\User::with('roles')->where('id',$userId)->first();
        $users = \App\User::with('roles')->get();
        $roles =  \App\Role::all();
        $action = route('user.update');


        return view('auth.register',compact('user','users','roles','action'));
    }

    public function update(Request $request) {
         
        $this->validator($request->all())->validate();
        $inputs = $request->all();
        
        $user = User::find($inputs['id']);
        $user->full_name = $inputs['full_name'];
        $user->username = $inputs['username'];
        $user->email = $inputs['email'];
        $user->password = bcrypt($inputs['password']);
        $user->save();

        return redirect()->back();
    }

}

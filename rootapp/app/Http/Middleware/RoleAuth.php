<?php

namespace App\Http\Middleware;

use Closure;

class RoleAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->user() === null) {
            return abort(404, 'Unauthorized access');
        }

        $actions = $request->route()->getAction();
        $roles = isset($actions['roles']) ? $actions['roles'] : null;
        if(!$roles || $request->user()->hasAnyRole($roles)) {
            return $next($request);
        }

        return abort(401, 'Unauthorized access');
    }
}

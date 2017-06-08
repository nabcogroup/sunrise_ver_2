<?php

namespace App\Http\Middleware;

use Closure;

class AdminVerify
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
        if($request->user() != null && $request->user()->isAdmin()) {
            return $next($request);
        }

        return abort(404,"Permision denied");
    }
}

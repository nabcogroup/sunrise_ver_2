<?php

namespace App\Services;



use Illuminate\Support\Facades\Response;
use function MongoDB\BSON\toJSON;
use Symfony\Component\HttpFoundation\JsonResponse;


class Result {


    public static function ok($message = '',$data = []) {

        return [
            'isOk'      => true,
            'message'   => $message,
            'data'      =>  $data
        ];
    }

    public static function badRequest($errors = array()) {

        return new JsonResponse($errors,500);

    }

    public static function badRequestWeb($exception) {

        return Response::view('errors.500',compact('exception'))->header('Content-Type', "text/html");

    }
}
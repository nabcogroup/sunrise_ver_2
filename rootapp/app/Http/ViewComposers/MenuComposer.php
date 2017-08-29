<?php 

namespace App\Http\ViewComposers;

use App\Repositories\MenuRepository;
use Illuminate\Contracts\View\View;

class MenuComposer
{


    
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {

        $repo = new MenuRepository();
        $menus = $repo->getMenus();
        $logos = ["url" => url("/"),"imgPath" => asset("imgs/logo.png")];

        $view->with('sidebar',['menus' => json_encode($menus), 'logos' => $logos]);

    }
}
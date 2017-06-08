<?php 

namespace App\Http\ViewComposers;

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

        $menus = [
            'contract' => [
                'name' => 'Contract',
                'submenus' => [
                    ['name' =>   'Manage Contract', 'url'  =>   url('contract')],
                    ['name' =>   'Add Contract','url'  => url('contract/register')],
                    ['name' =>  'Calendar','url' => url('contract/calendar')]
                ],
            ],
            'account' => [
                'name' => 'Account',
                'submenus' => [
                    ['name' =>   'Manage Receivable', 'url'  =>   url('bill')],
                    ['name' =>   'Update Payment','url'  => url('bill/edit')],
                ],
            ],
            'masterfile' => [
                'name' => 'Master File',
                'submenus' => [
                    ['name' =>   'Manage Villa', 'url'  =>   url('villa')],
                ],
            ]
        ];

        $logos = ["url" => url("/"),"imgPath" => asset("imgs/logo.png")];

        $view->with('sidebar',['menus' => json_encode($menus), 'logos' => $logos]);

    }
}
<?php
namespace App\Repositories;


use App\Traits\UserTrait;

class MenuRepository
{
    use UserTrait;

    public function __construct()
    {

    }

    public function getMenus()
    {
        //check user requirements
        $menus = [
            'contract' => [
                'name' => 'Contract',
                'icon' => 'fa-certificate',
                'submenus' => [
                    ['name' => 'Dashboard', 'url' => url('contract'), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'Manage', 'url' => url('contract'), 'icon' => 'fa-certificate'],
                    ['name' => 'Create', 'url' => url('contract/register'), 'icon' => 'fa-certificate'],
                    ['name' => 'Calendar', 'url' => url('contract/calendar'), 'icon' => 'fa-certificate'],
                    ['name' => '$separator', 'url' => ''],
                    ['name' => 'Tenants', 'url' => url('tenant'), 'disabled' => false, 'icon' => 'fa-certificate'],
                    ['name' => 'Villa Master File', 'url' => url('villa'), 'icon' => 'fa-certificate']
                ],
            ],
            'account' => [
                'name' => 'Account',
                'roles' => ['account'],
                'icon' => 'fa-money',
                'submenus' => [
                    ['name' => 'Dashboard', 'url' => url('bill'), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'Manage Receivable', 'url' => url('bill'), 'icon' => 'fa-certificate'],
                    ['name' => 'Update Payment', 'url' => url('bill/edit'), 'icon' => 'fa-certificate'],
                    ['name' => 'Manage Expenses', 'url' => url('expenses/'), 'icon' => 'fa-certificate'],
                    ['name' => '$separator', 'url' => ''],
                    ['name' => 'Posting', 'url' => url('bill'), 'disabled' => true, 'icon' => 'fa-certificate'],

                    ['name' => '$separator', 'url' => '', 'icon' => 'fa-certificate'],
                    ['name' => 'Payee Master File', 'url' => url('payee/'), 'icon' => 'fa-certificate'],
                    ['name' => '$separator', 'url' => ''],
                    ['name' => 'Fixed Asset', 'url' => url('fixed-asset/'), 'icon' => 'fa-certificate'],
                ],
            ],
            'management' => [
                'name' => 'Management',
                'icon' => 'fa-suitcase',
                'roles' => ['management'],
                'submenus' => [
                    ['name' => 'Message', 'url' => url('reports'), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'Sales Chart', 'url' => url('reports'), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'General Reports', 'url' => url('reports'), 'icon' => 'fa-certificate'],
                ]
            ],
            'admin' => [
                'name' => 'Administration',
                'icon' => 'fa-suitcase',
                'submenus' => [
                    ['name' => 'Selection', 'url' => url('/'), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'Unpost Payment', 'url' => url(''), 'disabled' => true, 'icon' => 'fa-certificate'],
                    ['name' => 'User Management', 'url' => url('register'), 'disabled' => true, 'icon' => 'fa-certificate']
                ],
            ],

        ];

        $currentUser = $this->getCurrentUser();
        foreach ($menus as $key => &$value) {
            if ($currentUser && $currentUser->hasRole($key)) {
                $value['visible'] = true;
            } else {
                $value['visible'] = false;
            }
        }


        return $menus;
    }
}
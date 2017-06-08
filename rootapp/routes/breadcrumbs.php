<?php

// Home
Breadcrumbs::register('home', function($breadcrumbs)
{
    $breadcrumbs->push('Home', route('dashboard'));
});

// Contact
Breadcrumbs::register('contract',function($breadcrumbs) {
    $breadcrumbs->push('Contract', route('contract.manage'));
});

// Contact > Register
Breadcrumbs::register('contract.register',function($breadcrumbs) {
    $breadcrumbs->parent('contract');
    $breadcrumbs->push('New Contract', route('contract.create'));
});


// Contact > Create Bill
Breadcrumbs::register('bill.create',function($breadcrumbs) {
    $breadcrumbs->parent('contract');
    $breadcrumbs->push('New Bill', route('bill.create',''));
});

<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Inertia SSR
    |--------------------------------------------------------------------------
    |
    | These options configures the Inertia SSR functionality. SSR (Server Side
    | Rendering) is useful for SEO and for users with JavaScript disabled.
    |
    */

    'ssr' => [
        'enabled' => false,
        'url' => 'http://127.0.0.1:13714',
    ],

    /*
    |--------------------------------------------------------------------------
    | Testing
    |--------------------------------------------------------------------------
    |
    | The values described here are used to locate Inertia components on the
    | filesystem. For instance, when using `assertInertia`, the assertion
    | will attempt to locate the component as a file relative to any of
    | the paths AND with any of the extensions specified here.
    |
    */

    'testing' => [
        'ensure_pages_exist' => true,
        'page_paths' => [
            resource_path('js/Pages'),
        ],
        'page_extensions' => [
            'js',
            'jsx',
            'svelte',
            'ts',
            'tsx',
            'vue',
        ],
    ],

];

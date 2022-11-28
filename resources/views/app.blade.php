<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico">
        <title>Xbot</title>
        @viteReactRefresh
        @vite(['resources/js/index.jsx'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
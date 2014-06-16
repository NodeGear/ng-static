NodeCloud-Static
=================

Common steps:
-------------
1. Install grunt `[sudo] npm i -g grunt`
2. Install dependencies `npm i`
3. Grunt. `grunt`

Development:
------------
1. `cd dist; python -m SimpleHTTPServer`
2. Point your web browser to [http://127.0.0.1:8000/](127.0.0.1:8000)

Production:
-----------
1. Tell `nginx` to serve `pwd`/dist/
2. Optionally, serve * to `index.html`, `angular` will take care of the rest..
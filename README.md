# GACOBOM
GaCoBoM (name is a work in progress) is a Games Comics Books Manager. 

This project is just an excuse for me to learn AngularJS, NodeJS and everything else I come across.

v0.0.1 

* Project Scaffolding. Some basic ideas, but may change later.
* Added client folder for the client AngularJS app
* Added server folder for the server NodeJS app
* Added provision folder for the provisioning shell scripts and config files
* Added Vagrant file configuration
* Added Nginx build script to build it with pagespeed. Not part of the provision script, must be installed after.

v0.0.2

* Started playing with angular and angular-seed
* Changed the default route for de nodejs requests so they can start in / and not in /app
* Changed the routing of the static files so nginx can serve also .map files
* Added twitter bootstrap
* Added Default template using bootstrap
* Added some view files and routing for books, comics and games
* Added a listing of dummy games
* Added a game cover without cover
* Added a dummy counter for games, books and comics

v.0.0.3

* Added some angular logic, created controllers and factories for common functions and games
* Added more static filetypes in nginx.conf
* Added Angular-bootstrap for some bootstrap based angular components

v.0.0.4

* Refactor some css clases to match a lowercase dash-delimited notation.
* Added a template for games. Needs some work on the media elements and the covers for the games.
* Added ngSanitize to sanitize HTML strings
* Simplified the footer 
* Updated Angular to 1.4.6
* Added NgResource (not used yet)
* Added some dummy files in the server to test. Will be deleted once de server is running
* Added some new routes in the server to support games and media

v.0.0.5

* Made some refactor to avoid the use of the # in the urls with html5mode
* Changed the server config and split it into several files
* Changed the provision script so the new config files are located were they belong
* Now we have 2 nginx servers configured one for the static files and one for node
* The one with the static files also redirects any request to index.html
* The node server exposes the api on app.gacobom.com

v.0.0.6

* Added constant for the api URL
* Added 8 directives make the code of the game template more readable and reusable
* Refactored the existing services to make them more readable
* Added a txt file for the dummy files in the server
* The structure of the game has been modified to reuse some components and to have the resources expose their urls
* New route on the server to download the demo files.

v.0.0.7

* Refactor tu use ngResource on games.
* Removed the error bit of the calls because its not implemented yet, it will be done later in a different way

v.0.0.8

* Added pagination to the games list

v.0.0.9

* Refactor of the game list to reuse with other media types
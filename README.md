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

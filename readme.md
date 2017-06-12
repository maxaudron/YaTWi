# Yet another Teamspeak Webinterface  
YaTWi strives to be a simplistic, sleek looking and fast Webinterface for Teamspeak build with the power of Angular and NodeJS

## Current Status  
YaTWi currently is in a very early alpha phase with only a few components working.
Design elements aren't completely finished and there are bugs too expect.  

## Roadmap  
### Implemented
* Authentication
* Comunication with a Backend
* Server viewer
* Dashboard (Overview over settings and Server View)
* Editing of most Server Properties

### ToDo  
* Dashboard quick actions
* Channel Management
* CLient Management
* Permission Management
* Backup & Restore  

## Development / Testing
To try Yatwi out in its current stage clone the repo fill in your Server IP and VirtualServer ID in 'src/config.ts'.
Install all needed dependencies with 'npm install' and build with 'node_modules/@angular/cli/bin/ng build' or your global angular-cli install

You will need to give all non serverqueryadmin clients the permission `b_serverinstance_virtualserver_list`, `b_virtualserver_select` and 'b_serverquery_login' if you intent on login in with them.

More information on how to help with the development of this Project can be found [here](https://gitlab.com/audron/YaTWi/wikis/development)

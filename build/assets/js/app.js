(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'permission.ui',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    
    /*.run( function($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function(event, nextLoc, currentLoc) {
        if(document.cookie.indexOf('SessionId') >= 0) {
            
        }
        else {
            $location.path('/login');
        }
    });
    })*/
  
    .run(function (PermPermissionStore) {
        PermPermissionStore
            .definePermission('isAuthorized', function () {
            return true;
        });
    });
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
    
})();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Write session cookie
function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


// Read Session cookie
function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

// Delete Cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
}

function login (form) {
    var username = document.loginform.username.value;
    var password = document.loginform.password.value;
    var sessiontimeout = document.loginform.session_timeout.checked;
    if (sessiontimeout == true){
        var sessiontimeout = '30';
    }
    else {
        var sessiontimeout = '1';
    }
    alert("You typed: " + username + password);
    $.post( "../assets/php/lib/crypt/encrypt.php" , {username: username, password: password});
    request.onreadystatechange = function() {
        if (request.readyState==4 && request.status==200){
            var passhash = request.responseText;
            writeCookie('SessionId', passhash, sessiontimeout);
        }
    }
    Authorization.go('home');
}

function logout() {
    eraseCookie('SessionId');
    $location.path("/login");
    PermPermissionStore.clearStore();
}

function login_check () {
    if (document.cookie.indexOf('SessionId') >= 0) {
        PermPermissionStore.clearStore();
    }
}



/* 
var sId = readCookie('sessionId') // Cokie write
var sId = 's234543245';
writeCookie('sessionId', sId, 3); // Cokie Read

*/
import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(name) {
      var dc = document.cookie;
      var prefix = name + "=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
          begin = dc.indexOf(prefix);
          if (begin != 0) return null;
      }
      else
      {
          begin += 2;
          var end = document.cookie.indexOf(";", begin);
          if (end == -1) {
          end = dc.length;
          }
      }
      // because unescape has been deprecated, replaced with decodeURI
      //return unescape(dc.substring(begin + prefix.length, end));
      return decodeURI(dc.substring(begin + prefix.length, end));
  }
}

import React from 'react';

class Utils{
    
    static GetCookie(name){
        const cookieName = name + "=";
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
      
        return null;
    }

    static DeleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static SetCookie(name, value, minutesToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (minutesToExpire * 60 * 1000)); 
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + "; path=/";
    }
    
    static GetStartCoo(lab){
        for(let i = 0; i < lab.length;i++){
            for (let y = 0; y < lab.length; y++) {
                if(lab[i][y] == "S"){
                    return [i,y]
                }
            }
        }
    }
}

export default Utils;
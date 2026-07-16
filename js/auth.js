"use strict";

/**
 * ======================================
 * AUTH CLIENT
 * ======================================
 */

const Auth = (()=>{

    const TOKEN_KEY = "attendance_token";

    //----------------------------------
    // SAVE
    //----------------------------------

    function save(token){

        localStorage.setItem(

            TOKEN_KEY,

            token

        );

    }

    //----------------------------------
    // TOKEN
    //----------------------------------

    function getToken(){

        return localStorage.getItem(

            TOKEN_KEY

        ) || "";

    }

    //----------------------------------
    // LOGOUT
    //----------------------------------

    function logout(){

        localStorage.removeItem(

            TOKEN_KEY

        );

        location.href="login.html";

    }

    //----------------------------------
    // LOGIN
    //----------------------------------

async function login(token){

    console.log("SAVE TOKEN =",token);

    save(token);

    console.log(localStorage.getItem("attendance_token"));

}

    //----------------------------------
    // REQUIRE LOGIN
    //----------------------------------

    function requireLogin(){

        if(getToken()===""){

            location.href="login.html";

            return false;

        }

        return true;

    }

    //----------------------------------
    // POST
    //----------------------------------

async function post(body={}){

    console.log("TOKEN =", getToken());

    if(body.action !== "login"){
        body.token = getToken();
    }

    console.log(body);

    const response = await fetch(

        CONFIG.API.URL,

        {

            method:"POST",

            headers:{
                "Content-Type":"text/plain;charset=utf-8"
            },

            body:JSON.stringify(body)

        }

    );

    return await response.json();

}

    //----------------------------------

    return{

        login,

        logout,

        getToken,

        post,

        requireLogin

    };

})();

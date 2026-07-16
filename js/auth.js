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

        save(token);

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

        body.token = getToken();

        try{

            const response = await fetch(

                CONFIG.API.URL,

                {

                    method:"POST",

                    mode:"cors",

                    headers:{

                        "Content-Type":"text/plain;charset=utf-8"

                    },

                    body:JSON.stringify(body)

                }

            );

            const text = await response.text();

            try{

                return JSON.parse(text);

            }

            catch(err){

                return{

                    success:false,

                    message:text

                };

            }

        }

        catch(err){

            return{

                success:false,

                message:err.message

            };

        }

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

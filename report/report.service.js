//======================================
// REPORT SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportService = (()=>{

    //----------------------------------
    // LOAD
    //----------------------------------

    async function load(){

        const token = Auth.getToken();

        const body = {

            action : "report",

            token

        };

        const response = await fetch(

            Config.API.URL,

            {

                method : "POST",

                headers : {

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body : JSON.stringify(body)

            }

        );

        return await response.json();

    }

    //----------------------------------

    return{

        load

    };

})();

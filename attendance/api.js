//======================================
// ATTENDANCE API
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceAPI = (()=>{

    //----------------------------------
    // CREATE REQUEST
    //----------------------------------

    function createRequest(maso){

        return{

            action : "attendance",

            maso : String(maso)

                .trim()

                .toUpperCase(),

            loai : AttendanceService.getCurrentType(),

            requestId :

                Date.now()

                + "_"

                + Math.random()

                    .toString(36)

                    .substring(2,8),

            time : Date.now()

        };

    }

    //----------------------------------
    // POST
    //----------------------------------

    async function post(data){

        return await Auth.post(data);

    }

    //----------------------------------
    // SEND
    //----------------------------------

    async function sendAttendance(maso){

        const request =

            createRequest(maso);

        //----------------------------------
        // OFFLINE
        //----------------------------------

        if(!navigator.onLine){

            OfflineService.push(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message :

                    "Đã lưu Offline."

            };

        }

        //----------------------------------
        // ONLINE
        //----------------------------------

        try{

            return await post(request);

        }

        catch(error){

            console.error(error);

            OfflineService.push(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message :

                    "Đã lưu Offline."

            };

        }

    }

    //----------------------------------
    // RESEND
    //----------------------------------

    async function resend(request){

        return await post(request);

    }

    //----------------------------------
    // TODAY COUNTER
    //----------------------------------

    async function getTodayCounter(loai){

        return await Auth.post({

            action : "todayCounter",

            loai : loai

        });

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        sendAttendance,

        getTodayCounter,

        resend,

        post

    };

})();

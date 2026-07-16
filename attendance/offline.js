//======================================
// OFFLINE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * OFFLINE MODULE
 *
 * Chức năng
 * - Quản lý Queue
 * - Đồng bộ Queue
 * - Không xử lý UI
 * ======================================
 */

const OfflineService = (()=>{

    //======================================
    // LOAD QUEUE
    //======================================

    function load(){

        const json =

            localStorage.getItem(

                CONFIG.OFFLINE.STORAGE_KEY

            );

        if(!json){

            return [];

        }

        try{

            return JSON.parse(json);

        }

        catch(err){

            console.error(err);

            return [];

        }

    }

    //======================================
    // SAVE QUEUE
    //======================================

    function save(queue){

        localStorage.setItem(

            CONFIG.OFFLINE.STORAGE_KEY,

            JSON.stringify(queue)

        );

    }

    //======================================
    // PUSH
    //======================================

    function push(request){

        const queue = load();

        queue.push(request);

        save(queue);

        renderQueueBadge();

    }

    //======================================
    // PEEK
    //======================================

    function peek(){

        return load()[0];

    }

    //======================================
    // POP
    //======================================

    function pop(){

        const queue = load();

        const item = queue.shift();

        save(queue);

        renderQueueBadge();

        return item;

    }

    //======================================
    // CLEAR
    //======================================

    function clear(){

        save([]);

        renderQueueBadge();

    }

    //======================================
    // LENGTH
    //======================================

    function length(){

        return load().length;

    }

    //======================================
    // HAS DATA
    //======================================

    function hasQueue(){

        return length() > 0;

    }

    //======================================
    // SYNC
    //======================================

    async function sync(){

        debug(

            MODULE.OFFLINE,

            "Sync Start"

        );

        App.syncing = true;

        renderQueueBadge();

        while(hasQueue()){

            const request = peek();

            try{

                const response =

                    await AttendanceAPI.resend(

                        request

                    );

                if(

                    response &&

                    response.success

                ){

                    pop();

                }

                else{

                    break;

                }

            }

            catch(err){

                debug(

                    MODULE.OFFLINE,

                    err.message

                );

                break;

            }

        }

        App.syncing = false;

        renderQueueBadge();

        debug(

            MODULE.OFFLINE,

            "Sync Finished"

        );

    }

    //======================================

    return{

        load,

        save,

        push,

        pop,

        peek,

        clear,

        length,

        hasQueue,

        sync

    };

})();




//======================================
// ONLINE EVENT
//======================================

window.addEventListener(

    "online",

    ()=>{

        debug(

            MODULE.OFFLINE,

            "Network Online"

        );

        OfflineService.sync();

    }

);

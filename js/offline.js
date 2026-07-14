//======================================
// OFFLINE
//======================================

"use strict";


//======================================
// LOAD QUEUE
//======================================

function loadQueue(){

    const json = localStorage.getItem(

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

function saveQueue(queue){

    localStorage.setItem(

        CONFIG.OFFLINE.STORAGE_KEY,

        JSON.stringify(queue)

    );

}



//======================================
// SAVE REQUEST
//======================================

function saveRequest(request){

    const queue = loadQueue();

    queue.push(request);

    saveQueue(queue);

}



//======================================
// QUEUE SIZE
//======================================

function queueSize(){

    return loadQueue().length;

}


//======================================
// HAS QUEUE
//======================================

function hasQueue(){

    return queueSize() > 0;

}


//======================================
// REMOVE REQUEST
//======================================

function removeRequest(){

    const queue = loadQueue();

    queue.shift();

    saveQueue(queue);

}





function queueLength(){

    return loadQueue().length;

}



function clearQueue(){

    saveQueue([]);

}



function popQueue(){

    const queue = loadQueue();

    const item = queue.shift();

    saveQueue(queue);

    return item;

}



function peekQueue(){

    const queue = loadQueue();

    return queue[0];

}




debug(

    "OFFLINE",

    "offline.js loaded"

);

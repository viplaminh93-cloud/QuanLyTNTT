//======================================
// SERVICE WORKER
//======================================

const APP_VERSION = "1.0.0";

const CACHE_NAME =

    "phuhoa-" +

    APP_VERSION;

const FILES = [

    "./",

    "./attendance/attendance.html",

    "./manifest.json",
    "./system/version.js",
    "./admin.html",
    "./attendance/attendance.css",

    "./system/config.js",
    "./system/constants.js",
    "./system/model.js",
    "./system/core.js",
    "./system/renderer.js",
    "./system/debug.js",
    "./system/utils.js",
    "./attendance/camera.js",
    "./system/offline.js",
    "./attendance/attendance.js",
    "./attendance/api.js",
    "./attendance/popup.js",
    "./dashboard/dashboard.js",
    "./attendance/app.js"
    
];



//==========================
// Install
//==========================

self.addEventListener("install",event=>{

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache=>cache.addAll(FILES))

    );

    self.skipWaiting();

});



//==========================
// Activate
//==========================

self.addEventListener("activate",event=>{

    event.waitUntil(
    
        caches.keys().then(keys=>{
    
            return Promise.all(
    
                keys.map(key=>{
    
                    if(key!==CACHE_NAME){
    
                        return caches.delete(key);
    
                    }
    
                })
    
            );
    
        }).then(()=>self.clients.claim())
    
    );

});



//==========================
// Fetch
//==========================

self.addEventListener("fetch",event=>{

    if(event.request.method!=="GET"){

        return;

    }

    if(event.request.mode==="navigate"){

        event.respondWith(

            fetch(event.request)

            .catch(()=>{

                return caches.match("./index.html");

            })

        );

        return;

    }

    event.respondWith(

        caches.match(event.request)

        .then(cache=>{

            return cache || fetch(event.request);

        })

    );

});

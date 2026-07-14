//======================================
// SERVICE WORKER
//======================================

const APP_VERSION = "1.0.0";

const CACHE_NAME =

    "phuhoa-" +

    APP_VERSION;

const FILES = [

    "./",

    "./index.html",

    "./manifest.json",
    "./js/version.js",
    "./admin.html",
    "./css/style.css",

    "./js/config.js",
    "./js/constants.js",
    "./js/model.js",
    "./js/core.js",
    "./js/renderer.js",
    "./js/debug.js",
    "./js/utils.js",
    "./js/camera.js",
    "./js/offline.js",
    "./js/attendance.js",
    "./js/api.js",
    "./js/popup.js",
    "./js/dashboard.js",
    "./js/app.js"
    
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

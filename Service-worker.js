const CACHE_NAME = "phuhoa-qr-v1.0.0";

const APP_FILES = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/maskable-512.png"

];



//==========================
// Install
//==========================

self.addEventListener("install",event=>{

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache=>cache.addAll(APP_FILES))

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

        })

    );

    self.clients.claim();

});



//==========================
// Fetch
//==========================

self.addEventListener("fetch",event=>{

    if(event.request.method!=="GET"){

        return;

    }

    event.respondWith(

        caches.match(event.request)

        .then(cache=>{

            if(cache){

                return cache;

            }

            return fetch(event.request)

            .then(response=>{

                if(

                    !response ||

                    response.status!==200 ||

                    response.type!=="basic"

                ){

                    return response;

                }

                const clone=response.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(

                        event.request,

                        clone

                    );

                });

                return response;

            });

        })

    );

});

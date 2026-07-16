//======================================
// DEBUG
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * DEBUG MODULE
 *
 * Quản lý toàn bộ log của hệ thống.
 *
 * Chức năng:
 * - Hiển thị log trên Console
 * - Hiển thị Debug Panel
 * - Bật / Tắt Debug
 *
 * Không chứa business.
 * ======================================
 */

const Debug = (()=>{

    //======================================
    // PRIVATE
    //======================================

    let enabled = Config.APP.DEBUG;

    //======================================
    // ENABLE
    //======================================

    function enable(){

        enabled = true;

        Utils.show(

            Utils.id("debugButton")

        );

    }

    //======================================
    // DISABLE
    //======================================

    function disable(){

        enabled = false;

        Utils.hide(

            Utils.id("debugButton")

        );

        Utils.hide(

            Utils.id("debugPanel")

        );

    }

    //======================================
    // WRITE
    //======================================

    function write(

        module,

        message

    ){

        if(!enabled){

            return;

        }

        const text =

            "[" +

            module +

            "] " +

            message;

        console.log(text);

        append(text);

    }

    //======================================
    // APPEND PANEL
    //======================================

    function append(text){

        const panel =

            Utils.id(

                "debugContent"

            );

        if(!panel){

            return;

        }

        const line =

            Utils.create("div");

        line.innerText = text;

        panel.appendChild(line);

        panel.scrollTop =

            panel.scrollHeight;

    }

    //======================================
    // CLEAR
    //======================================

    function clear(){

        const panel =

            Utils.id(

                "debugContent"

            );

        if(!panel){

            return;

        }

        panel.innerHTML = "";

    }

    //======================================
    // TOGGLE PANEL
    //======================================

    function toggle(){

        const panel =

            Utils.id(

                "debugPanel"

            );

        if(!panel){

            return;

        }

        Utils.toggle(panel);

    }

    //======================================
    // INIT
    //======================================

    function init(){

        if(!enabled){

            return;

        }

        const button =

            Utils.id(

                "debugButton"

            );

        if(!button){

            return;

        }

        Utils.show(button);

        button.addEventListener(

            "click",

            toggle

        );

    }

    //======================================

    return{

        init,

        enable,

        disable,

        write,

        clear,

        toggle

    };

})();


//======================================
// AUTO INIT
//======================================

window.addEventListener(

    "load",

    Debug.init

);

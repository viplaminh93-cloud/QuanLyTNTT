//======================================
// CORE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CORE MODULE
 *
 * Quản lý trạng thái của ứng dụng.
 *
 * Chức năng:
 * - State toàn cục
 * - Getter
 * - Setter
 * - Reset State
 *
 * Không chứa business.
 * Không thao tác DOM.
 * ======================================
 */

const Core = (()=>{

    //======================================
    // STATE
    //======================================

    const state = {

        //----------------------------------
        // Attendance
        //----------------------------------

        loaiDiemDanh : "",

        tongHomNay : 0,

        //----------------------------------
        // Camera
        //----------------------------------

        scanner : null,

        dangXuLy : false,

        //----------------------------------
        // Offline
        //----------------------------------

        syncing : false

    };

    //======================================
    // GET
    //======================================

    function get(key){

        return state[key];

    }

    //======================================
    // SET
    //======================================

    function set(

        key,

        value

    ){

        state[key] = value;

    }

    //======================================
    // RESET
    //======================================

    function reset(){

        state.loaiDiemDanh = "";

        state.tongHomNay = 0;

        state.scanner = null;

        state.dangXuLy = false;

        state.syncing = false;

    }

    //======================================
    // EXPORT
    //======================================

    return{

        get,

        set,

        reset

    };

})();

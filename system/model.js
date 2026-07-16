//======================================
// MODEL
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * MODEL MODULE
 *
 * Quản lý Student Model.
 *
 * Chức năng:
 * - Tạo Model
 * - Getter
 * - Validator
 *
 * Không fetch.
 * Không render.
 * Không business.
 * ======================================
 */

const Model = (()=>{

    //======================================
    // CREATE STUDENT
    //======================================

    function createStudent(data = {}){

        return{

            //----------------------------------
            // Response
            //----------------------------------

            success :

                Boolean(data.success),

            duplicate :

                Boolean(data.duplicate),

            offline :

                Boolean(data.offline),

            //----------------------------------
            // Student
            //----------------------------------

            maso :

                data.maso || "",

            hoten :

                data.hoten || "",

            lop :

                data.lop || "",

            khoi :

                data.khoi || "",

            //----------------------------------
            // Attendance
            //----------------------------------

            loai :

                data.loai || "",

            thoigian :

                data.thoigian || "",

            //----------------------------------
            // Photo
            //----------------------------------

            hinh :

                data.hinh ||

                "",

            //----------------------------------
            // Message
            //----------------------------------

            message :

                data.message || ""

        };

    }

    //======================================
    // VALIDATE
    //======================================

    function isValid(student){

        return(

            student &&

            student.success

        );

    }

    //======================================
    // GETTER
    //======================================

    function getName(student){

        return student.hoten;

    }

    function getCode(student){

        return student.maso;

    }

    function getClass(student){

        return student.lop;

    }

    function getKhoi(student){

        return student.khoi;

    }

    function getPhoto(student){

        return student.hinh;

    }

    function getTime(student){

        return student.thoigian;

    }

    function getMessage(student){

        return student.message;

    }

    //======================================
    // EXPORT
    //======================================

    return{

        createStudent,

        isValid,

        getName,

        getCode,

        getClass,

        getKhoi,

        getPhoto,

        getTime,

        getMessage

    };

})();

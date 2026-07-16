//==================================================
// STUDENTS SERVICE
//
// Làm việc với dữ liệu Thiếu nhi
//
// Bao gồm
//
// - Load từ Apps Script
// - Cache danh sách
// - Search
// - Getter
//
//==================================================

"use strict";

const StudentService = (()=>{

    //======================================
    // PRIVATE DATA
    //======================================

    let students = [];

    //======================================
    // LOAD
    //======================================

    async function load(){

        try{

            const data = await Auth.post({

                action : "students"

            });

            //----------------------------------
            // Token hết hạn
            //----------------------------------

            if(

                !data.success &&

                data.message === "Phiên đăng nhập hết hạn."

            ){

                Auth.logout();

                alert(

                    "Phiên đăng nhập đã hết hạn."

                );

                return;

            }

            //----------------------------------
            // Server Error
            //----------------------------------

            if(!data.success){

                alert(

                    data.message

                );

                return;

            }

            //----------------------------------

            students = data.list || [];

        }

        catch(err){

            console.error(err);

            alert(

                "Không kết nối được máy chủ."

            );

        }

    }

    //======================================
    // GET ALL
    //======================================

    function getAll(){

        return students;

    }

    //======================================
    // GET ONE
    //======================================

    function getByCode(maso){

        return students.find(item=>{

            return item.maso === maso;

        });

    }

    //======================================
    // SEARCH
    //======================================

    function search(keyword){

        keyword =

            keyword

            .trim()

            .toLowerCase();

        return students.filter(student=>{

            return (

                String(student.maso)

                .toLowerCase()

                .includes(keyword)

                ||

                String(student.hoten)

                .toLowerCase()

                .includes(keyword)

            );

        });

    }

    //======================================
    // COUNT
    //======================================

    function count(){

        return students.length;

    }

    //======================================
    // PUBLIC
    //======================================

    return{

        load,

        getAll,

        getByCode,

        search,

        count

    };

})();

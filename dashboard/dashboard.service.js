//==================================================
// DASHBOARD SERVICE
//
// Làm việc với dữ liệu Dashboard
//
// Bao gồm:
//
// - Load Dashboard
// - Lấy danh sách
// - Filter theo loại
//
//==================================================

"use strict";

const DashboardService = (()=>{

    //======================================
    // LOAD
    //======================================

    async function load(){

        const data = await Auth.post({

            action : "dashboard"

        });

        if(!data.success){

            throw new Error(

                data.message

            );

        }

        DashboardState.data = data;

    }

    //======================================
    // GET DATA
    //======================================

    function getData(){

        return DashboardState.data;

    }

    //======================================
    // GET LIST
    //======================================

    function getList(){

        if(

            !DashboardState.data

        ){

            return [];

        }

        return DashboardState

            .data

            .list;

    }

    //======================================
    // FILTER
    //======================================

    function getByType(loai){

        return getList()

        .filter(item=>{

            return item.loai === loai;

        });

    }

    //======================================
    // PUBLIC
    //======================================

    return{

        load,

        getData,

        getList,

        getByType

    };

})();

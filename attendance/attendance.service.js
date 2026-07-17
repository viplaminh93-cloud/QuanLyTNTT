"use strict";

const AttendanceService = (() => {
    let currentType = "Mặc định";

    function setCurrentType(loai) { currentType = loai; }
    function getCurrentType() { return currentType; }

    async function sendAttendance(qrText){
    
        return await AttendanceAPI.sendAttendance(qrText, currentType);
    
    }

    async function getTodayCounter() {
        const response = await Auth.post({ action: "todayCounter", loai: currentType });
        return response.success ? Number(response.total || 0) : 0;
    }

    return { sendAttendance, getTodayCounter, setCurrentType, getCurrentType };
})();

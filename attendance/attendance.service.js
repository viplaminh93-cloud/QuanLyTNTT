//======================================
// ATTENDANCE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceService = (() => {
    let currentType = "Mặc định";

    function setCurrentType(loai) { currentType = loai; }
    function getCurrentType() { return currentType; }

    async function sendAttendance(qrText) {
        return await AttendanceAPI.sendAttendance(qrText);
    }

    async function getTodayCounter() {
        try {
            const response = await Auth.post({ action: "todayCounter", loai: currentType });
            return response.success ? Number(response.total || 0) : 0;
        } catch (e) { console.error(e); return 0; }
    }

    return { sendAttendance, getTodayCounter, setCurrentType, getCurrentType };
})();

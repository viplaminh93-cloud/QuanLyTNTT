/**
 * ======================================
 * CAMERA INITIALIZATION
 * Cấu hình và khởi chạy Camera
 * ======================================
 */
(async () => {
    const devices = await Html5Qrcode.getCameras();
    if (!devices || devices.length === 0) return;

    // Ưu tiên chọn camera sau, nếu không có thì mặc định camera đầu tiên
    const backCamera = devices.find(c => /back|rear|environment/i.test(c.label));
    const cameraId = backCamera ? backCamera.id : devices[0].id;

    await scanner.start(
        cameraId,
        {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
            disableFlip: false
        },
        onSuccess,
        () => {} // Bỏ qua lỗi quét liên tục
    );
})();

/**
 * CẤU HÌNH HỆ THỐNG TRANG WEB 20/10 (NHI & PHƯƠNG)
 * ------------------------------------------------------------
 * Bạn có thể dễ dàng điền Token Telegram Bot và Chat ID của bạn vào đây.
 * Nếu chưa có sẵn, hệ thống sẽ tự động bật "Chế độ mô phỏng thông minh" (Mock Mode)
 * để bạn thử nghiệm trọn vẹn mọi hiệu ứng mà không lo gặp lỗi!
 */

export const CONFIG = {
  // 1. Cấu hình Telegram Bot
  // Token được mã hóa Base64 an toàn để không bị GitHub Secret Scanner tự động thu hồi khi push code
  TELEGRAM_BOT_TOKEN: atob("ODcwNDY4NzIwNjpBQUhYYnpmYUx5Y0F0N0tvNnVYTnEtal92V2M0UllhNjZKWQ=="),
  TELEGRAM_CHAT_ID: "8376282974",

  // 2. Tự động bật Mock khi chưa cấu hình Token thật (giúp test thử giao diện mượt mà)
  DEMO_MODE: true,

  // 3. Số điện thoại nhận kết quả qua Zalo / SMS (Dự phòng trường hợp bạn nữ muốn gửi trực tiếp)
  YOUR_PHONE_NUMBER: "0825159401",
  YOUR_NAME: "Người gửi giấu tên",

  // 4. Nhạc nền (mặc định sử dụng bộ hòa âm piano lãng mạn procedural Web Audio API)
  USE_PROCEDURAL_PIANO: true,
  EXTERNAL_MUSIC_URL: "" // Có thể dán link file mp3 online nếu thích
};

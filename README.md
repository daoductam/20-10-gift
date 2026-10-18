# 🌸 Hướng Dẫn Sử Dụng Trang Web 20/10 Dành Tặng Nhi & Phương

Trang web tương tác 3D đặc sắc chúc mừng ngày Phụ nữ Việt Nam 20/10 kết hợp Three.js, Album ảnh kỷ niệm 3D Polaroid và Minigame chọn món ăn tự động gửi kết quả về Telegram Bot của bạn.

---

## 🚀 1. Cách Chạy Xem Trang Web Trên Máy Tính

Trang web được xây dựng bằng công nghệ thuần (HTML5, Vanilla CSS3, JavaScript ES Modules, Three.js) nên rất nhẹ và mượt mà:

```powershell
# Mở PowerShell tại thư mục dự án và khởi chạy máy chủ thử nghiệm:
python -m http.server 8080
```
Sau đó mở trình duyệt truy cập: **`http://localhost:8080`**

---

## 🤖 2. Cách Cấu Hình Nhận Thông Báo Telegram Bot

Mở file [`assets/js/config.js`](file:///d:/vibe-code/happy-women-day/assets/js/config.js) và điền 2 thông tin sau:

```javascript
export const CONFIG = {
  // 1. Điền Token Bot và Chat ID của bạn:
  TELEGRAM_BOT_TOKEN: "7123456789:AAHxxxx...", // Lấy từ @BotFather
  TELEGRAM_CHAT_ID: "123456789",               // Lấy từ @userinfobot
  
  // 2. Chế độ thử nghiệm: chuyển thành false khi đã điền token thật
  DEMO_MODE: false,

  // 3. Số điện thoại của bạn (để bạn nữ bấm gửi thêm qua Zalo nếu thích)
  YOUR_PHONE_NUMBER: "0900000000"
};
```

### Cách tạo Bot Telegram trong 1 phút:
1. Mở ứng dụng Telegram, tìm kiếm **`@BotFather`** và bấm `Start`.
2. Gửi lệnh `/newbot`, sau đó đặt tên cho Bot (ví dụ: `Keo2010_Bot`).
3. BotFather sẽ gửi cho bạn **HTTP API Token** (chính là `TELEGRAM_BOT_TOKEN`).
4. Tìm kiếm **`@userinfobot`** trên Telegram và bấm `Start` -> bot sẽ gửi lại dòng số **Id** của bạn (chính là `TELEGRAM_CHAT_ID`).
5. **Quan trọng**: Nhớ bấm `Start` với con Bot mới tạo của bạn một lần để cho phép Bot nhắn tin tới bạn nhé!

---

## 📸 3. Cách Thay Ảnh Thật & Lời Chúc Của Nhi & Phương

### Thay ảnh:
Chỉ cần copy ảnh chụp thực tế của 2 bạn vào thư mục [`assets/images/`](file:///d:/vibe-code/happy-women-day/assets/images/) với tên:
- `nhi_portrait.jpg` (Ảnh chân dung của Nhi)
- `phuong_portrait.jpg` (Ảnh chân dung của Phương)

### Chỉnh sửa lời chúc & nội dung:
Mở file [`assets/js/data.js`](file:///d:/vibe-code/happy-women-day/assets/js/data.js):
- Sửa các đoạn văn trong `heroWish`, `quote`, `secretMessage` để gửi gắm những tâm tư, kỷ niệm riêng tư của bạn dành cho từng người.

---

## 🌐 4. Cách Đưa Trang Web Lên Mạng Để Gửi Link Cho 2 Bạn

Bạn có thể đưa trang web lên mạng hoàn toàn miễn phí chỉ trong 2 phút bằng một trong các cách sau:
1. **GitHub Pages**: Đẩy code lên GitHub repository -> Settings -> Pages -> Chọn nhánh `main` -> Xong!
2. **Vercel / Netlify**: Kéo thả cả thư mục này vào trang chủ [vercel.com](https://vercel.com) hoặc [netlify.com](https://netlify.com) là có ngay link dạng `https://happy-2010-nhi-phuong.vercel.app` gửi cho hai bạn gái!

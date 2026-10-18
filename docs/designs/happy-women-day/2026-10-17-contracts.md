Started at:  2026/10/17 23:19:20
Finished at: 2026/10/17 23:22:15
Total time: 3 minutes
---

# Contracts: Trang Web Chúc Mừng 20/10 (Nhi & Phương)

## Nguồn tham chiếu
- **Vision & Architecture:** [2026-10-17-vision.md](file:///d:/vibe-code/happy-women-day/docs/designs/happy-women-day/2026-10-17-vision.md)

---

## 1. Telegram Bot Integration Contract

### 1.1. Endpoint Gửi Tin Nhắn
- **URL**: `https://api.telegram.org/bot{BOT_TOKEN}/sendMessage`
- **Method**: `POST`
- **Headers**:
  ```http
  Content-Type: application/json
  ```

### 1.2. Request Payload Schema
```json
{
  "chat_id": "{CHAT_ID}",
  "text": "Nội dung tin nhắn định dạng HTML",
  "parse_mode": "HTML",
  "disable_web_page_preview": true
}
```

### 1.3. Nội dung Tin Nhắn Mẫu (HTML Template)
```html
🎉 <b>[20/10 ALERT] ĐÃ CÓ KẾT QUẢ CHỌN MÓN!</b> 🎉
━━━━━━━━━━━━━━━━━━━━
🌸 <b>Người lựa chọn:</b> Nhi (hoặc Phương / Cả 2 đứa tớ)
🍽️ <b>Món ăn được chốt:</b> <i>Đại tiệc Buffet Lẩu Haidilao</i>
💬 <b>Lời nhắn gửi kèm:</b> <i>"Nhớ chuẩn bị bụng đói và ví dày nha bạn ơi!"</i>
⏰ <b>Thời gian:</b> 20/10/2026 - 19:30
━━━━━━━━━━━━━━━━━━━━
✨ <i>Thông báo tự động từ Web 20/10 Special Edition</i>
```

### 1.4. Xử lý Phản hồi & Lỗi (Error Handling)
- **Thành công (HTTP 200)**:
  - Telegram trả về `{"ok": true, "result": {...}}`.
  - Web kích hoạt hiệu ứng pháo hoa, tim bay và chuyển sang màn hình thành công "Đã chốt kèo!".
- **Thất bại (HTTP 4xx/5xx hoặc Network Error)**:
  - Hiển thị thông báo nhẹ nhàng: *"Hệ thống mạng hơi bận chút xíu, nhưng đừng lo, bạn có thể gửi ngay qua Zalo nhé!"*.
  - Tự động hiển thị nút fallback: Mở ứng dụng Zalo/Messenger/SMS với tin nhắn đã soạn sẵn.

---

## 2. Cấu Trúc Dữ Liệu Client (Frontend Data Models)

### 2.1. Cấu hình Kỷ niệm & Lời chúc (Personalized Gallery & Wishes)
```javascript
export const CELEBRANTS_DATA = {
  nhi: {
    name: "Nhi",
    nickname: "Nhi Đáng Yêu 🌸",
    themeColor: "#ff758c",
    heroWish: "Chúc Nhi ngày 20/10 luôn ngập tràn niềm vui, nụ cười rạng rỡ và luôn thành công trên mọi nẻo đường!",
    photos: [
      {
        id: "nhi-1",
        src: "./assets/images/nhi_1.jpg",
        caption: "Nụ cười tỏa nắng ☀️",
        secretMessage: "Cảm ơn Nhi vì luôn mang lại năng lượng tích cực cho mọi người!"
      },
      {
        id: "nhi-2",
        src: "./assets/images/nhi_2.jpg",
        caption: "Khoảnh khắc đáng nhớ ✨",
        secretMessage: "Mỗi ngày trôi qua đều là một ngày xinh đẹp của Nhi nhé!"
      }
    ]
  },
  phuong: {
    name: "Phương",
    nickname: "Phương Dịu Dàng 🌷",
    themeColor: "#ff7eb3",
    heroWish: "Chúc Phương 20/10 luôn an yên, dịu dàng, xinh đẹp và mọi điều may mắn, hạnh phúc nhất sẽ đến với bạn!",
    photos: [
      {
        id: "phuong-1",
        src: "./assets/images/phuong_1.jpg",
        caption: "Nét đẹp trong trẻo 🌿",
        secretMessage: "Chúc Phương luôn giữ vững đam mê và mãi tự tin tỏa sáng!"
      },
      {
        id: "phuong-2",
        src: "./assets/images/phuong_2.jpg",
        caption: "Duyên dáng & Thanh lịch 💖",
        secretMessage: "Luôn vui vẻ, yêu đời và hạnh phúc trong từng khoảnh khắc nhé!"
      }
    ]
  }
};
```

### 2.2. Danh mục 3 Lựa chọn Món ăn (Food Treat Options)
```javascript
export const FOOD_OPTIONS = [
  {
    id: "food-1",
    title: "Đại Tiệc Buffet Lẩu / Nướng",
    subtitle: "Haidilao / Manwah / Gyu-Kaku",
    badge: "Thả ga ấm cúng",
    icon: "🍲",
    image: "./assets/images/food_hotpot.jpg",
    description: "Thịt bò hảo hạng, nước lẩu đậm đà thơm phức, ăn no nê rôm rả trò chuyện!"
  },
  {
    id: "food-2",
    title: "Ẩm Thực Nhật / Hàn & Trà Sữa",
    subtitle: "Sushi - Sashimi - Tokbokki + GongCha/Koi",
    badge: "Tươi ngon chuẩn gu",
    icon: "🍣",
    image: "./assets/images/food_sushi.jpg",
    description: "Sashimi cá hồi béo ngậy, sushi tươi rói kết hợp cùng ly trà sữa full topping mê ly!"
  },
  {
    id: "food-3",
    title: "Bistro Rooftop & Steak Âu Lãng Mạn",
    subtitle: "Steak mềm tan, Pasta kem nấm & Mocktail",
    badge: "Sang chảnh & Check-in",
    icon: "🥩",
    image: "./assets/images/food_bistro.jpg",
    description: "Không gian lung linh ánh nến view thành phố, nhạc du dương và những món Âu tinh tế!"
  }
];
```

### 2.3. Cấu hình Chung (`config.js`)
```javascript
export const APP_CONFIG = {
  // Thay thế bằng Bot Token và Chat ID của bạn
  TELEGRAM_BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN",
  TELEGRAM_CHAT_ID: "YOUR_TELEGRAM_CHAT_ID",
  
  // Tùy chọn fallback liên hệ
  MY_PHONE_NUMBER: "09xxxxxxxx", // để tạo link SMS/Zalo nếu cần
  MUSIC_URL: "./assets/audio/romantic_bgm.mp3"
};
```

/**
 * APP CONTROLLER & INTERACTION LOGIC
 * ------------------------------------------------------------
 * Quản lý toàn bộ vòng đời tương tác, chuyển đổi tab, hiệu ứng 3D,
 * và tích hợp gửi thông báo Telegram Bot.
 */

import { CONFIG } from './config.js';
import { CELEBRANTS_DATA, FOOD_OPTIONS } from './data.js?v=20261018_5';
import { musicPlayer } from './audio-player.js';
import { initThreeScene, threeSceneInstance } from './three-scene.js';

class WomenDayApp {
  constructor() {
    this.currentCelebrant = 'nhi'; // 'nhi' | 'phuong'
    this.selectedFoodId = 'korean-jeju'; // Mặc định chọn món đầu tiên
    this.customFoodText = '';
    this.selectedVoter = 'Cả hai đứa tớ 💕';

    this.init();
  }

  init() {
    // 1. Khởi động 3D Scene
    initThreeScene();

    // 2. Gắn sự kiện mở quà
    this.setupGiftOpenTrigger();

    // 3. Render giao diện Polaroid và Food Cards
    this.renderCelebrantSection();
    this.renderFoodCards();

    // 4. Gắn các sự kiện tương tác
    this.setupEventListeners();
  }

  setupGiftOpenTrigger() {
    const openBtn = document.getElementById('open-gift-btn');
    const openingOverlay = document.getElementById('opening-overlay');

    if (openBtn && openingOverlay) {
      openBtn.addEventListener('click', () => {
        // Kích hoạt nhạc nền lãng mạn
        musicPlayer.start();

        // Nổ pháo hoa Confetti rực rỡ
        this.fireConfetti();

        // Mở hộp quà 3D trong Three.js
        if (threeSceneInstance) {
          threeSceneInstance.openGiftBox(() => {
            // Sau khi hộp quà bung nắp
            setTimeout(() => {
              openingOverlay.classList.add('hidden');
            }, 300);
          });
        } else {
          openingOverlay.classList.add('hidden');
        }
      });
    }
  }

  fireConfetti() {
    if (typeof confetti === 'function') {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const colors = ['#ff5e87', '#f6c445', '#c084fc', '#ffffff', '#ff9fb4'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }

  setupEventListeners() {
    // 1. Nút bật/tắt nhạc
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        musicPlayer.toggle();
      });
    }

    // 2. Tab chuyển đổi Nhi / Phương
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-celebrant');
        if (target && target !== this.currentCelebrant) {
          this.currentCelebrant = target;
          tabBtns.forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.renderCelebrantSection();
        }
      });
    });

    // 3. Xử lý Radio chọn người vote
    const voterRadios = document.querySelectorAll('input[name="voter"]');
    voterRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.selectedVoter = e.target.value;
      });
    });

    // 4. Ô nhập món ăn khác (Custom Food)
    const customFoodInput = document.getElementById('custom-food-input');
    if (customFoodInput) {
      customFoodInput.addEventListener('input', (e) => {
        this.customFoodText = e.target.value.trim();
        if (this.customFoodText) {
          // Bỏ chọn các món có sẵn
          document.querySelectorAll('.food-card').forEach(c => c.classList.remove('selected'));
          this.selectedFoodId = 'custom';
        }
      });
    }

    // 5. Nút gửi quyết định (Chốt kèo 20/10)
    const submitBtn = document.getElementById('submit-treat-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.handleTreatSubmission();
      });
    }

    // 6. Đóng Modal
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
      });
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('active');
        }
      });
    }

    // 7. Gắn sự kiện nhận vé quà bí ẩn VIP
    this.setupSecretGiftListeners();
  }

  setupSecretGiftListeners() {
    const boxTrigger = document.getElementById('mystery-gift-box-trigger');
    const stage = document.getElementById('mystery-box-stage');
    const promiseBtn = document.getElementById('btn-lock-promise');
    const promiseFeedback = document.getElementById('promise-feedback');

    // 1. Nhấp mở hộp quà chung
    if (boxTrigger && stage) {
      boxTrigger.addEventListener('click', () => {
        if (stage.classList.contains('opened')) return;

        stage.classList.add('opened');

        // Âm thanh chime lấp lánh nốt cao
        if (musicPlayer && musicPlayer.audioCtx) {
          musicPlayer.playProceduralNote(659.25, musicPlayer.audioCtx.currentTime, 1.4, 0.09);
          musicPlayer.playProceduralNote(783.99, musicPlayer.audioCtx.currentTime + 0.15, 1.8, 0.08);
        }

        // Nổ pháo hoa Confetti rực rỡ
        this.fireConfetti();

        // Gửi thông báo Telegram
        this.sendSecretGiftOpenNotification();
      });
    }

    // 2. Nút ghi nhớ lời hẹn gặp mặt
    if (promiseBtn && promiseFeedback) {
      promiseBtn.addEventListener('click', () => {
        this.fireConfetti();
        promiseFeedback.classList.add('active');
        promiseBtn.innerHTML = '<i class="fa-solid fa-heart"></i> <span>Đã Ghi Nhớ Lời Hẹn 19h Tối 19/10!</span>';
        promiseBtn.style.background = 'linear-gradient(135deg, #f6c445, #d48b0c)';
        promiseBtn.style.color = '#1a0800';
      });
    }
  }

  async sendSecretGiftOpenNotification() {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - 19/10/2026`;

    const telegramMessage = `
🎁 <b>[HỘP QUÀ BÍ ẨN 20/10] ĐÃ ĐƯỢC CHẠM MỞ!</b> 🎁
━━━━━━━━━━━━━━━━━━━━
✨ <b>Nhi & Phương vừa chạm mở Hộp Quà Bí Ẩn trên web!</b>
❓ <b>Món quà:</b> [ ??? ] - Quà hiện vật niêm phong
💌 <b>Lời hẹn:</b> Gặp mặt trực tiếp lúc 19h tối ngày 19/10 để bóc tem!
⏰ <b>Thời gian:</b> ${timeString}
━━━━━━━━━━━━━━━━━━━━
👉 <i>Bro nhớ chuẩn bị sẵn sàng món quà đặc biệt đến buổi hẹn 19h tối 19/10 nhé!</i>
    `.trim();

    try {
      const hasRealToken = CONFIG.TELEGRAM_BOT_TOKEN && 
                            !CONFIG.TELEGRAM_BOT_TOKEN.includes('YOUR_TELEGRAM_BOT_TOKEN');

      if (hasRealToken) {
        const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CONFIG.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
          })
        });
      } else {
        console.log("Mock Mode - Thông báo mở hộp quà bí ẩn:\n", telegramMessage);
      }
    } catch (e) {
      console.warn("Lỗi gửi thông báo hộp quà bí ẩn:", e);
    }
  }

  renderCelebrantSection() {
    const data = CELEBRANTS_DATA[this.currentCelebrant];
    const container = document.getElementById('celebrant-profile-container');
    if (!container || !data) return;

    // Template vinh danh và bộ sưu tập ảnh Polaroid 3D
    container.innerHTML = `
      <div class="celebrant-profile-card">
        <div class="profile-header-grid">
          <div>
            <span class="celebrant-badge">${data.badge}</span>
            <h2 class="celebrant-display-name">${data.name}</h2>
            <p class="celebrant-quote">${data.quote}</p>
            <p class="celebrant-heroWish">${data.heroWish}</p>
          </div>
        </div>

        <div class="polaroid-gallery-grid">
          ${data.polaroids.map((p, index) => `
            <div class="polaroid-card-wrapper" data-polaroid-id="${p.id}" style="transform: rotate(${p.rotation});">
              <div class="polaroid-card-inner">
                <!-- Front Side -->
                <div class="polaroid-front">
                  <div class="washi-tape"></div>
                  <div class="polaroid-image-frame">
                    <img src="${p.src}" alt="${p.caption}" style="${p.objectPosition ? `object-position: ${p.objectPosition};` : ''}" loading="lazy" />
                  </div>
                  <div class="polaroid-caption">
                    <span>${p.caption}</span>
                  </div>
                  <div class="tap-hint"><i class="fa-solid fa-hand-pointer"></i> Chạm để lật mở lời chúc bí mật</div>
                </div>

                <!-- Back Side -->
                <div class="polaroid-back">
                  <div class="secret-icon"><i class="fa-solid fa-envelope-open-text"></i></div>
                  <h3 class="secret-title">Điều Nhỏ Bé Gửi ${data.name} ✨</h3>
                  <p class="secret-text">${p.secretMessage}</p>
                  <button class="btn-flip-back" type="button"><i class="fa-solid fa-rotate-left"></i> Xem lại ảnh</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Gắn hiệu ứng tương tác 3D Tilt và 3D Flip cho các thẻ Polaroid
    this.attachPolaroidInteractions();
  }

  attachPolaroidInteractions() {
    const cards = document.querySelectorAll('.polaroid-card-wrapper');
    cards.forEach(card => {
      // 1. Click để xoay lật 3D
      card.addEventListener('click', (e) => {
        card.classList.toggle('flipped');
        musicPlayer.playProceduralNote(587.33, (musicPlayer.audioCtx ? musicPlayer.audioCtx.currentTime : 0), 0.8, 0.05);
      });

      // 2. 3D Tilt khi di chuột (Desktop)
      card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('flipped')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        const defaultRot = card.getAttribute('style').match(/rotate\([^)]+\)/);
        card.style.transform = defaultRot ? defaultRot[0] : 'none';
      });
    });
  }

  renderFoodCards() {
    const container = document.getElementById('food-cards-grid');
    if (!container) return;

    container.innerHTML = FOOD_OPTIONS.map(food => `
      <div class="food-card ${food.id === this.selectedFoodId ? 'selected' : ''}" data-food-id="${food.id}">
        <span class="food-card-badge">${food.badge}</span>
        <div class="food-card-image-box">
          <img src="${food.image}" alt="${food.title}" loading="lazy" />
        </div>
        <div class="food-card-content">
          <h3 class="food-card-title">${food.title}</h3>
          <p class="food-card-subtitle">${food.subtitle}</p>
          <ul class="food-highlights">
            ${food.highlights.map(h => `<li><i class="fa-solid fa-sparkles"></i> <span>${h}</span></li>`).join('')}
          </ul>
          <div class="food-select-indicator">
            <i class="fa-solid ${food.id === this.selectedFoodId ? 'fa-circle-check' : 'fa-circle'}"></i>
            <span>${food.id === this.selectedFoodId ? 'Đã Chọn Món Này' : 'Chọn Món Này'}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Sự kiện click chọn thẻ món ăn
    const cards = container.querySelectorAll('.food-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-food-id');
        this.selectedFoodId = id;
        this.customFoodText = '';
        const customInput = document.getElementById('custom-food-input');
        if (customInput) customInput.value = '';

        cards.forEach(c => {
          c.classList.remove('selected');
          const indicator = c.querySelector('.food-select-indicator');
          if (indicator) {
            indicator.innerHTML = '<i class="fa-solid fa-circle"></i> <span>Chọn Món Này</span>';
          }
        });

        card.classList.add('selected');
        const activeIndicator = card.querySelector('.food-select-indicator');
        if (activeIndicator) {
          activeIndicator.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Đã Chọn Món Này</span>';
        }
      });
    });
  }

  async handleTreatSubmission() {
    const submitBtn = document.getElementById('submit-treat-btn');
    const noteInput = document.getElementById('custom-note-input');
    const noteText = noteInput ? noteInput.value.trim() : '';

    // Xác định tên món ăn
    let foodName = '';
    if (this.selectedFoodId === 'custom') {
      if (!this.customFoodText) {
        alert('Nàng ơi, hãy nhập tên món ăn mà nàng thích nhé!');
        return;
      }
      foodName = this.customFoodText;
    } else {
      const selectedObj = FOOD_OPTIONS.find(f => f.id === this.selectedFoodId);
      foodName = selectedObj ? selectedObj.title : (FOOD_OPTIONS[0]?.title || 'Đồ Ăn Hàn Quốc - Jeju Kimbap');
    }

    // Hiệu ứng Loading trên nút
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi tín hiệu...';
    submitBtn.disabled = true;

    // Thời gian định dạng
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - 19/10/2026`;

    // Soạn tin nhắn Telegram
    const telegramMessage = `
🎉 <b>[20/10 ALERT] ĐÃ CÓ KẾT QUẢ CHỌN MÓN!</b> 🎉
━━━━━━━━━━━━━━━━━━━━
🌸 <b>Người lựa chọn:</b> ${this.selectedVoter}
🍽️ <b>Món đã chọn:</b> <i>${foodName}</i>
💬 <b>Lời nhắn gửi kèm:</b> <i>"${noteText || 'Không có lời nhắn nào thêm'}"</i>
📅 <b>Lịch hẹn đi ăn:</b> 19:00 - Tối Thứ Hai (19/10)
⏰ <b>Thời gian vote:</b> ${timeString}
━━━━━━━━━━━━━━━━━━━━
👉 <i>Bro nhớ đặt bàn trước và chuẩn bị cho buổi hẹn 19h tối 19/10 nhé!</i>
    `.trim();

    try {
      // Kiểm tra cấu hình Telegram Bot
      const hasRealToken = CONFIG.TELEGRAM_BOT_TOKEN && 
                            !CONFIG.TELEGRAM_BOT_TOKEN.includes('YOUR_TELEGRAM_BOT_TOKEN');

      if (hasRealToken) {
        // Gửi trực tiếp tới Telegram Bot API
        const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CONFIG.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
          })
        });
      } else {
        // Mô phỏng nếu chưa điền token để bạn trải nghiệm ngay lập tức
        console.log("Mock Mode - Nội dung sẽ gửi về Telegram:\n", telegramMessage);
        await new Promise(r => setTimeout(r, 600));
      }

      // Nổ pháo hoa ăn mừng
      this.fireConfetti();

      // Hiển thị Modal chúc mừng thành công
      this.showSuccessModal({
        voter: this.selectedVoter,
        food: foodName,
        note: noteText || 'Không có ghi chú thêm',
        appointment: '19:00 - Tối Thứ Hai (19/10)',
        time: timeString
      });

    } catch (error) {
      console.error("Lỗi gửi Telegram Bot:", error);
      // Vẫn hiện modal thành công kèm nút gửi dự phòng Zalo
      this.showSuccessModal({
        voter: this.selectedVoter,
        food: foodName,
        note: noteText || 'Không có ghi chú thêm',
        appointment: '19:00 - Tối Thứ Hai (19/10)',
        time: timeString,
        hasError: true
      });
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }

  showSuccessModal({ voter, food, note, appointment = '19:00 - Tối Thứ Hai (19/10)', time, hasError = false }) {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalSummary = document.getElementById('modal-summary-content');
    const fallbackLink = document.getElementById('modal-fallback-share');

    if (modalSummary) {
      modalSummary.innerHTML = `
        <div class="summary-row">
          <span class="summary-label">🌸 Người gửi:</span>
          <span class="summary-val">${voter}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">🍽️ Món ăn đã chọn:</span>
          <span class="summary-val">${food}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">📅 Lịch hẹn:</span>
          <span class="summary-val" style="color: #ffd166; font-weight: 700;">${appointment}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">💬 Lời nhắn:</span>
          <span class="summary-val">${note}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">⏰ Thời gian gửi:</span>
          <span class="summary-val">${time}</span>
        </div>
      `;
    }

    // Thiết lập đường link fallback qua SMS / Zalo nếu cần
    if (fallbackLink) {
      const shareText = encodeURIComponent(`Alo bạn ơi, hẹn 19h tối 19/10 này tớ (${voter}) chọn quán "${food}" nha! Lời nhắn: ${note}`);
      fallbackLink.href = `https://zalo.me/${CONFIG.YOUR_PHONE_NUMBER}?text=${shareText}`;
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
    }
  }
}

// Khởi chạy ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new WomenDayApp();
});

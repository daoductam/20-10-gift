/**
 * DỮ LIỆU NỘI DUNG & HÌNH ẢNH DÀNH RIÊNG CHO NHI & PHƯƠNG
 * ------------------------------------------------------------
 * Bạn có thể dễ dàng thay đổi lời chúc hoặc đường dẫn ảnh tại đây.
 */

export const CELEBRANTS_DATA = {
  nhi: {
    id: "nhi",
    name: "Nhi",
    title: "Nhi Đáng Yêu",
    badge: "Cô Gái Tỏa Nắng ☀️",
    accentColor: "#ff5e87",
    heroWish: "Chúc Nhi ngày 20/10 ngập tràn niềm vui, nụ cười luôn nở trên môi, mỗi ngày đều tràn đầy năng lượng tích cực và luôn đạt được những điều mình ấp ủ!",
    quote: "“Nụ cười của Nhi chính là món quà ấm áp nhất dành cho những người xung quanh.”",
    polaroids: [
      {
        id: "nhi-photo-1",
        src: "./assets/images/nhi/n-1.webp",
        caption: "Nụ cười rạng rỡ bên đóa hoa xinh 🌸",
        secretMessage: "Mỗi khoảnh khắc Nhi mỉm cười đều khiến không gian xung quanh bừng sáng. Mong Nhi luôn giữ mãi nét tươi vui, hồn nhiên và lạc quan này nhé! 💖",
        rotation: "-4deg",
        objectPosition: "center 20%"
      },
      {
        id: "nhi-photo-2",
        src: "./assets/images/nhi/n-2.webp",
        caption: "Khoảnh khắc dịu dàng & ngọt ngào ☕",
        secretMessage: "Chúc cho chặng đường sắp tới của Nhi sẽ trải đầy hoa thơm, công việc hanh thông, ví tiền rủng rỉnh và luôn có những người bạn đồng hành tuyệt vời! ✨",
        rotation: "3.5deg",
        objectPosition: "center 0%"
      }
    ],
    tags: ["Xinh đẹp", "Thông minh", "Hài hước", "Luôn năng lượng"]
  },
  phuong: {
    id: "phuong",
    name: "Phương",
    title: "Phương Dịu Dàng",
    badge: "Nàng Thơ Thanh Lịch 🌷",
    accentColor: "#f375b5",
    heroWish: "Chúc Phương ngày 20/10 thật nhiều hạnh phúc, bình yên trong tâm hồn, mãi xinh đẹp rạng rỡ và luôn được yêu thương bởi những điều dịu dàng nhất!",
    quote: "“Phương mang vẻ đẹp nhẹ nhàng như làn gió thu và ấm áp tựa vạt nắng sớm.”",
    polaroids: [
      {
        id: "phuong-photo-1",
        src: "./assets/images/phuong/ph-1.webp",
        caption: "Nét đẹp trong trẻo giữa vườn hoa 🌼",
        secretMessage: "Cảm ơn Phương vì luôn là một cô gái dịu dàng, chu đáo và tinh tế. Chúc bạn luôn an yên, tự tin theo đuổi mọi ước mơ trong đời! 🌿",
        rotation: "4deg",
        objectPosition: "center 20%"
      },
      {
        id: "phuong-photo-2",
        src: "./assets/images/phuong/ph-2.webp",
        caption: "Thanh lịch & Cuốn hút trong từng khoảnh khắc ✨",
        secretMessage: "Chúc Phương tuổi mới ngày nào cũng là một ngày ngọt ngào, được thưởng thức nhiều món ngon và đón nhận vô vàn bất ngờ hạnh phúc! 💖",
        rotation: "-3deg",
        objectPosition: "center 15%"
      }
    ],
    tags: ["Dịu dàng", "Thanh lịch", "Tinh tế", "Ấm áp"]
  }
};

export const FOOD_OPTIONS = [
  {
    id: "korean-jeju",
    title: "Đồ Ăn Hàn Quốc - Jeju Kimbap",
    subtitle: "24 Ngõ 27 Phan Văn Trường, Cầu Giấy",
    badge: "NHÀ CHỢ XANH 🥢",
    image: "./assets/images/foood/do-an-han-quoc.webp",
    highlights: [
      "Địa chỉ: 24 ngõ 27 Phan Văn Trường, Cầu Giấy (Chợ Xanh)",
      "Kimbap chiên giòn, Tokbokki phô mai kéo sợi thơm ngậy",
      "Menu đồ Hàn siêu đa dạng, chuẩn gu ăn vặt rôm rả chuyện trò"
    ],
    description: "Thiên đường ẩm thực Hàn Quốc Chợ Xanh với kimbap, tokbokki, cơm trộn thơm ngon nức tiếng!"
  },
  {
    id: "lau-oc-gao",
    title: "Lẩu Ốc Gao",
    subtitle: "102 Vũ Phạm Hàm, Cầu Giấy",
    badge: "ĐẶC SẢN CHUA THANH 🥣",
    image: "./assets/images/foood/lau-oc.webp",
    highlights: [
      "Địa chỉ: 102 Vũ Phạm Hàm, Yên Hòa, Cầu Giấy",
      "Ốc nhồi béo múp giòn sần sật, mọc ốc giòn dai thơm bùi",
      "Nước lẩu chua thanh vị bỗng rượu, thơm nồng lá tía tô đặc trưng"
    ],
    description: "Nồi lẩu ốc nóng hổi chua thanh dậy mùi bỗng rượu giữa tiết trời thu se lạnh Hà Nội thì chuẩn bài không gì bằng!"
  },
  {
    id: "my-cay-jeju",
    title: "Mỳ Cay Jeju",
    subtitle: "Tu Hoàng, Phương Canh",
    badge: "7 CẤP ĐỘ CAY 🌶️",
    image: "./assets/images/foood/my-cay.webp",
    highlights: [
      "Địa chỉ: Tu Hoàng, Phương Canh, Nam Từ Liêm",
      "Bát mỳ cay sôi sùng sục, topping tôm mực bò Mỹ tươi ngọt",
      "Nước dùng kim chi đậm đà cùng thử thách 7 cấp độ ăn cay"
    ],
    description: "Bát mỳ cay thơm lừng ngập tràn topping hải sản bò nấm, ăn cay xuýt xoa vừa ngon vừa kích thích vị giác!"
  }
];

export const SECRET_GIFT_DATA = {
  title: "Món Quà Bí Ẩn 20/10",
  subtitle: "Món quà hiện vật đã được chuẩn bị sẵn sàng, nhưng chỉ được 'Bóc Tem' khi chúng mình gặp nhau lúc 19h tối 19/10! 🎁🔒",
  badge: "TOP SECRET • EXCLUSIVE FOR NHI & PHƯƠNG",
  clues: [
    { icon: "fa-gift", text: "Món quà hiện vật đã được đóng hộp, thắt nơ cẩn thận chỉ chờ ngày trao tay" },
    { icon: "fa-wand-magic-sparkles", text: "Manh mối bí mật: Nhỏ xinh, tinh tế, đảm bảo 2 nàng nhìn thấy là mê tít!" },
    { icon: "fa-hand-holding-heart", text: "Điều kiện mở khóa: Có mặt tại buổi hẹn lúc 19h tối ngày 19/10 để nhận quà trực tiếp từ ban tổ chức" }
  ],
  vouchers: {
    nhi: {
      code: "VIP-2010-NHI",
      owner: "Nhi Đáng Yêu 🌸",
      status: "Đã Niêm Phong Chờ Trao Tay Lúc 19h Tối 19/10",
      secretHint: "Một món quà nhỏ mang trọn sự ngọt ngào dành riêng cho nụ cười tỏa nắng của Nhi!"
    },
    phuong: {
      code: "VIP-2010-PHUONG",
      owner: "Phương Dịu Dàng 🌷",
      status: "Đã Niêm Phong Chờ Trao Tay Lúc 19h Tối 19/10",
      secretHint: "Một món quà dịu dàng, thanh lịch được chọn lựa kỹ lưỡng dành riêng cho Phương!"
    }
  }
};



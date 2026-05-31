import { TarotCard, TarotSpread } from "../types";

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    nameVi: "Chàng Khờ",
    keyword: "Khởi đầu mới, tự do, ngây thơ, mạo hiểm",
    iconName: "Compass",
    descriptionUpright: "Đại diện cho bước đi bước vào hành trình mới với niềm tin và sự ngây thơ đơn thuần. Hãy dũng cảm vươn mình ra khỏi vùng an toàn.",
    descriptionReversed: "Cảnh báo hành sự liều lĩnh, thiếu suy tính kỹ càng hoặc sự do dự, trì hoãn cơ hội hiếm hoi xuất hiện.",
    element: "Air",
    number: 0
  },
  {
    id: 1,
    name: "The Magician",
    nameVi: "Nhà Ảo Thuật",
    keyword: "Sức mạnh ý chí, sáng tạo, hành động mãnh liệt",
    iconName: "Sparkles",
    descriptionUpright: "Biểu trưng cho tài năng thấu suốt và sức mạnh nội tại giúp hiện thực hóa mong muốn. Bạn đang có đủ công cụ cần thiết.",
    descriptionReversed: "Ám chỉ khả năng bị lãng phí, ý đồ thao túng hoặc thiếu sự liên kết thực tế để hành động.",
    element: "Fire",
    number: 1
  },
  {
    id: 2,
    name: "The High Priestess",
    nameVi: "Nữ Tư Tế",
    keyword: "Trực giác, tiềm thức, tri thức bí mật",
    iconName: "Eye",
    descriptionUpright: "Lời khuyên hãy lắng nghe trực giác sâu thẳm trong bạn. Sự tĩnh lặng chứa đựng những sự thật to lớn vượt ngoài tri thức thông thường.",
    descriptionReversed: "Trực giác bị bóp méo, thờ ơ với thế giới nội tâm hoặc bị che mắt bởi những bí mật không rõ ràng.",
    element: "Water",
    number: 2
  },
  {
    id: 3,
    name: "The Empress",
    nameVi: "Nữ Hoàng",
    keyword: "Sự sinh sôi, dồi dào, sáng tạo, thiên nhiên",
    iconName: "Crown",
    descriptionUpright: "Biểu tượng cho tình mẫu tử, sự chăm sóc, nuôi dưỡng và sự thịnh vượng dồi dào về cả vật chất lẫn tâm hồn.",
    descriptionReversed: "Nhấn mạnh sự phụ thuộc, ngắt kết nối với thế giới tự nhiên hoặc sự trì trệ trong dòng chảy sáng tạo.",
    element: "Earth",
    number: 3
  },
  {
    id: 4,
    name: "The Emperor",
    nameVi: "Hoàng Đế",
    keyword: "Quyền lực, kỷ luật, bảo vệ, cấu trúc vững chắc",
    iconName: "Shield",
    descriptionUpright: "Đại diện cho trật tự, kỷ luật thép và sự kiểm soát vững chắc. Bạn cần thiết lập giới hạn rõ ràng và xây dựng cấu trúc vững chãi.",
    descriptionReversed: "Sự kiểm soát thái quá, tính bạo ngược, lạm dụng quyền lực hoặc sự thiếu kỷ luật dẫn tới hỗn độn.",
    element: "Fire",
    number: 4
  },
  {
    id: 5,
    name: "The Hierophant",
    nameVi: "Thầy Tư Tế",
    keyword: "Truyền thống, niềm tin tâm linh, học hỏi và giáo dục",
    iconName: "Scroll",
    descriptionUpright: "Biểu trưng cho các chân lý lâu đời, tinh thần học hỏi từ người đi trước và đi theo con đường chuẩn mực đạo đức.",
    descriptionReversed: "Thách thức các giáo điều phong kiến lỗi thời, chống đối trật tự cũ hoặc tự tạo ra triết lý sống riêng.",
    element: "Earth",
    number: 5
  },
  {
    id: 6,
    name: "The Lovers",
    nameVi: "Tình Nhân",
    keyword: "Tình yêu, sự hòa hợp, ngã rẽ lựa chọn",
    iconName: "Heart",
    descriptionUpright: "Đại diện cho các mối quan hệ sâu sắc, sự đồng điệu của tâm hồn và các lựa chọn mang tính thay đổi đức tin cá nhân.",
    descriptionReversed: "Sự bất hòa nội bộ, lệch nhịp trong tình yêu hoặc trốn tránh đưa ra quyết định quan trọng.",
    element: "Air",
    number: 6
  },
  {
    id: 7,
    name: "The Chariot",
    nameVi: "Chiến Xa",
    keyword: "Kiên định, chiến thắng nhờ ý chí, quyết tâm sắt đá",
    iconName: "Zap",
    descriptionUpright: "Sự tập trung tuyệt đối để vượt qua mọi trở ngại. Bạn đang điều phối hai thái cực xung đột để tiến nhanh về phía trước.",
    descriptionReversed: "Thiếu phương hướng, mất kiểm soát cảm xúc hoặc gặp sự cản trở dữ dội từ các yếu tố khách quan.",
    element: "Fire",
    number: 7
  },
  {
    id: 8,
    name: "Strength",
    nameVi: "Sức Mạnh",
    keyword: "Sự kiên nhẫn, lòng nhân từ, sức mạnh nội tâm",
    iconName: "ShieldAlert",
    descriptionUpright: "Hơn cả sức mạnh cơ bắp, đây là lòng can đảm bền bỉ và khả năng thuần phục thú tính vô thức bằng tình yêu thương dịu dàng.",
    descriptionReversed: "Sự hoài nghi bản thân, cảm giác bất lực hoặc bùng nổ giận dữ thiếu suy nghĩ.",
    element: "Fire",
    number: 8
  },
  {
    id: 9,
    name: "The Hermit",
    nameVi: "Ẩn Sĩ",
    keyword: "Chiêm nghiệm sâu sắc, cô độc lý tưởng, chân lý",
    iconName: "Moon",
    descriptionUpright: "Đã đến lúc rút lui vào không gian yên tĩnh để soi sáng tâm can mình. Tìm kiếm lời khuyên từ trí khôn sâu thẳm bên trong.",
    descriptionReversed: "Sự cô lập tiêu cực, từ chối lắng nghe lời khuyên lành mạnh hoặc sự ám ảnh trống rỗng xã hội.",
    element: "Earth",
    number: 9
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameVi: "Bánh Xe Số Phận",
    keyword: "Sự thay đổi ngoài tầm tay, số mệnh, nhân quả",
    iconName: "RefreshCw",
    descriptionUpright: "Chu kỳ cuộc sống luôn quay tròn. Lá bài mang điềm lành của sự thay đổi lớn và nhắc nhở mọi thứ trên đời đều là vô thường.",
    descriptionReversed: "Chống lại sự thay đổi tự nhiên, vận đen bám riết hoặc chu kỳ thói quen xấu lặp đi lặp lại.",
    element: "Spirit",
    number: 10
  },
  {
    id: 11,
    name: "Justice",
    nameVi: "Công Lý",
    keyword: "Sự thật, luật nhân quả, công bằng, trách nhiệm",
    iconName: "Scale",
    descriptionUpright: "Mọi quyết định của bạn sẽ mang lại kết quả xứng đáng. Hãy chịu trách nhiệm về lối sống và quyết định trung thực nhất.",
    descriptionReversed: "Bất công, sự thiếu trung thực hoặc trốn tránh đối mặt với hậu quả do bản thân gây ra.",
    element: "Air",
    number: 11
  },
  {
    id: 12,
    name: "The Hanged Man",
    nameVi: "Người Treo Cổ",
    keyword: "Sự tạm dừng, góc nhìn mới, hy sinh để đạt được",
    iconName: "Hourglass",
    descriptionUpright: "Buông bỏ cái tôi cũ kỹ và chấp nhận đảo ngược góc nhìn thế giới. Sự trì hoãn lúc này lại là cần thiết để nhìn nhận rõ hơn.",
    descriptionReversed: "Sự bế tắc mệt mỏi, bất đắc dĩ trì trệ hoặc hy sinh vô ích không mang lại giá trị nào.",
    element: "Water",
    number: 12
  },
  {
    id: 13,
    name: "Death",
    nameVi: "Cái Chết",
    keyword: "Kết thúc để khởi đầu mới, sự chuyển giao, tái sinh",
    iconName: "Skull",
    descriptionUpright: "Một giai đoạn cũ bắt buộc phải đóng lại để mở đường cho bình minh mới rực rỡ hơn. Đừng sợ hãi, hãy dũng cảm vứt bỏ cái cũ.",
    descriptionReversed: "Cố chấp bám víu vào quá khứ đã tàn, sợ hãi những đổi thay tất yếu để tiến hóa.",
    element: "Water",
    number: 13
  },
  {
    id: 14,
    name: "Temperance",
    nameVi: "Tiết Độ",
    keyword: "Điều độ, cân bằng cảm xúc, hòa hợp chữa lành",
    iconName: "Droplet",
    descriptionUpright: "Tìm thấy điểm giao hòa bình yên giữa các nguồn năng lượng đối nghịch. Sự từ tốn, bình tĩnh sẽ đem lại phép màu nhiệm chữa lành.",
    descriptionReversed: "Sự mâu thuẫn mất cân bằng, sống thái quá hoặc mệt mỏi vì cố gắng làm hài lòng mọi người.",
    element: "Water",
    number: 14
  },
  {
    id: 15,
    name: "The Devil",
    nameVi: "Ác Quỷ",
    keyword: "Sự cám dỗ, bám chấp vật chất, nỗi sợ kìm hãm",
    iconName: "Flame",
    descriptionUpright: "Nhắc nhở bạn về những sợi xích vô hình trói buộc tinh thần: sự nghiện ngập, thèm khát vật chất quá độ hay nỗi sợ tự huyễn hoặc.",
    descriptionReversed: "Dấu hiệu của sự thức tỉnh, mong muốn tháo cởi xích xiềng và tìm lại tự do tự tại.",
    element: "Earth",
    number: 15
  },
  {
    id: 16,
    name: "The Tower",
    nameVi: "Tòa Tháp",
    keyword: "Biến động dữ dội, thức tỉnh đột ngột, đổ vỡ giải thoát",
    iconName: "Layers", // Modified slightly later to match icons beautifully
    descriptionUpright: "Một sự sụp đổ bất ngờ đối với các cấu trúc lừa dối, giả tạo. Dù đau lòng, đây là cơ hội để bạn xây dựng lại trên nền móng kiên cố.",
    descriptionReversed: "Thoát hiểm trong gang tấc trước tai họa, hoãn lại thảm kịch hoặc nỗi sợ đối mặt với khủng hoảng thực tế.",
    element: "Fire",
    number: 16
  },
  {
    id: 17,
    name: "The Star",
    nameVi: "Ngôi Sao",
    keyword: "Hy vọng tái sinh, niềm tin, sự chữa lành rực rỡ",
    iconName: "Star",
    descriptionUpright: "Trời quang mây tạnh sau giông bão. Vũ trụ rót nguồn nước tinh khiết xoa dịu những tổn thương của bạn, soi sáng hi vọng tràn trề.",
    descriptionReversed: "Thiếu niềm tin, cảm thấy cô đơn lạc lối hoặc mất phương hướng trong hành trình ước mơ.",
    element: "Air",
    number: 17
  },
  {
    id: 18,
    name: "The Moon",
    nameVi: "Mặt Trăng",
    keyword: "Ảo ảnh, nỗi sợ tiềm thức, sự mù mờ không chắc chắn",
    iconName: "MoonStar",
    descriptionUpright: "Hãy cẩn trọng trước những gì trông có vẻ sáng tỏ nhưng thực chất là hư ảo. Quay vào bên trong giải quyết nỗi sợ thầm kín xưa cũ.",
    descriptionReversed: "Sự thật dần hé mở, chiến thắng nỗi lo âu vô cớ hoặc giải phóng nguồn năng lượng âm u.",
    element: "Water",
    number: 18
  },
  {
    id: 19,
    name: "The Sun",
    nameVi: "Mặt Trời",
    keyword: "Thành công, rạng rỡ, tràn ngập niềm vui và sức sống",
    iconName: "Sun",
    descriptionUpright: "Năng lượng rực hồng mang lại sự sáng tỏ tuyệt đối, sức khỏe dồi dào, niềm hạnh phúc trọn vẹn và sự thông suốt trong mọi dự án.",
    descriptionReversed: "Sự kiêu ngạo tự phụ, hào quang bị che khuất tạm thời hoặc thành công muộn màng.",
    element: "Fire",
    number: 19
  },
  {
    id: 20,
    name: "Judgement",
    nameVi: "Phán Xét",
    keyword: "Đánh thức linh hồn, gột rửa, lời kêu gọi bước tiếp",
    iconName: "Bell",
    descriptionUpright: "Thời điểm thức tỉnh vĩ đại đã đến. Hãy nhìn lại quá khứ dưới lăng kính bao dung, đưa ra quyết định tối hậu để tái sinh rực rỡ.",
    descriptionReversed: "Sự phán xét bản thân quá đà, nghi ngại quyết định của mình hoặc từ chối nghe theo tiếng gọi con tim.",
    element: "Spirit",
    number: 20
  },
  {
    id: 21,
    name: "The World",
    nameVi: "Thế Giới",
    keyword: "Sự hoàn mãn, kết thúc hành trình, thành tựu viên mãn",
    iconName: "Globe",
    descriptionUpright: "Vòng tròn số mệnh đã khép lại đầy viên mãn. Mọi nỗ lực bền bỉ của bạn đã hoàn thành xuất sắc, mở ra sự tự do hạnh phúc tối thượng.",
    descriptionReversed: "Sự chưa trọn vẹn, thiếu một mắt xích cuối cùng hoặc dòng chảy bị nghẽn lại trước vạch đích lý tưởng.",
    element: "Spirit",
    number: 21
  }
];

export const TAROT_SPREADS: TarotSpread[] = [
  {
    id: "daily",
    name: "Trải Bài Hằng Ngày (1 Lá)",
    description: "Nhận lời khuyên định hướng và thông điệp chung lành mạnh cho ngày hôm nay.",
    cardCount: 1,
    positions: [
      {
        title: "Thông điệp Bản Thể",
        description: "Khía cạnh chính hoặc lời khuyên chủ đạo đồng hành cùng ngày hôm nay."
      }
    ]
  },
  {
    id: "past_present_future",
    name: "Trải Bài Dòng Thời Gian (3 Lá)",
    description: "Khám phá diễn tiến của vấn đề qua ba lát cắt: Quá khứ, Hiện tại và Tương lai sắp hành tiến.",
    cardCount: 3,
    positions: [
      {
        title: "Quá Khứ (Past)",
        description: "Nền tảng, nguồn cơn gieo hạt hoặc tác động gốc đã diễn ra gây ảnh hưởng lên hiện trạng."
      },
      {
        title: "Hiện Tại (Present)",
        description: "Hiện trạng sự tình lúc này, những cơ hội, bài học hoặc thử thách hiện hữu bạn đang đối mặt."
      },
      {
        title: "Tương Lai (Future)",
        description: "Kết quả tự nhiên, lối hành tiến tiếp theo nếu duy trì dòng năng lượng hiện hành."
      }
    ]
  },
  {
    id: "love_spread",
    name: "Trải Bài Tình Cảm & Kết Nối (3 Lá)",
    description: "Phân tích mối quan hệ, thấu hiểu suy nghĩ đôi bên và hướng tháo gỡ cho các mâu thuẫn.",
    cardCount: 3,
    positions: [
      {
        title: "Năng Lượng CỦA BẠN",
        description: "Tâm tư, nguyện vọng và thái độ ẩn giấu của chính bạn đối với mối quan hệ này."
      },
      {
        title: "Năng Lượng ĐỐI PHƯƠNG",
        description: "Thái độ, góc nhìn hoặc điều đối phương đang bộc lộ/giấu kín về mối quan hệ."
      },
      {
        title: "Điểm Chung & Lời Khuyên",
        description: "Nút thắt cần tháo gỡ hoặc hướng liên kết tối ưu nhất để chữa lành và phát triển."
      }
    ]
  },
  {
    id: "decision",
    name: "Trải Bài Quyết Định (2 Lá)",
    description: "Một góc nhìn so sánh giúp định hình giữa thử thách và phương án tối ưu.",
    cardCount: 2,
    positions: [
      {
        title: "Thử Thách / Khó Khăn Thực Sự",
        description: "Bản chất ngầm của nút thắt lớn nhất đang khiến bạn phân vân, bối rối."
      },
      {
        title: "Giải Pháp / Lối Thoát Rực Sáng",
        description: "Lời khuyên tích cực nhất để hóa giải nút thắt đó một cách êm đẹp và thông suốt."
      }
    ]
  }
];

export function shuffleCards(cards: TarotCard[]): TarotCard[] {
  const result = [...cards];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

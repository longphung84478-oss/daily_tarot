import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API router goes FIRST
  app.post("/api/tarot-reading", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "Hiện tại hệ thống AI Tarot thiếu API Key. Hãy cấu hình GEMINI_API_KEY trong phần 'Settings > Secrets' của AI Studio để kích hoạt tính năng này."
        });
      }

      const { question, spreadId, cards } = req.body;

      if (!cards || !Array.isArray(cards) || cards.length === 0) {
        return res.status(400).json({ error: "Danh sách lá bài rút được không hợp lệ." });
      }

      // Initialize GoogleGenAI SDK server-side
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prepare prompt for Gemini
      const formattedCards = cards
        .map(
          (c, idx) =>
            `${idx + 1}. Lá [${c.card.nameVi} / ${c.card.name}] (${
              c.isReversed ? "Chiều Ngược - Reversed" : "Chiều Xuôi - Upright"
            }) rút được tại vị trí: "${c.positionTitle}" (ý nghĩa vị trí: ${
              c.positionDescription
            }). Từ khóa của lá này trong Tarot: "${c.card.keyword}".`
        )
        .join("\n");

      const promptMsg = `
Tôi muốn xin giải nghĩa một trải bài Tarot với các thông tin chi tiết dưới đây:
- Câu hỏi/Chủ đề thắc mác của tôi: "${question || "Nhận thông điệp chỉ dẫn chung cho cuộc sống."}"
- Kiểu trải bài: "${spreadId}"

Danh sách các lá bài đã bốc:
${formattedCards}

Hãy phân tích trực giác sâu sắc dòng kết nối năng lượng giữa các lá bài này để trả lời cho câu hỏi trên. Hãy viết bằng tiếng Việt, giọng văn phong thủy chiêm tinh bí ẩn, thấu cảm sâu sắc, dịu dàng khuyên bảo nhưng mang tính đúc kết thực tế cao. Trả về cấu trúc JSON đúng định dạng gồm lời mở đầu (introduction), giải nghĩa chi tiết từng lá bài (cardReadings), lời khuyên tổng quan (advice) và lời kết luận (conclusion) theo schema yêu cầu.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMsg,
        config: {
          systemInstruction: `Bạn là một Nhà Chiêm Tinh Học kiêm Reader Tarot huyền bí giàu kinh nghiệm cổ xưa. Bạn tiếp nhận các trải bài Tarot của người xem, cảm nhận trường năng lượng xung quanh và truyền đạt thông điệp chữa lành, soi sáng một cách thông tuệ và sâu sắc nhất. Hành văn của bạn luôn huyền hồ, đầy chất thơ, sử dụng các hình ảnh ẩn dụ linh thiêng (ngôi sao, số phận, bánh xe, suối nguồn, làn nước thiêng...), có lòng từ ái khôn ngoan, đồng thời có cấu trúc chỉ dẫn thực tế rõ ràng.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              introduction: {
                type: Type.STRING,
                description: "Lời mở đầu sâu lắng, huyền diệu, chào mừng người hỏi đến với phiên kết nối tâm linh và thiết lập sợi dây liên kết giữa câu hỏi thầm kín của họ với các lá bài."
              },
              cardReadings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    cardId: { type: Type.INTEGER, description: "ID số của lá bài tương ứng (id của lá bốc được từ request)" },
                    title: { type: Type.STRING, description: "Tiêu đề của lá bài, ví dụ: 'Lá Chàng Khờ (Xuôi) tại vị trí Quá Khứ'" },
                    interpretation: { type: Type.STRING, description: "Nội dung phân tích sâu sắc, kết hợp ý nghĩa truyền thống của lá bài, trạng thái xuôi/ngược, mục tiêu vị trí trong trải bài và tác động trực tiếp tới nghi vấn tình huống của người xem." }
                  },
                  required: ["cardId", "title", "interpretation"]
                }
              },
              advice: {
                type: Type.STRING,
                description: "Đúc rút lời khuyên thiết thực, định hướng hành động (Actionable advice) từ bức tranh năng lượng tổng hòa của trải bài."
              },
              conclusion: {
                type: Type.STRING,
                description: "Lời kết dịu êm, tiếp thêm sức mạnh tinh thần, khích lệ và cầu thực cho sự bình yên, may mắn của người hỏi."
              }
            },
            required: ["introduction", "cardReadings", "advice", "conclusion"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Không nhận được dữ liệu phản hồi từ trí tuệ nhân tạo.");
      }

      try {
        const parsedResult = JSON.parse(responseText.trim());
        return res.json(parsedResult);
      } catch (jsonErr) {
        console.error("Failed to parse JSON response from Gemini:", responseText);
        return res.json({
          introduction: "Các tinh cầu và năng lượng đang bị nhiễu động tạm thời, tuy nhiên vũ trụ vẫn kịp gửi gắm cho bạn những từ ngữ quý báu.",
          cardReadings: cards.map(c => ({
            cardId: c.card.id,
            title: `Lá ${c.card.nameVi} (${c.isReversed ? "Chiều Ngược" : "Chiều Xuôi"})`,
            interpretation: `Lá ${c.card.nameVi} ở tư thế ${c.isReversed ? "ngược" : "xuôi"}. ${c.isReversed ? c.card.descriptionReversed : c.card.descriptionUpright} Phục vụ cho câu hỏi của bạn, tinh thần lá bài nhắc nhở bạn tự do cân nhắc các yếu tố xung quanh để đưa ra lựa chọn sáng suốt.`
          })),
          advice: "Hãy tĩnh tâm lắng nghe trực giác của chính mình trong thời gian này.",
          conclusion: "Hành trình vạn dặm khởi đầu từ một bước đi nhỏ bé. Chúc bạn vạn sự bình an!"
        });
      }

    } catch (err: any) {
      console.error("Tarot Reading API Error:", err);
      res.status(500).json({ error: err?.message || "Đã xảy ra sự cố kết nối với thế giới tâm linh AI." });
    }
  });

  // Vite development vs production assets serving handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tarot fullstack server running on http://localhost:${PORT}`);
  });
}

startServer();

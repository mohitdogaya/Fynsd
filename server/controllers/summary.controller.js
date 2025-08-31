import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummary = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ msg: "No content provided" });
    }

    // Gemini Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following article into a short paragraph and also give 4-5 key points:\n\n${content}`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // 📝 Split: first paragraph summary, rest as key points
    const [main, ...points] = text.split("\n").filter(Boolean);

    res.json({
      summary: main,
      keyPoints: points,
    });
  } catch (err) {
    console.error("❌ Gemini Summary Error:", err);
    res.status(500).json({ msg: "AI failed", error: err.message });
  }
};

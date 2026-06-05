export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  // 🔥 テスト用：AI停止中
  const fallbackChars = ["あ", "い", "う", "え", "お"];
  const char = fallbackChars[Math.floor(Math.random() * fallbackChars.length)];

  return res.status(200).json({
    haiku: char
  });
}

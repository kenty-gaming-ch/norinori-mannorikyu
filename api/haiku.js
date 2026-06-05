export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { input = "", mode = "random" } = req.body;

  // カオス度（ちょっとランダム性を制御）
  let temperature = 0.9;

  if (mode === "senkou") temperature = 1.0; // AIが攻める
  if (mode === "koukou") temperature = 0.7;  // 少し落ち着く
  if (mode === "random") temperature = Math.random() * 0.6 + 0.5;

  const prompt = `
あなたは俳句を詠む詩人AIです。

# ルール
- 必ず5-7-5の俳句
- すべてひらがな（漢字禁止）
- 1行で出力（改行なしでもOK）
- 解説禁止
- 余計な言葉禁止

# モード
現在モード: ${mode}

# プレイヤーの俳句
${input}

# 返答ルール
この俳句に対して“感情や意味で応答する俳句”を1つだけ返すこと
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "あなたは即興で俳句を詠む詩人です。必ずひらがな5-7-5で返してください。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature
      })
    });

    const data = await response.json();

    let haiku = data.choices?.[0]?.message?.content?.trim() || "";

    // 念のため改行除去
    haiku = haiku.replace(/\n/g, "");

    res.status(200).json({ haiku });

  } catch (err) {
    res.status(500).json({
      error: "AI error",
      detail: err.message
    });
  }
}

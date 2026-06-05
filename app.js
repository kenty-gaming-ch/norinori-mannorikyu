const history = [];

const input = document.querySelector(".input-area input");
const button = document.querySelector(".input-area button");
const log = document.querySelector(".log");

function render() {
  log.innerHTML = "";

  history.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "entry " + item.speaker;

    entry.innerHTML = `
      <div class="label">${item.speaker === "player" ? "あなた" : "AI"}</div>
      <div class="haiku">
        ${item.text.split(" ").join("<br>")}
      </div>
    `;

    log.appendChild(entry);
  });
}

// 🔥 AI呼び出し
async function getAIHaiku(text) {
  const res = await fetch("/api/haiku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input: text })
  });

  const data = await res.json();
  return data.haiku;
}

// プレイヤー入力
async function addPlayerHaiku() {
  const text = input.value.trim();
  if (!text) return;

  history.push({ speaker: "player", text });
  render();

  input.value = "";

  // AI呼び出し
  const ai = await getAIHaiku(text);

  history.push({ speaker: "ai", text: ai });
  render();
}

button.addEventListener("click", addPlayerHaiku);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addPlayerHaiku();
  }
});

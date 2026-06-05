const input = document.querySelector(".input-area input");
const button = document.querySelector(".input-area button");
const log = document.querySelector(".log");

const modeButtons = document.querySelectorAll(".mode button");

let history = [];
let mode = "random"; // senkou / koukou / random

// モード選択
modeButtons[0].addEventListener("click", () => mode = "senkou");
modeButtons[1].addEventListener("click", () => mode = "koukou");
modeButtons[2].addEventListener("click", () => mode = "random");

// 描画
function render() {
  log.innerHTML = "";

  history.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "entry " + item.speaker;

    entry.innerHTML = `
      <div class="label">${item.speaker === "player" ? "あなた" : "AI"}</div>
      <div class="haiku">
        ${item.text}
      </div>
    `;

    log.appendChild(entry);
  });
}

// AI呼び出し
async function getAIHaiku(playerHaiku) {
  const res = await fetch("/api/haiku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: playerHaiku,
      mode: mode
    })
  });

  const data = await res.json();
  return data.haiku;
}

// 俳句追加
async function addHaiku() {
  const text = input.value.trim();
  if (!text) return;

  // プレイヤー追加
  history.push({
    speaker: "player",
    text
  });

  render();
  input.value = "";

  // AI生成
  const ai = await getAIHaiku(text);

  history.push({
    speaker: "ai",
    text: ai
  });

  render();
}

// イベント
button.addEventListener("click", addHaiku);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addHaiku();
  }
});

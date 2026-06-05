
// 履歴データ
const history = [];

// 要素取得
const input = document.querySelector(".input-area input");
const button = document.querySelector(".input-area button");
const log = document.querySelector(".log");

// 俳句を画面に描画
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

// プレイヤー入力処理
function addPlayerHaiku() {
  const text = input.value.trim();
  if (!text) return;

  history.push({
    speaker: "player",
    text: text
  });

  input.value = "";

  render();
}

// イベント
button.addEventListener("click", addPlayerHaiku);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addPlayerHaiku();
  }
});

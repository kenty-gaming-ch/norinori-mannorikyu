let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai"
};

let canvas, ctx;

/* =========================
   初期化
========================= */
function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  drawBackground();

  game.turn = (mode === "senkou") ? "player" : "ai";

  if (game.turn === "ai") setTimeout(aiMove, 400);
}

/* =========================
   Canvasサイズ調整
========================= */
function resizeCanvas() {
  const canvas = document.getElementById("canvas");

  canvas.width = 420;
  canvas.height = 520;
}

/* =========================
   背景（和紙っぽい）
========================= */
function drawBackground() {
  ctx.fillStyle = "#f6f0e6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* =========================
   書道描画（核心）
========================= */
function drawChar(char, index) {
  const xBase = canvas.width - 60; // 右から
  const col = Math.floor(index / 17);
  const row = index % 17;

  const x = xBase - col * 120 + random(-2, 2);
  const y = 40 + row * 28 + random(-1, 1);

  ctx.save();

  ctx.font = "28px Yu Mincho";
  ctx.fillStyle = "rgba(20,20,20,0.85)";
  ctx.shadowColor = "rgba(0,0,0,0.15)";
  ctx.shadowBlur = 3;

  // にじみ表現（軽いブラー重ね）
  ctx.globalAlpha = 0.9;

  ctx.fillText(char, x, y);

  ctx.restore();
}

/* =========================
   UI再描画
========================= */
function renderAll() {
  drawBackground();

  [...game.phrase].forEach((c, i) => {
    drawChar(c, i);
  });
}

/* =========================
   入力
========================= */
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChar();
});

function submitChar() {
  if (game.step >= 17 || game.turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();
  if (!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  renderAll();
  nextTurn();
}

/* =========================
   AI
========================= */
function aiMove() {
  if (game.step >= 17 || game.turn !== "ai") return;

  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  renderAll();
  nextTurn();
}

/* =========================
   ターン
========================= */
function nextTurn() {
  if (game.step >= 17) {
    finishGame();
    return;
  }

  game.turn = (game.turn === "ai") ? "player" : "ai";

  if (game.turn === "ai") {
    setTimeout(aiMove, 400 + Math.random() * 400);
  }
}

/* =========================
   完成
========================= */
function finishGame() {
  document.getElementById("overlay").classList.add("show");

  const result =
    game.phrase.slice(0,5) + "\n" +
    game.phrase.slice(5,12) + "\n" +
    game.phrase.slice(12,17);

  document.getElementById("result").textContent = result;
}

/* =========================
   X投稿
========================= */
function copyX() {
  const text =
`#ノリノリ万利休
${game.phrase.slice(0,5)}
${game.phrase.slice(5,12)}
${game.phrase.slice(12,17)}`;

  window.open("https://x.com/intent/tweet?text=" + encodeURIComponent(text));
}

/* =========================
   ユーティリティ
========================= */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function resetGame() {
  location.reload();
}

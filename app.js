let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai"
};

let canvas, ctx;

/* =========================
   開始
========================= */
function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "flex";

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = 420;
  canvas.height = 520;

  drawBase();
  render();

  game.turn = (mode === "senkou") ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, 400);
  }
}

/* =========================
   背景
========================= */
function drawBase() {
  ctx.fillStyle = "#fffaf2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* =========================
   描画（575分割）
========================= */
function render() {
  drawBase();

  const c = game.phrase.split("");

  drawColumn(c.slice(0, 5), 300);
  drawColumn(c.slice(5, 12), 220);
  drawColumn(c.slice(12, 17), 140);
}

/* 縦書き列 */
function drawColumn(chars, x) {
  chars.forEach((ch, i) => {
    ctx.font = "28px Yu Mincho";
    ctx.fillStyle = "rgba(20,20,20,0.85)";

    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;

    ctx.fillText(ch, x + dx, 60 + i * 42 + dy);
  });
}

/* =========================
   入力
========================= */
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChar();
});

function submitChar() {
  if (game.step >= 17) return;
  if (game.turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();
  if (!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  render();
  nextTurn();
}

/* =========================
   AI
========================= */
function aiMove() {
  if (game.step >= 17) return;
  if (game.turn !== "ai") return;

  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

  const ch = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += ch;
  game.step++;

  render();
  nextTurn();
}

/* =========================
   ターン制御
========================= */
function nextTurn() {
  if (game.step >= 17) {
    finishGame();
    return;
  }

  game.turn = (game.turn === "ai") ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, 300 + Math.random() * 300);
  }
}

/* =========================
   表示
========================= */
function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai" ? "AIの番" : "あなたの番";
}

/* =========================
   完成
========================= */
function finishGame() {
  document.getElementById("overlay").classList.add("show");

  document.getElementById("result").textContent =
    game.phrase.slice(0, 5) + "\n" +
    game.phrase.slice(5, 12) + "\n" +
    game.phrase.slice(12, 17);
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

  window.open(
    "https://x.com/intent/tweet?text=" + encodeURIComponent(text),
    "_blank"
  );
}

/* =========================
   リセット
========================= */
function resetGame() {
  location.reload();
}

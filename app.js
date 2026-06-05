let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai",
  started: false
};

/* =========================
   SE（簡易生成音）
========================= */
function playSE(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "pon") {
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.type = "sine";

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  if (type === "suu") {
    osc.frequency.value = 220;
    gain.gain.value = 0.08;
    osc.type = "sine";

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }
}

/* =========================
   開始
========================= */
function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;
  game.started = true;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  updateUI();

  game.turn = (mode === "senkou") ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, randomDelay());
  }
}

/* =========================
   ターン表示
========================= */
function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai" ? "AIの番" : "あなたの番";
}

/* =========================
   UI更新（筆フェード）
========================= */
function updateUI() {
  const c = game.phrase.split("");

  renderLine("line1", c.slice(0, 5));
  renderLine("line2", c.slice(5, 12));
  renderLine("line3", c.slice(12, 17));
}

/* ★1文字フェード描画 */
function renderLine(id, chars) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  chars.forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch;

    span.style.opacity = "0";
    span.style.display = "inline-block";
    span.style.transform = "translateY(6px)";

    el.appendChild(span);

    setTimeout(() => {
      span.style.transition = "all 0.25s ease";
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, i * 30);
  });
}

/* =========================
   Enter入力
========================= */
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChar();
});

/* =========================
   プレイヤー入力
========================= */
function submitChar() {
  if (game.step >= 17) return;
  if (game.turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();
  if (!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  playSE("pon");
  afterMove();
}

/* =========================
   AI（ランダム＋間）
========================= */
function aiMove() {
  if (game.step >= 17) return;
  if (game.turn !== "ai") return;

  const chars =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  playSE("suu");

  afterMove();
}

/* =========================
   共通処理
========================= */
function afterMove() {
  updateUI();

  if (game.step >= 17) {
    finishGame();
    return;
  }

  game.turn = (game.turn === "ai") ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, randomDelay());
  }
}

/* =========================
   AIの“間”（0.3〜0.8秒）
========================= */
function randomDelay() {
  return 300 + Math.random() * 500;
}

/* =========================
   完成（紙が開く演出）
========================= */
function finishGame() {
  game.turn = "end";

  const overlay = document.getElementById("overlay");
  const result =
    game.phrase.slice(0, 5) + "\n" +
    game.phrase.slice(5, 12) + "\n" +
    game.phrase.slice(12, 17);

  document.getElementById("result").textContent = result;

  overlay.style.display = "flex";
  overlay.style.opacity = "0";
  overlay.style.transform = "scale(0.95)";

  requestAnimationFrame(() => {
    overlay.style.transition = "all 0.4s ease";
    overlay.style.opacity = "1";
    overlay.style.transform = "scale(1)";
  });

  playSE("suu");
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

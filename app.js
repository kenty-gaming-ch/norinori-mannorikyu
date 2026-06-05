let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai",
  started: false
};

/* -----------------------
   開始
------------------------*/
function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;
  game.started = true;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  updateUI();

  // 先攻後攻の初期化（stepは絶対いじらない）
  game.turn = (mode === "senkou") ? "player" : "ai";
  setTurn();

  // 後攻ならAIスタート
  if (game.turn === "ai") {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   ターン判定（完全固定）
------------------------*/
function getTurn() {
  return game.turn;
}

/* -----------------------
   UI更新（縦書き）
------------------------*/
function updateUI() {
  const c = game.phrase.split("");

  document.getElementById("line1").textContent = c.slice(0, 5).join("\n");
  document.getElementById("line2").textContent = c.slice(5, 12).join("\n");
  document.getElementById("line3").textContent = c.slice(12, 17).join("\n");
}

/* -----------------------
   ターン表示
------------------------*/
function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai" ? "AIの番" : "あなたの番";
}

/* -----------------------
   Enter送信
------------------------*/
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChar();
});

/* -----------------------
   プレイヤー入力
------------------------*/
function submitChar() {
  if (game.step >= 17) return;
  if (game.turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();

  if (!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  afterMove();
}

/* -----------------------
   AI（暫定ランダム）
------------------------*/
function aiMove() {
  if (game.step >= 17) return;
  if (game.turn !== "ai") return;

  const chars =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  afterMove();
}

/* -----------------------
   共通処理（核心）
------------------------*/
function afterMove() {
  updateUI();

  if (game.step >= 17) {
    finishGame();
    return;
  }

  // ターン交代
  game.turn = (game.turn === "ai") ? "player" : "ai";
  setTurn();

  // AIなら自動実行
  if (game.turn === "ai") {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   完成処理
------------------------*/
function finishGame() {
  game.turn = "end";

  const result =
    game.phrase.slice(0, 5) + "\n" +
    game.phrase.slice(5, 12) + "\n" +
    game.phrase.slice(12, 17);

  document.getElementById("result").textContent = result;
  document.getElementById("overlay").classList.add("show");

  document.getElementById("turn").textContent = "";
}

/* -----------------------
   X投稿
------------------------*/
function copyX() {
  const text =
`#ノリノリ万利休
${game.phrase.slice(0,5)}
${game.phrase.slice(5,12)}
${game.phrase.slice(12,17)}`;

  const url = "https://x.com/intent/tweet?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

/* -----------------------
   リセット
------------------------*/
function resetGame() {
  location.reload();
}

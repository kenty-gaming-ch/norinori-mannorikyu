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

  document.getElementById("input").focus();

  setTurn();

  if (mode === "koukou") {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   UI（縦書き）
------------------------*/
function updateUI() {
  const chars = game.phrase.split("");

  document.getElementById("line1").textContent = chars.slice(0, 5).join("\n");
  document.getElementById("line2").textContent = chars.slice(5, 12).join("\n");
  document.getElementById("line3").textContent = chars.slice(12, 17).join("\n");
}

/* -----------------------
   ターン表示
------------------------*/
function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai" ? "AIの番" : "あなたの番";
}

/* -----------------------
   Enterで送信
------------------------*/
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitChar();
  }
});

/* -----------------------
   入力
------------------------*/
function submitChar() {
  const input = document.getElementById("input");
  const char = input.value.trim();

  if (!char) return;
  if (game.turn !== "player") return;

  game.phrase += char;
  game.step++;
  input.value = "";

  nextTurn();
}

/* -----------------------
   ターン進行
------------------------*/
function nextTurn() {
  updateUI();

  if (game.step >= 17) {
    finishGame();
    return;
  }

  game.turn = game.turn === "ai" ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   AI（暫定ランダム）
------------------------*/
async function aiMove() {
  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  nextTurn();
}

/* -----------------------
   完成
------------------------*/
function finishGame() {
  game.turn = "end";

  const result =
    game.phrase.slice(0, 5) + "\n" +
    game.phrase.slice(5, 12) + "\n" +
    game.phrase.slice(12, 17);

  document.getElementById("result").textContent = result;
  document.getElementById("overlay").classList.remove("hidden");

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

let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai",
  started: false
};

/* -----------------------
   ゲーム開始
------------------------*/
function startGame(mode) {
  game.mode = mode;
  game.started = true;
  game.phrase = "";
  game.step = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  updateUI();

  // 先攻後攻制御
  if (mode === "senkou") {
    game.turn = "player";
  } else {
    game.turn = "ai";
    setTimeout(aiMove, 300); // AI初手
  }

  setTurn();
}

/* -----------------------
   UI更新
------------------------*/
function updateUI() {
  document.getElementById("line1").textContent = game.phrase.slice(0, 5);
  document.getElementById("line2").textContent = game.phrase.slice(5, 12);
  document.getElementById("line3").textContent = game.phrase.slice(12, 17);
}

/* -----------------------
   ターン表示
------------------------*/
function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai"
      ? "AIの番"
      : game.turn === "player"
      ? "あなたの番"
      : "";
}

/* -----------------------
   プレイヤー入力
------------------------*/
function submitChar() {
  const input = document.getElementById("input");
  const char = input.value.trim();

  if (!char) return;
  if (game.turn !== "player") return;

  game.phrase += char;
  game.step++;
  input.value = "";

  updateUI();
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
   AI（暫定ランダム1文字）
------------------------*/
async function aiMove() {
  if (game.step >= 17) return;

  // 🔥 暫定：ランダムひらがな
  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  updateUI();
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
  document.getElementById("overlay").classList.add("show");

  setTurn();
}

/* -----------------------
   X投稿
------------------------*/
function copyX() {
  const text =
`#ひらがなはいく
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
  game = {
    mode: null,
    phrase: "",
    step: 0,
    turn: "ai",
    started: false
  };

  document.getElementById("overlay").classList.remove("show");
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");

  updateUI();
}

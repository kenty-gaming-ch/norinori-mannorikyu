let game = {
  mode: null,
  phrase: "",
  step: 0
};

/* -----------------------
   開始
------------------------*/
function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  updateUI();

  if (mode === "senkou") {
    // ★先攻＝プレイヤーなので step をずらす
    game.step = 1;

    setTurn();
  } else {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   ターン計算（超重要修正）
------------------------*/
function getTurn() {
  return game.step % 2 === 0 ? "ai" : "player";
}

/* -----------------------
   UI更新
------------------------*/
function updateUI() {
  const c = game.phrase.split("");

  document.getElementById("line1").textContent = c.slice(0,5).join("\n");
  document.getElementById("line2").textContent = c.slice(5,12).join("\n");
  document.getElementById("line3").textContent = c.slice(12,17).join("\n");
}

/* -----------------------
   ターン表示
------------------------*/
function setTurn() {
  const t = getTurn();

  document.getElementById("turn").textContent =
    t === "ai" ? "AIの番" : "あなたの番";
}

/* -----------------------
   入力（Enter）
------------------------*/
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChar();
});

/* -----------------------
   プレイヤー入力
------------------------*/
function submitChar() {
  if (game.step >= 17) return;

  const turn = getTurn();
  if (turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();

  if (!char) return;

  game.phrase += char;
  game.step++;
  input.value = "";

  afterMove();
}

/* -----------------------
   AI
------------------------*/
function aiMove() {
  if (game.step >= 17) return;

  const turn = getTurn();
  if (turn !== "ai") return;

  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const char = chars[Math.floor(Math.random() * chars.length)];

  game.phrase += char;
  game.step++;

  afterMove();
}

/* -----------------------
   共通処理（超重要）
------------------------*/
function afterMove() {
  updateUI();

  if (game.step >= 17) {
    finishGame();
    return;
  }

  setTurn();

  if (getTurn() === "ai") {
    setTimeout(aiMove, 300);
  }
}

/* -----------------------
   完成
------------------------*/
function finishGame() {
  const result =
    game.phrase.slice(0,5) + "\n" +
    game.phrase.slice(5,12) + "\n" +
    game.phrase.slice(12,17);

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

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

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  setTurn();
  if (game.turn === "ai") aiMove();
}

/* -----------------------
   表示更新
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

  if (game.turn === "ai") aiMove();
}

/* -----------------------
   AI（1文字生成）
------------------------*/
async function aiMove() {
  if (game.step >= 17) return;

  const res = await fetch("/api/haiku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: game.phrase,
      mode: game.mode
    })
  });

  const data = await res.json();
  const char = data.haiku || "";

  if (!char) return;

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
  document.getElementById("overlay").classList.remove("hidden");

  setTurn();
}

/* -----------------------
   X投稿用コピー
------------------------*/
function copyX() {
  const text =
`#ひらがなはいく
${game.phrase.slice(0,5)}
${game.phrase.slice(5,12)}
${game.phrase.slice(12,17)}`;

  navigator.clipboard.writeText(text);
  alert("X投稿用テキストをコピーしました");
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

  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");

  updateUI();
}

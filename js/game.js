let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai"
};

function startGame(mode) {
  game.mode = mode;
  game.phrase = "";
  game.step = 0;

  showGame();

  setupCanvas();

  game.turn =
    mode === "senkou"
      ? "player"
      : "ai";

  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, 400);
  }
}

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

function nextTurn() {
  if (game.step >= 17) {
    finishGame();
    return;
  }

  game.turn =
    game.turn === "ai"
      ? "player"
      : "ai";

  setTurn();

  if (game.turn === "ai") {
    setTimeout(aiMove, 400);
  }
}

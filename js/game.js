let game = {
  mode: "",
  phrase: "",
  step: 0,
  turn: "player"
};

function startGame(mode){

  game.mode = mode;
  game.phrase = "";
  game.step = 0;

  showGame();

  render();

  game.turn =
    mode === "senkou"
    ? "player"
    : "ai";

  setTurn();

  if(game.turn === "ai"){

    setTimeout(aiMove,500);
  }

  document
    .getElementById("input")
    .focus();
}

function submitChar(){

  if(game.turn !== "player") return;

  const input =
    document.getElementById("input");

  const char = input.value.trim();
  if(!char) return;

  game.phrase += char;
  game.step++; // ★必ずここ

  input.value = "";

  render();

  nextTurn(); // ★1回だけ呼ぶ
}

function nextTurn(){

  if(game.step >= 17){
    finishGame();
    return;
  }

  game.turn =
    game.turn === "player"
      ? "ai"
      : "player";

  setTurn();

  if(game.turn === "ai"){
    setTimeout(aiMove,500);
  }
}

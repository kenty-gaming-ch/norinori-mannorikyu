let game = {
  mode: "",
  phrase: "",
  step: 0,
  turn: "player",
  finished: false
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

  if(game.finished) return; // ★追加

  if(game.turn !== "player") return;

  const input = document.getElementById("input");
  const char = input.value.trim();
  if(!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  render();

  checkFinish();

  if(game.step < 17){
    nextTurn();
  }
}

function nextTurn(){

  if(game.finished) return; // ★追加

  game.turn =
    game.turn === "player"
      ? "ai"
      : "player";

  setTurn();

  if(game.turn === "ai"){
    setTimeout(aiMove, 500);
  }
}

function checkFinish(){

  if(game.step >= 17){
    game.finished = true;
    finishGame();
  }
}

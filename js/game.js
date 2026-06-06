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

  const input = document.getElementById("input");
  const char = input.value.trim();

  if(!char) return;

  game.phrase += char;
  game.step++;

  input.value = "";

  render();

  // ★ここが最重要
  if(game.step >= 17){
    finishGame();
    return;
  }

  nextTurn();
}

function nextTurn(){
  console.log("NEXT TURN BEFORE", game.turn, game.step);
  if(game.step >= 17){
    finishGame();
    return;
  }

  // ★ここで必ず交代
  game.turn =
    game.turn === "player"
      ? "ai"
      : "player";
  console.log("NEXT TURN AFTER SWITCH", game.turn, game.step);
  setTurn();

  if(game.turn === "ai"){
    setTimeout(aiMove, 500);
  }
}

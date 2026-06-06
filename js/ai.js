const AI_CHARS =
"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove(){

  if(game.turn !== "ai") return;

  const ch =
    AI_CHARS[Math.floor(Math.random()*AI_CHARS.length)];

  game.phrase += ch;
  game.step++;

  render();

  if(game.step >= 17){
    finishGame();
    return;
  }

  nextTurn();
}

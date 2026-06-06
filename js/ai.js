const AI_CHARS =
"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove(){

  if(game.finished) return; // ★追加

  if(game.turn !== "ai") return;

  const ch =
    AI_CHARS[Math.floor(Math.random()*AI_CHARS.length)];

  game.phrase += ch;
  game.step++;

  render();

  checkFinish();

  if(game.step < 17){
    nextTurn();
  }
}

const AI_CHARS =
"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove(){
  console.log("AI TURN START", game.turn, game.step);
  if(game.turn !== "ai") return;

  if(game.step >= 17) return;

  const ch =
    AI_CHARS[Math.floor(Math.random()*AI_CHARS.length)];

  game.phrase += ch;
  game.step++; // ★必ずここ
  console.log("AI AFTER MOVE", game.turn, game.step, game.phrase);
  render();

  nextTurn(); // ★1回だけ呼ぶ
}

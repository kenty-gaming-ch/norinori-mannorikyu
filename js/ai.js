const AI_CHARS =
"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove(){

  if(game.turn !== "ai") return;

  if(game.step >= 17) return;

  const ch =
    AI_CHARS[Math.floor(Math.random()*AI_CHARS.length)];

  game.phrase += ch;
  game.step++; // ★必ずここ

  render();

  nextTurn(); // ★1回だけ呼ぶ
}

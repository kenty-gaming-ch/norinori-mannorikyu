const AI_CHARS =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove() {
  if (game.step >= 17) return;
  if (game.turn !== "ai") return;

  const ch =
    AI_CHARS[Math.floor(Math.random() * AI_CHARS.length)];

  game.phrase += ch;
  game.step++;

  render();
  nextTurn();
}

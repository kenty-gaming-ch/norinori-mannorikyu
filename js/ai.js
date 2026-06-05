const AI_CHARS =
"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function aiMove() {

  const ch =
    AI_CHARS[
      Math.floor(Math.random() * AI_CHARS.length)
    ];

  game.phrase += ch;
  game.step++;

  render();

  nextTurn();
}

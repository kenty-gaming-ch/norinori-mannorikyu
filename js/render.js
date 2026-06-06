function render() {

  const chars = game.phrase.split("");

  drawKu(
    "kami",
    chars.slice(0, 5),
    5
  );

  drawKu(
    "naka",
    chars.slice(5, 12),
    7
  );

  drawKu(
    "shimo",
    chars.slice(12, 17),
    5
  );
}

function drawKu(id, chars, max) {

  const el = document.getElementById(id);

  let text = "";

  for (let i = 0; i < max; i++) {

    if (chars[i]) {
      text += chars[i];
    } else {
      text += "□";
    }
  }

  el.textContent = text;
}

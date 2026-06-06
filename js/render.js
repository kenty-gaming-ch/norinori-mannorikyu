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

  let html = "";

  for (let i = 0; i < max; i++) {

    const ch = chars[i] || "□";

    html += `
      <span class="char" style="animation-delay:${i * 0.08}s">
        ${ch}
      </span>
    `;
  }

  el.innerHTML = html;
}

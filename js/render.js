function render(){

  const chars = game.phrase.split("");

  const fill = (from, to) =>
    chars.slice(from, to).join("") || "□□□□□□□";

  document.getElementById("kami").textContent =
    fill(0, 5);

  document.getElementById("naka").textContent =
    fill(5, 12);

  document.getElementById("shimo").textContent =
    fill(12, 17);
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

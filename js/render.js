function render(){

  const arr = game.phrase.split("");

  const kami = [];
  const naka = [];
  const shimo = [];

  // 上の句（5）
  for(let i=0;i<5;i++){
    kami.push(arr[i] || "□");
  }

  // 中の句（7）
  for(let i=5;i<12;i++){
    naka.push(arr[i] || "□");
  }

  // 下の句（5）
  for(let i=12;i<17;i++){
    shimo.push(arr[i] || "□");
  }

  document.getElementById("kami").textContent = kami.join("");
  document.getElementById("naka").textContent = naka.join("");
  document.getElementById("shimo").textContent = shimo.join("");
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

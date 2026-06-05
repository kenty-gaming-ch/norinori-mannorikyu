let canvas;
let ctx;

function setupCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = 420;
  canvas.height = 520;

  render();
}

function drawBase() {
  ctx.fillStyle = "#fffaf2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawColumn(chars, x) {
  chars.forEach((ch, i) => {
    ctx.font = "28px Yu Mincho";
    ctx.fillStyle = "rgba(20,20,20,0.85)";

    ctx.fillText(
      ch,
      x + (Math.random() - 0.5) * 2,
      60 + i * 42 + (Math.random() - 0.5) * 2
    );
  });
}

function render() {
  drawBase();

  const chars = game.phrase.split("");

  drawColumn(chars.slice(0, 5), 300);
  drawColumn(chars.slice(5, 12), 220);
  drawColumn(chars.slice(12, 17), 140);
}

function showGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "flex";
}

function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai"
      ? "AIの番"
      : "あなたの番";
}

function finishGame() {
  document.getElementById("overlay")
    .classList.add("show");

  document.getElementById("result").textContent =
    game.phrase.slice(0, 5) + "\n" +
    game.phrase.slice(5, 12) + "\n" +
    game.phrase.slice(12, 17);
}

function copyX() {
  const text =
`#ノリノリ万利休
${game.phrase.slice(0,5)}
${game.phrase.slice(5,12)}
${game.phrase.slice(12,17)}`;

  window.open(
    "https://x.com/intent/tweet?text=" +
      encodeURIComponent(text),
    "_blank"
  );
}

function resetGame() {
  location.reload();
}

document
  .getElementById("input")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitChar();
    }
  });

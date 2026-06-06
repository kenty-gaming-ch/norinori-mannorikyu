function showGame(){

  document
    .getElementById("menu")
    .classList.add("hidden");

  document
    .getElementById("game")
    .classList.remove("hidden");
}

function setTurn(){

  document
    .getElementById("turn")
    .textContent =
      game.turn === "player"
      ? "あなたの番"
      : "AIの番";
}

function finishGame() {

  const overlay =
    document.getElementById("overlay");

  const result =
    document.getElementById("result");

  result.textContent =
    game.phrase.slice(0,5) + "\n" +
    game.phrase.slice(5,12) + "\n" +
    game.phrase.slice(12,17);

  // 少し“間”を入れる（重要）
  setTimeout(() => {
    overlay.classList.add("show");
  }, 300);
}

function copyX(){

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

function resetGame(){
  location.reload();
}

document
  .getElementById("input")
  .addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

      submitChar();

      document
        .getElementById("input")
        .focus();
    }
});

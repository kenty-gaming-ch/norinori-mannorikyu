let game = {
  mode: null,
  phrase: "",
  step: 0,
  turn: "ai",
  started: false
};

function startGame(mode) {
  game.mode = mode;
  game.started = true;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  setTurn();
  if (game.turn === "ai") aiMove();
}

function setTurn() {
  document.getElementById("turn").textContent =
    game.turn === "ai" ? "AIの番" : "あなたの番";
}

function updateUI() {
  const l1 = game.phrase.slice(0, 5);
  const l2 = game.phrase.slice(5, 12);
  const l3 = game.phrase.slice(12, 17);

  document.getElementById("line1").textContent = l1;
  document.getElementById("line2").textContent = l2;
  document.getElementById("line3").textContent = l3;
}

function submitChar() {
  const input = document.getElementById("input");
  const char = input.value.trim();

  if (!char) return;
  if (game.turn !== "player") return;

  game.phrase += char;
  game.step++;
  input.value = "";

  updateUI();
  nextTurn();
}

function nextTurn() {
  if (game.step >= 17) {
    game.turn = "end";
    setTurn();
    return;
  }

  game.turn = game.turn === "ai" ? "player" : "ai";
  setTurn();

  if (game.turn === "ai") aiMove();
}

async function aiMove() {
  if (game.step >= 17) return;

  const res = await fetch("/api/haiku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: game.phrase,
      mode: game.mode
    })
  });

  const data = await res.json();
  const char = data.haiku || "";

  if (!char) return;

  game.phrase += char;
  game.step++;

  updateUI();
  nextTurn();
}

document.addEventListener("DOMContentLoaded", function(event) {
    shuffleElements();
});

function shuffleElements() {
	const grid = document.querySelector(".ttgrid");
	const items = Array.from(grid.children);

	// Shuffle the items array
	items.sort(() => Math.random() - 0.5);

	// Clear the grid and re-append items in random order
	grid.innerHTML = "";
	items.forEach(item => grid.appendChild(item));
}

// Toggle a single clicked button
function toggleActiveButton(btn) {
  const text = btn.textContent.trim();

  // Ascension / Descension mutual exclusion
  if (text === "Ascension") deactivateButtonByText("Descension");
  if (text === "Descension") deactivateButtonByText("Ascension");

  // Toggle this button
  btn.classList.toggle("rule-button-active");

  // If Same Wall is activated, also activate Same
  if (text === "Same Wall" && btn.classList.contains("rule-button-active")) {
    const sameBtn = findButtonByText("Same");
    if (sameBtn) sameBtn.classList.add("rule-button-active");
  }
}

// Helper: find button by label text
function findButtonByText(label) {
  return [...document.querySelectorAll(".rule-button")]
    .find(b => b.textContent.trim() === label);
}

// Helper: remove active class from specific button
function deactivateButtonByText(label) {
  const btn = findButtonByText(label);
  if (btn) btn.classList.remove("rule-button-active");
}



// --------------------------------------------------------
// ROULETTE FUNCTION (clear all, pick 1–3, apply rules)
// --------------------------------------------------------
function addClassToRandomButtons() {
  const container = document.getElementById("button-container");

  // All rule buttons except the Roulette button
  const buttons = [...container.querySelectorAll(".rule-button")]
    .filter(btn => btn.textContent.trim() !== "Roulette");

  // CLEAR everything
  buttons.forEach(btn => btn.classList.remove("rule-button-active"));

  // Random number of rules to enable (1 to 3)
  const max = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3

  // Shuffle list
  const shuffled = buttons
    .map(btn => ({ btn, rnd: Math.random() }))
    .sort((a, b) => a.rnd - b.rnd)
    .map(obj => obj.btn);

  const selected = [];

  for (let btn of shuffled) {
    if (selected.length >= max) break;

    const text = btn.textContent.trim();

    // RULE A — Ascension / Descension conflict
    if (text === "Ascension" && selected.some(b => b.textContent.trim() === "Descension")) continue;
    if (text === "Descension" && selected.some(b => b.textContent.trim() === "Ascension")) continue;

    // Accept this button
    selected.push(btn);

    // RULE B — Same Wall automatically enables Same
    if (text === "Same Wall") {
      const sameBtn = findButtonByText("Same");
      if (sameBtn && !selected.includes(sameBtn)) {
        selected.push(sameBtn);
      }
    }
  }

  // Activate selected
  selected.forEach(btn => btn.classList.add("rule-button-active"));
}

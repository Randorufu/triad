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

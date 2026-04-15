let selectedColor = null;
let currentPuzzle = null;

// Build level select buttons
function buildLevelSelect() {
  const container = document.getElementById("level-select");
  container.innerHTML = "";

  puzzles.forEach((puzzle, index) => {
    const btn = document.createElement("button");
    btn.textContent = puzzle.name;
    btn.className = "level-button";
    btn.onclick = () => loadPuzzle(index);
    container.appendChild(btn);
  });
}

// Load a puzzle
function loadPuzzle(index) {
  currentPuzzle = puzzles[index];

  document.getElementById("puzzle-title").textContent = currentPuzzle.name;

  buildPalette();
  buildGrid();
}

// Build the color palette
function buildPalette() {
  const paletteDiv = document.getElementById("palette");
  paletteDiv.innerHTML = "";

  Object.entries(currentPuzzle.palette).forEach(([num, color]) => {
    const swatch = document.createElement("div");
    swatch.className = "palette-color";
    swatch.style.background = color;
    swatch.dataset.color = color;
    swatch.dataset.number = num;

    swatch.onclick = () => {
      selectedColor = num;

      document.querySelectorAll(".palette-color")
        .forEach(el => el.classList.remove("selected"));

      swatch.classList.add("selected");
    };

    paletteDiv.appendChild(swatch);
  });
}

// Build the puzzle grid
function buildGrid() {
  const gridDiv = document.getElementById("grid");
  gridDiv.innerHTML = "";
  gridDiv.style.gridTemplateColumns = `repeat(${currentPuzzle.size}, 20px)`;

  currentPuzzle.grid.forEach((row, y) => {
    [...row].forEach((cellValue, x) => {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (cellValue !== "0") {
        cell.textContent = cellValue;
        cell.dataset.number = cellValue;
      }

      cell.onclick = () => handleCellClick(cell);

      gridDiv.appendChild(cell);
    });
  });
}

// Handle coloring a cell
function handleCellClick(cell) {
  if (!selectedColor) return;

  const required = cell.dataset.number;

  if (required === selectedColor) {
    cell.style.background = currentPuzzle.palette[selectedColor];
    cell.textContent = "";
    checkWin();
  }
}

// Check if puzzle is complete
function checkWin() {
  const remaining = [...document.querySelectorAll(".cell")]
    .some(cell => cell.textContent !== "");

  if (!remaining) {
    alert("Puzzle complete! Beautiful work.");
  }
}

// Initialize
buildLevelSelect();

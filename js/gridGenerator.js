

let grid = [];

let cols = 120;
let rows = 60;

// size 1200 x 600;
let gridDiv = document.getElementById("grid");

let { width, height } = loadBoxDimensions(
    {
        t_width: gridDiv.offsetWidth,
        t_height: gridDiv.offsetHeight,
        cols: cols,
        rows: rows
    }
);

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid.push(generateBox({
            cell_width: width - 2,
            cell_height: height - 2,
            element: gridDiv
        }));
    }
}

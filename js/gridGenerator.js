

let grid = [];

let cols = 120;
let rows = 60;

// size 1200 x 600;
let gridDiv = document.getElementById("grid");

let optionBtns = document.getElementsByClassName("options");

//this will highlight the selected option.
let optionsHighlight = (target) => {
    
    //elimino el highlight de los botones.
    for (let btn of optionBtns) {
        btn.classList.remove("highlight");
    }

    //añado el highlight al boton clickeado.
    target.classList.add("highlight");
}

let { width, height } = loadBoxDimensions(
    {
        t_width: 1200,
        t_height: 600,
        cols: cols,
        rows: rows
    }
);

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid.push(generateBox({
            cell_width: width,
            cell_height: height,
            element: gridDiv
        }));
    }
}


let cellType = null; //cell type: start | goal | bloqued

let setCellType = (type) => {
    cellType = type;
}

let changeCell = (target) => {
    switch (cellType) {
        case TYPES.START:
            target.classList.add(TYPES.START);
            break;
        case TYPES.GOAL:
            target.classList.add(TYPES.GOAL);
            break;
        case TYPES.BLOQUED:
            target.classList.add(TYPES.BLOQUED);
            break;
    }
}


document.addEventListener('click', function ({ target }) {
    console.log(target, cellType, target.classList.contains("cell"));
    //si es una "cell", altero su estado.
    if (target && cellType && target.classList.contains("cell")) {
        changeCell(target);
    }
});

document.addEventListener('mousedown', function (a) {
    console.log(a);
    console.log(target, cellType, target.classList.contains("cell"));
    //si es una "cell", altero su estado.
    if (target && cellType === TYPES.BLOQUED && target.classList.contains("cell")) {
        changeCell(target);
    }
});

//constants
let TYPES = {
    VALID: "VALID",
    GOAL: "GOAL",
    EMPTY: "EMPTY",
    BLOQUED: "BLOQUED",
    START: "START",
}
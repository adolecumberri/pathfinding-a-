

let grid = [];

let ww = window.screen.width

let cols = 120;
let rows = 60;
 //adjust cols to the media query
if( ww <= 1200){
    cols = 80;
}else if (ww <= 800){ 
    cols = 40;
}

let gridProcessed = []; //Grid template for the path finding.
let pathFinding = null; //the pathfinding object
// size 1200 x 600;
let gridDiv = document.getElementById("grid");
let optionBtns = document.getElementsByClassName("options");


/**
 * this will highlight the selected option button.
 * @param   {Element} element from the optionsBTns who will reveice the class "highlight"
*/
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
//cells generation.
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid.push(generateBox({
            cell_width: width,
            cell_height: height,
            element: gridDiv
        }));
    }
}

// when onClick, this sets the cell color.
let cellType = null; //cell type: start | goal | bloqued

let setCellType = (type) => {
    cellType = type;
}

let changeCell = ({target}) => {
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

/* Events */
document.addEventListener('click', function (e) {
    let target = e.target;
    //si es una "cell", altero su estado.
    if (target && cellType && target.classList.contains("cell")) {
        changeCell(e);
    }
});

document.addEventListener('mousedown', function (a) {
    if (cellType === TYPES.BLOQUED) {

        let cells = document.getElementsByClassName("cell");
        for (let cell of cells) {
            cell.addEventListener('mouseover', changeCell);
        }
    }

    //si es una "cell", altero su estado.
    // if (target && cellType === TYPES.BLOQUED && target.classList.contains("cell")) {
    //     changeCell(target);
    // }
});

document.addEventListener('mouseup', function (a) {
console.log("mouseup");
    let cells = document.getElementsByClassName("cell");

    for (let cell of cells) {
        cell.removeEventListener('mouseover', changeCell);
    }
});


const generatePath  = () => {
    let cells = document.getElementsByClassName("cell");
    let index = 0;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){

            cells[index].innerHTML = `${index}`;
            index++;
        }
    }
}


//constants
let TYPES = {
    GOAL: "GOAL",
    EMPTY: "EMPTY",
    BLOQUED: "BLOQUED",
    START: "START",
}
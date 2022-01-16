
//container of the cells element.
// HTMLDivElement[]
let grid = [];

//[number, number];
let startCoordinates = []; //distance from top, distance from left.

//HTMLDivElements
let path = []; //path to find.

//cell dimentions
let width = 10; 
let height = 10;

//grid dimentions
let cols = 120;
let rows = 60;

//adjust dimentions based on window width
if (window.innerWidth <= 1200 && window.innerWidth >= 800) {
    cols = 80;
} else if (window.innerWidth <= 800) {
    cols = 40;
}

let pathFindingClass = null; //the pathfinding object
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

//cells generation.
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid.push(generateBox()); //set cells in the container and return them
    }
}

// when onClick, this sets the cell color.
let cellType = null; //cell type: start | goal | bloqued

let setCellType = (type) => {
    cellType = type;
}

let changeCell = ({ target }) => {
    switch (cellType) {
        case TYPES.START:
            let lastStart = document.getElementsByClassName(TYPES.START)[0];
            if (lastStart) {
                lastStart.classList = ['cell'];
            }
            target.classList.add(TYPES.START);
            break;

        case TYPES.GOAL:
            let lastGoal = document.getElementsByClassName(TYPES.GOAL)[0];
            if (lastGoal) {
                lastGoal.classList = ['cell'];
            }
            target.classList.add(TYPES.GOAL);
            break;

        case TYPES.BLOQUED:
            target.classList.add(TYPES.BLOQUED);
            break;
    }
}


const generateBox = () => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("style",
        `width: ${width}px;
        height: ${height}px;
        box-sizing: border-box;`
    );
    newDiv.classList.add("cell");
    
    gridDiv.appendChild(newDiv);

    return newDiv;

}

const generatePath = () => {
    let cells = document.getElementsByClassName("cell");
    let index = 0;
    let gridPrototype = []; //grid prototype to insert in the path finding class

    //create prototype.
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {

            if (cells[index].classList.contains(TYPES.START)) {
                startCoordinates = [i, j];
                row.push(TYPES.START);
            } else if (cells[index].classList.contains(TYPES.GOAL)) {
                row.push(TYPES.GOAL);
            } else if (cells[index].classList.contains(TYPES.BLOQUED)) {
                row.push(TYPES.BLOQUED);
            } else {
                row.push(TYPES.EMPTY);
            }

            //  cells[index].innerHTML = `${index}`;
            index++;
        }
        gridPrototype.push(row);

    }

    clearPath();

    pathFindingClass = new pathFinding(gridPrototype);
    path = pathFindingClass.usePathFinding(startCoordinates);

    paintPath();

}

const paintPath = () => {

    //posiciones respecto a top y left (NO son indices)
    let [top, left] = startCoordinates;
    let initialPointer = top * cols + left;
    let movement = {
        NORTH: -cols,
        EAST: 1,
        SOUTH: cols,
        WEST: -1,
    };

    path.forEach(dir => {
        if (grid[initialPointer + movement[dir]] === undefined) debugger;
        grid[initialPointer + movement[dir]].classList.add("PATH");
        initialPointer += movement[dir];
    });

}

const clearGird = () => {

   clearPath();
   clearBlocks();
   clearGoal();
   clearStart();

    console.timeEnd("algo");
}

const clearPath = () => {
    let pathCells = document.getElementsByClassName('PATH');
    for (let i = pathCells.length - 1; i >= 0; i--) {
        pathCells[i].classList = ['cell'];
    }
    path = [];
}

const clearBlocks = () => {
    let bloques = document.getElementsByClassName(TYPES.BLOQUED);
    for (let i = bloques.length - 1; i >= 0; i--) {
        bloques[i].classList = ['cell'];
    }
}

const clearGoal = () => {
    let goal = document.getElementsByClassName(TYPES.GOAL)[0];
    if (goal) goal.classList = ['cell'];
}

const clearStart = () => {
    let start = document.getElementsByClassName(TYPES.START)[0];
    if (start) start.classList = ['cell'];
}


/* Events */
document.addEventListener('click', function (e) {
    let target = e.target;
    //si es una "cell", altero su estado.
    if (target && cellType && target.classList.contains("cell")) {
        changeCell(e);
    }
});

document.addEventListener('mousedown', function () {

    if (cellType === TYPES.BLOQUED) {

        let cells = document.getElementsByClassName("cell");
        for (let cell of cells) {
            cell.addEventListener('mouseover', changeCell);
        }
    }

});

document.addEventListener('mouseup', function (a) {
    
    let cells = document.getElementsByClassName("cell");

    for (let cell of cells) {
        cell.removeEventListener('mouseover', changeCell);
    }
});

window.onresize = function () {
    
    if (window.innerWidth > 1200) {
        cols = 120;
    } else if (window.innerWidth <= 1200 && window.innerWidth >= 800) {
        console.log("< 1200 ");
        cols = 80;
    } else if (window.innerWidth <= 800) {
        cols = 40;
    }

}


//constants
let TYPES = {
    VALID: "VALID",
    GOAL: "GOAL",
    EMPTY: "EMPTY",
    BLOQUED: "BLOQUED",
    START: "START",
}

let container = document.getElementById("container");

let width = 160;
let height = 84;
// Create a 4x4 grid
// Represent the grid as a 2-dimensional array
var gridSize = 10;
var grid = [];
let obstacles = [];

function createGrid () {
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            if(obstacles[i] && obstacles[i][j]){
                console.log("entro", i, j)
                grid[i][j] = "Obstacle";
            }else{
                grid[i][j] = "Empty";
            }
        }
    }
    grid[0][0] = "Start";
    grid[9][9] = "Goal";
}

createGrid();
// Think of the first index as "distance from the top row"
// Think of the second index as "distance from the left-most column"

// This is how we would represent the grid with obstacles above


// grid[7][0] = "Obstacle";
// grid[7][1] = "Obstacle";
// grid[7][2] = "Obstacle";
// grid[7][3] = "Obstacle";
// grid[8][3] = "Obstacle";
// grid[1][2] = "Obstacle";
// grid[0][3] = "Obstacle";
// grid[2][1] = "Obstacle";

//el mapa tiene que tener una grid. la cual  actualizo dependendo de las sillas cogidas
let way = findShortestPath([0, 0], grid);

function gridColor(type) {
    switch (type) {
        case "Empty":
            return "none";
        case "Start":
            return "green";

        case "Obstacle":
            return "grey";
        case "Goal":
            return "red";

        case "Visited":
            return "yellow";

        default:
            debugger;
    }

}


// let way = findShortestPath([0, 0], grid);
// console.log(findShortestPath([0, 0], grid));

function animationStart(e) {
    // console.log(e);
    // let finalPath = `path("M ${myTop + 80},${left - 9}`
    let myTop = container.offsetTop;
    let left = container.offsetLeft;
    console.log(myTop, left);
    let divMooving = e.target;
    // divMooving.style['offset-path'] = `path("M ${myTop + 80},${left - 9} v 80")`;
    // divMooving.style['offset-rotate'] = `auto`;


    let animation = [];
    let defaultTiming = {
        duration: 500,
        // iterations: Infinity,
        fill: 'both',
        easing: 'ease-in-out',
        // offsetRotate: "auto",
    }
    // let width = divMooving.offsetWidth;

    // let height = divMooving.offsetHeight;
    let initKeyFrame = {
        left: divMooving.offsetLeft,
        top: divMooving.offsetTop
    }
    // debugger;
    animation.push(initKeyFrame); //punto de partida.
    way.forEach((way, i) => {

        switch (way) {
            case "East":
                initKeyFrame.left += 160;
                break;
            case "South":
                initKeyFrame.top += 80;
                break;
            case "North":
                initKeyFrame.top -= 80
                break;
            case "West":
                initKeyFrame.left -= 160;
                break;

            default:
                debugger;
        };
        defaultTiming.duration += 800;
        animation.push({
            left: `${initKeyFrame.left}px`,
            top: `${initKeyFrame.top}px`,
        })

    });

    // way.forEach((way) => {
    // console.log("a")
    // let p1 = Promise.resolve( 
    divMooving.animate(
        animation
        , defaultTiming);
    // );
    // setInterval(() => {

    //     console.log("entro")
    //     divMooving.animate([{
    //         color: "#fff",
    //         // offsetRotation: 'auto' 
    //     },
    //     {
    //         color: "#000",
    //         // offsetRotation: 'auto' 
    //     }
    //     ], defaultTiming);
    // }, 800);
    // let b = Promise.all([p1]).then(function () {
    // return divMooving.animate({ width: 0 }, { duration: 500, queue: false });
    // });

    // console.log({b});
    // console.log("b");
    // });


}

// function animationStartEvent(e) {
//     console.log(e);
// }
// function animationEndEvent(e) {
//     console.log(e);
// }
// function animationIterationEvent(e) {
//     console.log(e);
// }

function loadWall(e, i, j) {

    if(!obstacles[i]){
        obstacles[i] = [];
    }
    obstacles[i][j] = "Obstacle";
    createGrid();
    way = findShortestPath([0, 0], grid);
    paintGrid();
}

function paintGrid() {
    console.log("pinto", way, grid)
    container.innerHTML = "";
    grid.forEach((row, i) => {
        // let rowDiv = document.createElement("div");
        // rowDiv.classList.add("row");
        // debugger;
        row.forEach((cell, j) => {
            let newDiv = document.createElement("div");
            newDiv.classList.add("sub-div");
            newDiv.style["top"] = `${80 * i}px`;
            newDiv.style["left"] = `${160 * j}px`;
            // debugger;
            newDiv.style.backgroundColor = gridColor(grid[i][j]);
            if (grid[i][j] === "Start") {
                newDiv.style["z-index"] = 5;
                newDiv.addEventListener("click", (e) => animationStart(e))
                // newDiv.onanimationstart = () => {
                //     console.log('Animation started');
                // };
                // newDiv.addEventListener("animationend", (e) => animationEndEvent(e));
                // newDiv.addEventListener("animationiteration", (e) => animationIterationEvent(e));

            } else {
                newDiv.addEventListener("click", (e) => loadWall(e, i, j))
            }
            container.appendChild(newDiv);
        });

        // container.appendChild(rowDiv);
    });
}


paintGrid();


// for (let i = 0; i < 50; i++) {

//     let newDiv = document.createElement("div");
//     newDiv.classList.add("sub-div");
//     newDiv.addEventListener("click", (
//         // { target, screenX, screenY }
//     e
//         ) => {

// console.log(e);

//         if (e.target.classList.contains("move2")) {
//             e.target.classList.remove("move2");
//         } else {
//             // container.appendChild(createPath(e.x, e.y));
//             e.target.classList.add("move2");
//             e.target.animate([{
//                 offsetDistance: 0,
//                 // offsetRotation: 'auto' 
//             },
//             {
//                 offsetDistance: '100%',
//                 // offsetRotation: 'auto' 
//             }
//             ], defaultTiming);
//         }


//     });
//     container.appendChild(newDiv);
// }
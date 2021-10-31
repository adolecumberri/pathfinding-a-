let container = document.getElementById("container");
// Create a 4x4 grid
// Represent the grid as a 2-dimensional array
var gridSize = 10;
var grid = [];
for (var i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize; j++) {
        grid[i][j] = "Empty";
    }
}

// Think of the first index as "distance from the top row"
// Think of the second index as "distance from the left-most column"

// This is how we would represent the grid with obstacles above
grid[0][0] = "Start";
grid[9][9] = "Goal";

grid[1][0] = "Obstacle";
grid[1][2] = "Obstacle";
grid[3][0] = "Obstacle";
grid[2][1] = "Obstacle";

//el mapa tiene que tener una grid. la cual  actualizo dependendo de las sillas cogidas
console.log(findShortestPath([0, 0], grid));

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

console.log(findShortestPath([0, 0], grid));

grid.forEach((row, i) => {

    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    // debugger;
    row.forEach((cell, j) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("sub-div");
        newDiv.style["height"] = `${Math.floor(container.offsetHeight / grid.length)}px`;
        // debugger;
        newDiv.style.backgroundColor = gridColor(grid[i][j]);
        rowDiv.appendChild(newDiv);
    });

    container.appendChild(rowDiv);
});

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
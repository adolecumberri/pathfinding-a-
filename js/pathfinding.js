// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
const delay = ms => new Promise(res => setTimeout(res, ms));

let findShortestPath = function (startCoordinates, grid, paintFunction) {
  // debugger;
  let visited = {};
  let distanceFromTop = startCoordinates[0];
  let distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  let location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: "Start",
  };
  // debugger;
  // Initialize the queue with the start location already inside
  let queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    let currentLocation = queue.shift();

    // Explore North
    let newLocation = exploreInDirection(currentLocation, "North", grid, visited, paintFunction);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore East
    newLocation = exploreInDirection(currentLocation, "East", grid, visited, paintFunction);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore South
    newLocation = exploreInDirection(currentLocation, "South", grid, visited, paintFunction);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore West
    newLocation = exploreInDirection(currentLocation, "West", grid, visited, paintFunction);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;
};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
let locationStatus = function (location, grid) {
  if (grid[location.distanceFromLeft] === undefined) debugger;
  let gridXSize = grid.length;
  let gridYSize = grid[0].length;
  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;

  if (
    location.distanceFromLeft < 0 ||
    location.distanceFromLeft >= gridYSize ||
    location.distanceFromTop < 0 ||
    location.distanceFromTop >= gridXSize
  ) {
    // location is not on the grid--return false
    return "Invalid";
  } else if (grid[dft][dfl] === "Goal") {
    return "Goal";
    // } else if (grid[dft][dfl] !== "Empty") {
  } else if (grid[dft][dfl] !== "Empty") {

    // location is either an obstacle or has been visited
    return "Blocked";
  } else {
    return "Valid";
  }
};

// Explores the grid from the given location in the given
// direction
let exploreInDirection = function (currentLocation, direction, grid, visited, paintFunction) {
  let newPath = currentLocation.path.slice();
  newPath.push(direction);

  let dft = currentLocation.distanceFromTop;
  let dfl = currentLocation.distanceFromLeft;

  if (direction === "North") {
    dft -= 1;
  } else if (direction === "East") {
    dfl += 1;
  } else if (direction === "South") {
    dft += 1;
  } else if (direction === "West") {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: "Unknown",
  };
  newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === "Valid") {
    // visited[`${newLocation.distanceFromTop}-${newLocation.distanceFromLeft}`] = "Visited";
    // setTimeout( () => {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";

    // }, 500 );

    (async () => await delay(500))();
    // setTimeout( () => {
    // alert("a")
    paintFunction()
    // }, 500);


  }

  return newLocation;
};


// // Create a 4x4 grid
// // Represent the grid as a 2-dimensional array
// var gridSize = 4;
// var grid = [];
// for (var i = 0; i < gridSize; i++) {
//   grid[i] = [];
//   for (var j = 0; j < gridSize; j++) {
//     grid[i][j] = "Empty";
//   }
// }

// // Think of the first index as "distance from the top row"Visited
// // Think of the second index as "distance from the left-most column"

// // This is how we would represent the grid with obstacles above
// grid[0][0] = "Start";
// grid[2][2] = "Goal";

// grid[1][1] = "Obstacle";
// grid[1][2] = "Obstacle";
// grid[1][3] = "Obstacle";
// grid[2][1] = "Obstacle";

// //el mapa tiene que tener una grid. la cual  actualizo dependendo de las sillas cogidas
// console.log(findShortestPath([0, 0], grid));

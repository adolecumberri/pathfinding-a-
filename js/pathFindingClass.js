

class pathFinding {

    grid = null;
    ghostGrid = null;
    path = null;
    queue = [];
    DIRECTIONS = {
        NORTH: "NORTH",
        EAST: "EASR",
        SOUTH: DIRECTIONS.SOUTH,
        WEST: DIRECTIONS.WEST,
    };

    TYPES = {
        VALID: "VALID",
        GOAL: "GOAL",
        EMPTY: "EMPTY",
        BLOQUED: "BLOQUED",
        START: "START",
    }

    /**
     * @param {( "EMPTY" | "BLOQUED" | "GOAL" | "START") [][]} grid 
     */
    constructor(grid) {

        this.grid = grid;
        this.ghostGrid = grid;
        this.queue = [];
    }


    usePathFinding = function (startCoordinates) {
        //initialize ghostGrid
        this.ghostGrid = grid;

        let initialDFT = startCoordinates[0]; //Distance From Top
        let initialDFL = startCoordinates[1]; //Distance From Left

        let initialLocation = {
            dft: initialDFT,
            dfl: initialDFL,
            path: [],
            status: TYPES.START,
        };

        //initial queue location.
        queue = [initialLocation];

        // Loop through the grid searching for the goal
        while (queue.length > 0) {
            // Take the first location off the queue
            let currentLocation = queue.shift();

            // Explore North
            let newLocation = this.exploreInDirection(currentLocation, DIRECTIONS.NORTH);
            let locations = [DIRECTIONS.NORTH]


            if (newLocation.status === TYPES.GOAL) {
                return newLocation.path;
            } else if (newLocation.status === TYPES.VALID) {
                queue.push(newLocation);
            }

            // Explore East
            newLocation = this.exploreInDirection(currentLocation, DIRECTIONS.EAST);
            if (newLocation.status === TYPES.GOAL) {
                return newLocation.path;
            } else if (newLocation.status === TYPES.VALID) {
                queue.push(newLocation);
            }

            // Explore South
            newLocation = this.exploreInDirection(currentLocation, DIRECTIONS.SOUTH);
            if (newLocation.status === TYPES.GOAL) {
                return newLocation.path;
            } else if (newLocation.status === TYPES.VALID) {
                queue.push(newLocation);
            }

            // Explore West
            newLocation = this.exploreInDirection(currentLocation, DIRECTIONS.WEST);
            if (newLocation.status === TYPES.GOAL) {
                return newLocation.path;
            } else if (newLocation.status === TYPES.VALID) {
                queue.push(newLocation);
            }
        }

        // No valid path found
        return false;
    };

    // Explores the grid from the given location in the given
    // direction
    exploreInDirection = function (currentLocation, direction) {
        let newPath = currentLocation.path.slice();
        //current Queue path + the new direction.
        newPath.push(direction);

        let dft = currentLocation.dft;
        let dfl = currentLocation.dfl;

        //adjust distances from top or left.
        if (direction === "North") {
            dft -= 1;
        } else if (direction === DIRECTIONS.EAST) {
            dfl += 1;
        } else if (direction === DIRECTIONS.SOUTH) {
            dft += 1;
        } else if (direction === DIRECTIONS.WEST) {
            dfl -= 1;
        }

        let newLocation = {
            distanceFromTop: dft,
            distanceFromLeft: dfl,
            path: newPath,
            status: this.locationStatus(newLocation)
        };

        // If this new location is valid, mark it as 'Visited'
        if (newLocation.status === TYPES.VALID) {
            this.ghostGrid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";
        }

        return newLocation;
    }

    /**
     *  This Function will check a location's status.
     * @param {{ dft: number; dfl: number; path: string[]; status: string; }} location 
     * @returns TYPES.VALID | "Invalid" | "Blocked" | TYPES.GOAL
     */
    locationStatus = function (location) {

        if (this.ghostGrid[location.dfl] === undefined) debugger;

        let gridXSize = this.ghostGrid.length; // 1ºst column length
        let gridYSize = this.ghostGrid[0].length; // 1ºst row length
        let dft = location.dft;
        let dfl = location.dfl;

        if (
            location.dfl < 0 ||
            location.dfl >= gridYSize ||
            location.dft < 0 ||
            location.dft >= gridXSize
        ) {
            // location is not on the grid--return false
            return "Invalid";
        } else if (this.ghostGrid[dft][dfl] === TYPES.GOAL) {
            return TYPES.GOAL;
        } else if (this.ghostGrid[dft][dfl] !== TYPES.EMPTY) {
            // location is either an obstacle or has been visited
            return TYPES.BLOQUED;
        } else {
            return TYPES.VALID;
        }
    };

}

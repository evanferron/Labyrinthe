function backtrackingMaze(size) {
    
    let maze = [];
    for (let i = 0; i < size; i++) {
        maze.push([]);
        for (let j = 0; j < size; j++) {
            maze[i].push(1);
        }
    }
    
    maze[0][1] = 0;
    
    let start = [];
    do {
        start[0] = Math.floor(Math.random() * size)
    } while (start[0] % 2 == 0);
    do {
        start[1] = Math.floor(Math.random() * size)
    } while (start[1] % 2 == 0);
    
    maze[start[0]][start[1]] = 0;
    
    let openCells = [start];
    
    while (openCells.length) {
        
        let cell, n;
        
        openCells.push([-1, -1]);

        do {
            openCells.pop();
            if (openCells.length == 0)
                break;
            cell = openCells[openCells.length - 1];
            n = neighbors(maze, cell[0], cell[1]);
        } while (n.length == 0 && openCells.length > 0);
        
        if (openCells.length == 0)
            break;
        
        let choice = n[Math.floor(Math.random() * n.length)];
        openCells.push(choice);
        
        maze[ choice[0] ][ choice[1] ] = 0;
        maze[ (choice[0] + cell[0]) / 2 ][ (choice[1] + cell[1]) / 2 ] = 0;
    }
    
    maze[maze.length - 1][maze[0].length - 2] = 0;
    maze[maze.length - 2][maze[0].length - 2] = 0;
    
    return maze;
}

function neighbors(maze, ic, jc) {
    var final = [];
    for (var i = 0; i < 4; i++) {
        var n = [ic, jc];
        
        // Iterates through four neighbors
        // [i][j - 2] 
        // [i][j + 2]
        // [i - 2][j]
        // [i + 2][j]
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
        if (n[0] < maze.length && 
            n[1] < maze[0].length && 
            n[0] > 0 && 
            n[1] > 0) {
            
            if (maze[n[0]][n[1]] == 1) {
                final.push(n);
            }
        }
    }
    return final;
}

function randInt(min,max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min))+min
}

async function animateBacktrackingMaze(size, size, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";

    // Make them odd
    size -= size % 2; size++;
    size -= size % 2; size++;
    
    var rectsize = Math.floor(canvas.size / size);
    var rectsize = Math.floor(canvas.size / size);
    
    // Fill maze with 1's (walls)
    var maze = [];
    for (var i = 0; i < size; i++) {
        maze.push([]);
        for (var j = 0; j < size; j++) {
            maze[i].push(1);
        }
    }
    ctx.fillRect(0, 0, size * rectsize, size * rectsize);
    
    ctx.fillStyle = "#EC407A";
    
    // Opening at top - start of maze
    maze[0][1] = 0;
    
    var start = [];
    do {
        start[0] = Math.floor(Math.random() * size)
    } while (start[0] % 2 == 0);
    do {
        start[1] = Math.floor(Math.random() * size)
    } while (start[1] % 2 == 0);
    
    maze[start[0]][start[1]] = 0;
    
    // First open cell
    var openCells = [start];
    
    ctx.fillRect(rectsize * start[1],
                 rectsize * start[0], 
                 rectsize, 
                 rectsize);
    
    while (openCells.length) {
        
        var cell, n;
        
        // Add unnecessary element for elegance of code
        // Allows openCells.pop() at beginning of do while loop
        openCells.push([-1, -1]);
        
        // Define current cell as last element in openCells
        // and get neighbors, discarding "locked" cells
        do {
            var erase = openCells.pop();
            
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    
                    ctx.clearRect(erase[1] * rectsize,
                                  erase[0] * rectsize,
                                  rectsize,
                                  rectsize);
                    
                    resolve();
                }, speed);
            });
            
            if (openCells.length == 0)
                break;
            cell = openCells[openCells.length - 1];
            n = neighbors(maze, cell[0], cell[1]);
            
        } while (n.length == 0 && openCells.length > 0);
        
        // If we're done, don't bother continuing
        if (openCells.length == 0)
            break;
        
        // Choose random neighbor and add it to openCells
        var choice = n[Math.floor(Math.random() * n.length)];
        openCells.push(choice);
        
        // Set neighbor to 0 (path, not wall)
        // Set connecting node between cell and choice to 0
        var path = [];
        path.push((choice[0] + cell[0]) / 2);
        path.push((choice[1] + cell[1]) / 2);
        
        maze[ choice[0] ][ choice[1] ] = 0;
        maze[ path[0] ][ path[1] ] = 0;
        
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                
                ctx.fillRect(choice[1] * rectsize,
                             choice[0] * rectsize,
                             rectsize,
                             rectsize);
                
                ctx.clearRect(path[1] * rectsize,
                              path[0] * rectsize,
                              rectsize,
                              rectsize);
                
                resolve();
            }, speed);

        });
    }
    
    // Opening at bottom - end of maze
    maze[maze.length - 1][maze[0].length - 2] = 0;
    
    ctx.clearRect(rectsize, 0, rectsize, rectsize);
    ctx.clearRect((maze.length - 2) * rectsize,
                  (maze.length - 1) * rectsize,
                  rectsize,
                  rectsize);
    
    return maze;
}

function SetupIndex(laby) {
    laby[0][1] = "A"
    laby[5][4] = "B"
    return laby
}

function simplify(laby) {
    let line = []
    for (i = 0; i < laby[0].length+2;i++) {
        line.push(1)
    }
    let maze = [line]
    for (i = 0; i < laby.length;i++) {
        let copy = [1]
        for (const f of laby[i]) {
            copy.push(f)
        }
        copy.push(1)
        maze.push(copy)
    }
    maze.push(line)
    return maze
}

exports.RandomMaze = () => {
    return simplify(SetupIndex(backtrackingMaze(6)))
}


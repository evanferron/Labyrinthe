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


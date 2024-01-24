export const GetSolution = (maze,playerX,playerY)=>{
    return way(maze,Path(maze,playerX,playerY))
}

function way(laby,path) {
    for (let i = 0; i < laby.length; i++) {
        for (let f = 0; f < laby[i].length; f++) {
            if (laby[i][f] != "W") {
                laby[i][f] = path[i][f]
            }
        }
    }
    return laby
}
function Path(laby,x,y){
    let path = []
    for (let i = 0; i < laby.length; i++) {
        let ligne = []
        for (let j = 0; j < laby[i].length; j++) {
            if (i != x || j != y){
                ligne.push(1000)
            } else {
                ligne.push(0)
            }
        }
        path.push(ligne)
    }
    let index = 0
    let end = false
    while (!end) {
        end = true
        for (let i = 0; i < laby.length; i++) {
            for (let j = 0; j < laby[i].length; j++) {
                if (path[i][j] == index) {
                    Indice(path,i+1,j,index,laby)
                    Indice(path,i-1,j,index,laby)
                    Indice(path,i,j-1,index,laby)
                    Indice(path,i,j+1,index,laby)
                    end = false
                }
            }
        }
        index++
    }
    return path
}

function Indice(chemin,i,j,index,laby) {
    if (laby[i][j] != "W") {
        if (chemin[i][j] > index+1) {
            chemin[i][j] = index+1
        }
    }
}
function index(laby) {
    let indexA = 0
    let indexB = 0
    for (let i = 0; i < laby.length; i++) {
        for (let f = 0; f < laby[i].length;f++) {
            if (laby[i][f] == "A") {
                indexA = [i,f]
            }
            else if (laby[i][f] == "B") {
                indexB = [i,f]
            }
        }
    }
    return [indexA,indexB]
}
export const ResolveMaze = (labyr) => {
    let laby = JSON.parse(JSON.stringify(labyr));
    laby = convert(laby,"start")
    const maze = laby
    const [a, b] = index(laby)
    const [xA, yA] = a
    const [xB, yB] = b
    const path = Path(laby,xA,yA)
    const rev = revList(getPath(path,xB,yB,a))

    for (const i of rev) {
        maze[i[0]][i[1]] = 2
    }
    maze[xA][yA] = "A"
    maze[xB][yB] = "B"
    return convert(maze,"end")
}

function revList(l) {
    let final = []
    for (let i = l.length-1; i > -1;i--) {
        final.push(l[i])
    }
    return final
}

function getPath(laby,x,y,indexA) {
    let [xA,yA] = indexA;
    let path = [[x,y]];

    [x,y] = checkSmall(laby,x,y)
    path.push([x,y])
    while (x != xA || y != yA) {
        [x,y] = checkSmall(laby,x,y)
        path.push([x,y])
    }
    return path

}

function checkSmall(laby,x,y) {
    let index = []
    let indexList = []
    if (x > 0) {
        index.push(laby[x-1][y])
        indexList.push([x-1,y])
    }
    if (y > 0) {
        index.push(laby[x][y-1])
        indexList.push([x,y-1])
    }    
    if (x < laby.length) {
        index.push(laby[x+1][y])
        indexList.push([x+1,y])
    }    
    if (y < laby[x].length) {
        index.push(laby[x][y+1])
        indexList.push([x,y+1])
    }
    return smaller(index,indexList)
}

function smaller(index,indexList) {
    
    var min = 1000
    if (index[0] != "W") {
        min = index[0]
    }

    let id = indexList[0]
    for (let i = 0; i < index.length; i++) {
        if (index[i] != "W") {
            if (index[i] < min) {
                min = index[i]
                id = indexList[i]
            }
        }
    }
    return id
}

function convert(laby,check) {
    if (check == "end") {
        for (let i = 0; i < laby.length; i++) {
            for (let f = 0; f < laby[i].length; f++) {
                if (laby[i][f] == "W") {
                    laby[i][f] = 1
                }
            }
        }
    } else if (check == "start") {
        for (let i = 0; i < laby.length; i++) {
            for (let f = 0; f < laby[i].length; f++) {
                if (laby[i][f] == 1) {
                    laby[i][f] = "W"
                }
            }
        }
    }
    return laby
}


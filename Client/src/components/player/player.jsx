import React,{useEffect,useState} from 'react';
import "./player.css"

const Player = ({coo,map,playerCoo,setWin,setStartGame}) => {
    const speedW = 5
    const speedH = 9

    const checkCell = (cooCell) => {
        switch(map[cooCell[0]][cooCell[1]]){
            case 0:
                return true
            case 1:
                return false
            case "A":
                return true
            case "B":
                setWin(true)
                setStartGame(false)
                return true
        }
        return false
    }


    useEffect(() => {
        const keyDownHandler = event => {
            const element = document.getElementById("player")
            console.log(event.key)
            console.log(playerCoo.current.index.coo)
            event.preventDefault();
                switch(true){
                    case event.key == "z" || event.keyCode == 38:
                        if(checkCell([playerCoo.current.index.coo[0]-1,playerCoo.current.index.coo[1]])){
                            coo.current.index.y = coo.current.index.y - speedH
                            playerCoo.current = {index:{coo:[playerCoo.current.index.coo[0]-1,playerCoo.current.index.coo[1]]}}
                        }
                        break
                    case event.key == "s" || event.keyCode == 40:
                        if(checkCell([playerCoo.current.index.coo[0]+1,playerCoo.current.index.coo[1]])){
                            coo.current.index.y = coo.current.index.y + speedH
                            playerCoo.current = {index:{coo:[playerCoo.current.index.coo[0]+1,playerCoo.current.index.coo[1]]}}
                        }
                        break
                    case event.key == "q"  || event.keyCode == 37:
                        if(checkCell([playerCoo.current.index.coo[0],playerCoo.current.index.coo[1]-1])){    
                            coo.current.index.x = coo.current.index.x - speedW
                            playerCoo.current = {index:{coo:[playerCoo.current.index.coo[0],playerCoo.current.index.coo[1]-1]}}
                        }
                        break
                    case event.key == "d"  || event.keyCode == 39:
                        if(checkCell([playerCoo.current.index.coo[0],playerCoo.current.index.coo[1]+1])){
                            coo.current.index.x = coo.current.index.x + speedW
                            playerCoo.current = {index:{coo:[playerCoo.current.index.coo[0],playerCoo.current.index.coo[1]+1]}}
                        }
                        break
                }
                coo.current.index = {top:`${coo.current.index.y}vh`, left:`${coo.current.index.x}vw`,x:coo.current.index.x,y:coo.current.index.y}
                element.style.top = coo.current.index.top
                element.style.left = coo.current.index.left
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);


    return (
        <div id="player" style={coo.current.index}>
        </div>
    );
};

export default Player;
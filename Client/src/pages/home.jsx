import React,{useEffect,useState,useRef} from 'react';
import Header from '../components/Header/header';
import Player from '../components/player/player';
import Game from '../components/game/game';
import Utils from '../utils/utils';
import "./home.css"

const Home = () => {
    const map = [[1, 1, 1, 1, 1, 1, 1, 1],
                 [1, 0, 0, 1, 2, 2, 2, 1],
                 [1, 2,"A", 1, "B", 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 1], 
                 [1, 1, 0, 1, 1, 0, 1, 1], 
                 [1, 0, 0, 0, 0, 0, 0, 1], 
                 [1, 1, 1, 1, 1, 1, 1, 1]]
    const [startGame, setstartGame] = useState(false);
    const [win,setWin] = useState(false);
    const playerCoo = useRef({index:{coo:Utils.GetStartCoo(map)}})
    const stylePlayer = useRef({
        index:{
        top : `${playerCoo.current.index.coo[0]*9 +20}vh`,
        left : `${playerCoo.current.index.coo[1]*5+32}vw`,
        y:playerCoo.current.index.coo[1]*9+20,
        x:playerCoo.current.index.coo[0]*5+32
        }
    })

    const resetData =() =>{
        playerCoo.current.index ={coo:Utils.GetStartCoo(map)}
        stylePlayer.current.index = {
            top : `${playerCoo.current.index.coo[0]*9 +20}vh`,
            left : `${playerCoo.current.index.coo[1]*5+32}vw`,
            y:playerCoo.current.index.coo[1]*9+20,
            x:playerCoo.current.index.coo[0]*5+32
            }
    }

    const printSolution=()=>{
        const path = document.getElementsByClassName("solution")
        console.log(path)
        for(let e of path){
            e.style.backgroundColor = "blue";
        }
    }

    const generateLevel= () => {
        // TO DO
        // 
    }

    return (
        <div id="main-container-home">
            <Header></Header>
            {
                startGame?
                <section id="game">
                <Player coo={stylePlayer} map={map} playerCoo={playerCoo} setWin={setWin} setStartGame={setstartGame}></Player>
                <Game map={map}></Game>              
                </section>:
                <section id="start-window-home">
                    <div>
                        {
                            win?
                            <div>
                                <h1>Congrats you win</h1>
                                <button onClick={()=>{
                                    resetData()
                                    setWin(false)
                                    setstartGame(true)
                                }}>
                                    Press to start a new level
                                </button>
                            </div>:
                            <button onClick={()=>{setstartGame(true)}}>
                            Press to start a level
                            </button>
                        }
                    </div>
                </section>
            }
            <button onClick={()=>printSolution()}>show solution</button>
        </div>
    );
};

export default Home;
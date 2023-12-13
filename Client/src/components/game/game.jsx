import React,{useState} from 'react';
import { ResolveMaze } from '../../utils/maze';
import "./game.css"

const Game = ({map}) => {
    const [showSolution,setShowSolution] = useState(false)
    const mapSolution = ResolveMaze(map.current.map)
    const styleGame = {
        width: map.current.map[0].lenght,
        height: map.current.map.lenght
    }
    const getLine = (line) =>{
        return (
            <div>
            {line.map((unit,index) => {
                let result;
                switch(unit){
                    case 1 :
                        result = <div className="wall" key={index}></div>;
                        break
                    case 0 :
                        result = <div className="path" key={index}></div>;
                        break
                    case 2:
                        result = <div className="solution" key={index}></div>;
                        break
                    case "A":
                        result = <div id="start" key={index}></div>;
                        break
                    case "B":
                        result = <div id="end" key={index}></div>;
                        break
                    default:
                        console.log(unit)
                        alert("Error during the generation of the labyrinth")
                        break
                }
                return result;
            })}
            </div>
        )
    }

    return (
            <div>
                {showSolution?
                <div id="labyrinth" style={styleGame}>
                    {mapSolution.map((line,index) => {
                    return(
                        <div key={index}>
                        {getLine(line)}
                        </div>
                        )
                    })}
                </div>
                :
                <div id="labyrinth" style={styleGame}>
                {map.current.map.map((line,index) => {
                    return(
                        <div key={index}>
                        {getLine(line)}
                        </div>
                        )
                    })}
                    <button onClick={()=>{
                        setShowSolution(true)
                        console.log("solution has been show")
                    }} id="button-show-solution">show solution</button>
                    </div>
                }
                </div>
            )

    
};

export default Game;
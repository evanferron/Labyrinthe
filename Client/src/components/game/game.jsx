import React from 'react';
import "./game.css"

const Game = ({map}) => {
    const styleGame = {
        width: map[0].lenght,
        height: map.lenght
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
                        result = <div id="path" key={index}></div>;
                        break
                    case 2:
                        result = <div id="path" className="solution" key={index}></div>;
                        break
                    case "A":
                        result = <div id="start" key={index}></div>;
                        break
                    case "B":
                        result = <div id="end" key={index}></div>;
                        break
                    
                    default:
                        alert("Error during the generation of the labyrinth")
                        break
                }
                return result;
            })}
            </div>
        )
    }

    return (
        <div id="labyrinth" style={styleGame}>
            {map.map((line,index) => {
                return(
                    <div key={index}>
                        {getLine(line)}
                    </div>
                )
            })}
        </div>
    );
};

export default Game;
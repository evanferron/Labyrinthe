import React,{useState} from 'react';
import "./player.css"

const Player = ({
    defaultX,
    defaultY
}) => {
    const [x,setX] = useState(defaultX)
    const [y,setY] = useState(defaultY)

    return (
        <div id="player">
        </div>
    );
};

export default Player;
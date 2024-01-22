import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header/header";
import Player from "../components/player/player";
import Game from "../components/game/game";
import Utils from "../utils/utils";
import axios from "axios";
import "./home.css";

const Home = () => {
  const url = "http://localhost:3001/api";
  const generateMaze = async () => {
    const response = await axios.get(url + "/mazes/generate");
    return response.data.maze;
  };
  const [startGame, setstartGame] = useState(false);
  const [win, setWin] = useState(false);
  const map = useRef({});
  const [displayScore, setDisplayScore] = useState(0);
  const playerCoo = useRef({ index: {} });
  const stylePlayer = useRef({ index: {} });
  const score = useRef({
    index: {
      score: 0,
    },
  });
  const initData = async () => {
    const maze = await generateMaze();
    map.current = { map: maze };
    playerCoo.current.index = { coo: Utils.GetStartCoo(map.current.map) };
    stylePlayer.index = {
      top: `${playerCoo.current.index.coo[0] * 9 + 20}vh`,
      left: `${playerCoo.current.index.coo[1] * 5 + 32}vw`,
      y: playerCoo.current.index.coo[0] * 9 + 20,
      x: playerCoo.current.index.coo[1] * 5 + 32,
    };
  };
  useEffect(() => {
    initData();
  }, []);
  const resetData = () => {
    playerCoo.current.index = { coo: Utils.GetStartCoo(map.current.map) };
    stylePlayer.current.index = {
      top: `${playerCoo.current.index.coo[0] * 9 + 20}vh`,
      left: `${playerCoo.current.index.coo[1] * 5 + 32}vw`,
      y: playerCoo.current.index.coo[0] * 9 + 20,
      x: playerCoo.current.index.coo[1] * 5 + 32,
    };
    score.current.index.score = 0;
  };
  const saveScore = () => {};
  return (
    <div id="main-container-home">
      <Header></Header>
      {startGame ? (
        <section id="game">
          <Player
            coo={stylePlayer}
            map={map}
            playerCoo={playerCoo}
            setWin={setWin}
            setStartGame={setstartGame}
            score={score}
            setDisplayScore={setDisplayScore}
          ></Player>
          <Game map={map} />
          <button
            onClick={() => {
              setstartGame(false);
              setWin(true);
            }}
          >
            skip level
          </button>
        </section>
      ) : (
        <section id="start-window-home">
          <div>
            {win ? (
              <div>
                <h1>Congrats you win</h1>
                <button
                  onClick={() => {
                    resetData();
                    setWin(false);
                    setstartGame(true);
                    setDisplayScore(0);
                  }}
                >
                  Press to start a new level
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setstartGame(true);
                }}
              >
                Press to start a level
              </button>
            )}
          </div>
        </section>
      )}
      <section id="bottom-container-home">
        <span>score : {displayScore}</span>
      </section>
    </div>
  );
};

export default Home;

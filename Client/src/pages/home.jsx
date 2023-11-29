import React from 'react';
import Header from '../components/Header/header';
import Player from '../components/player/player';
import "./home.css"

const Home = () => {
    return (
        <div id="main-container-home">
            <Header></Header>
            <section id="game">
                <Player></Player>
            </section>
            <section></section>
        </div>
    );
};

export default Home;
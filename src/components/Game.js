import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { UserContext } from "../App";
import MoleGrid from "./MoleGrid";
import "../styles/Game.css";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import gameMusic from "../assets/sounds/gameMusic.mp3";

const Game = () => {
  const { username } = useContext(UserContext);
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState("low");
  const [molePositions, setMolePositions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPointBox, setShowPointBox] = useState(false);
  const [recentPoints, setRecentPoints] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [lastResults, setLastResults] = useState([]);
  const audioRef = useRef(null);

  // Asignamos la velocidad de los topos segun el nivel de dificultad
  const difficultyToMs = useMemo(() => {
    return {
      low: 1000,
      medium: 750,
      high: 500,
    };
  }, []);

  // Ahora de forma aleatoria generamos las posiciones de los topos para el array
  function getRandomMolePositions() {
    const moleCount = Math.floor(Math.random() * 2) + 1;
    const positions = Array.from({ length: moleCount }, () =>
      Math.floor(Math.random() * 9)
    );
    return positions;
  }

  // Funcion para cuando se hace click en el Topo (si coincide)
  // Vibracion si esta disponible + sumamos los puntos + mostramos la caja flotante
  function handleMoleWhack(moleIndex) {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    const gainedPoints = getPointsPerMole();
    setPoints(points + gainedPoints);
    setRecentPoints(gainedPoints);
    setShowPointBox(true);

    setTimeout(() => {
      setShowPointBox(false);
    }, 500);
    setMolePositions(molePositions.filter((index) => index !== moleIndex));
  }

  // Asignamos la cantidad de puntos correspondiente a cada caso de dificultad
  function getPointsPerMole() {
    switch (difficulty) {
      case "medium":
        return 20;
      case "high":
        return 30;
      default:
        return 10;
    }
  }

  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);
  }

  //  Generamos las posiciones para los TOPOS SI esta en PLAY
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setMolePositions(getRandomMolePositions());
      }, difficultyToMs[difficulty]);
    } else {
      setMolePositions([]);
    }

    // Cambiamos velocidad de la cancion en base a la dificultad del juego :)
    if (audioRef.current) {
      switch (difficulty) {
        case "medium":
          audioRef.current.playbackRate = 1.25;
          break;
        case "high":
          audioRef.current.playbackRate = 1.5;
          break;
        default:
          audioRef.current.playbackRate = 1.0;
          break;
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [difficulty, isPlaying, difficultyToMs]);

  function handlePlayStop() {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setMolePositions([]);
    }
  }

  // Cuenta atrás para no tener que estar matando topos infinitamente
  useEffect(() => {
    let countdownInterval;

    if (isPlaying) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (countdown === 0) {
      // Paramos el juego, mostramos los puntos y manejamos las ultimas puntuaciones
      setIsPlaying(false);
      setShowScoreModal(true);
      setCountdown(15);

      setLastResults((prevResults) =>
        [...prevResults, { username: username, points: points }].slice(-4)
      );
    }
  }, [countdown, points, username]);

  // Play y Pause para la musica si se toca el boton cambiando el estado isMusicPlaying
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  return (
    <>
      <div className="background-container">
        <div
          className="sky"
          style={{
            animationDuration: `${difficultyToMs[difficulty] * 18}ms`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />
        <div className="grass"></div>
      </div>
      <div className="gameContainer">
        <div className="playerInfo">
          <h1>{username}</h1>
          <p>
            Puntos: <span>{points}</span>
          </p>
        </div>
        <div className="gameControls">
          <div className="difficulty-container">
            <p>Dificultad:</p>
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="low">Bajo</option>
              <option value="medium">Medio</option>
              <option value="high">Alto</option>
            </select>
          </div>
          <div className="countdown">
            <p>
              <b>
                TIEMPO:<br></br>
                <span>{countdown}</span>
              </b>
            </p>
          </div>
          <button className="game-button" onClick={handlePlayStop}>
            {isPlaying ? "STOP" : "PLAY"}
          </button>
        </div>
        <MoleGrid molePositions={molePositions} onMoleWhack={handleMoleWhack} />
        {showPointBox && (
          <div className="points-box">+ {recentPoints} puntos! ✅</div>
        )}
        <audio ref={audioRef} src={gameMusic} loop>
          Your browser does not support the audio element.
        </audio>
        <button
          className="music-button"
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        >
          {isMusicPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>

      {showScoreModal && (
        <div className="score-modal">
          <div className="score-modal-content">
            <h1>Puntuación final</h1>
            <p>
              <span>{username}:</span> {points} puntos
            </p>
            <h2>Tus últimos resultados:</h2>
            {lastResults.map((result, index) => (
              <p key={index}>
                <span>{result.username}:</span> {result.points} puntos
              </p>
            ))}
            <button
              className="game-button"
              onClick={() => {
                setShowScoreModal(false);
                setPoints(0);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;

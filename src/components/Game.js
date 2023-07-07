import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import MoleGrid from './MoleGrid';

const Game = () => {
const { username } = useContext(UserContext);

  // Estado para mantener el puntaje actual del usuario
  const [points, setPoints] = useState(0);

  // Estado para mantener el nivel de dificultad actual
  const [difficulty, setDifficulty] = useState('low');

  // Estado para almacenar la posición actual del topo
  const [molePosition, setMolePosition] = useState(getRandomMolePosition());

  // Función para obtener una posición aleatoria para el topo
  function getRandomMolePosition() {
    return Math.floor(Math.random() * 9);
  }

  // Función para manejar el evento de golpear al topo
  function handleMoleWhack() {
    setPoints(points + getPointsPerMole());
    setMolePosition(getRandomMolePosition());
  }

  // Función para obtener puntos según el nivel de dificultad
  function getPointsPerMole() {
    switch(difficulty) {
      case 'medium':
        return 20;
      case 'high':
        return 30;
      default:
        return 10;
    }
  }

  // Función para manejar el cambio de dificultad
  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);
  }

  // Temporizador para mover el topo
  useEffect(() => {
    const difficultyToMs = {
      low: 1000,
      medium: 750,
      high: 500,
    };

    const timer = setInterval(() => {
      setMolePosition(getRandomMolePosition());
    }, difficultyToMs[difficulty]);

    return () => {
      clearInterval(timer);
    };
  }, [difficulty]);

  // Renderizamos la interfaz de la pantalla de juego
  return (
    <div>
      <h1>Hola, {username}</h1>
      <p>Puntos: {points}</p>
      <select value={difficulty} onChange={handleDifficultyChange}>
        <option value='low'>Bajo</option>
        <option value='medium'>Medio</option>
        <option value='high'>Alto</option>
      </select>
      <MoleGrid molePosition={molePosition} onMoleWhack={handleMoleWhack} />
    </div>
  );
}

export default Game;

// Importamos los componentes y librerías necesarios
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importamos los componentes Home y Game
import Home from './components/Home';
import Game from './components/Game';
// Creamos un Contexto para mantener y compartir el estado del nombre del usuario
export const UserContext = React.createContext();

const App = () => {
  // Estado para mantener el nombre del usuario
  const [username, setUsername] = useState('');

  // Función para actualizar el nombre del usuario
  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{ username, handleUsernameChange }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

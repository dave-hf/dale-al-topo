// Importamos los componentes y librerías necesarios
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Importamos los componentes Home y Game
import Home from "./components/Home";
import Game from "./components/Game";
// Creamos un Contexto para mantener y compartir el estado del nombre del usuario
export const UserContext = React.createContext();

const App = () => {
  // Estado para mantener el nombre del usuario
  const [username, setUsername] = useState("");

  // Función para actualizar el nombre del usuario
  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  // Utilizamos el hook useEffect para pre-cargar las imágenes
  useEffect(() => {
    const imagesToPreload = [
      "../assets/images/dale-al-topo-logo.png",
      "../assets/images/madrid.png",
      "../assets/images/tuberia.png",
      "../assets/images/topo.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Ajustamos el tamaño de la vista de forma dinámica
  useEffect(() => {
    function handleResize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);


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
};

export default App;

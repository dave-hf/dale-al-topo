import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import '../styles/Home.css';
import logoImage from '../assets/images/dale-al-topo-logo.png'; 


function Home() {
  const navigate = useNavigate();
  const { handleUsernameChange } = useContext(UserContext);

  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');


  const handleInputChange = (event) => {
    setUsername(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aqui vamos a validar que el nombre de usuario sea correcto, en este caso, que no este vacio
    if (username.trim() === '') {
      setError('Por favor, introduce un nombre de usuario.')
    } else {
      // Ahora el nombre de usuario en el contexto
      handleUsernameChange(username);
      
      // Y ya redirigimos a la pantalla del juego
      navigate('/game');
    }
  }

  return (
    <div className="form-container">
      <img src={logoImage} alt="Logo del juego" className="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Introduce tu nombre"
        />
        {error && <p className="error">{error}</p>}
        <button className="game-button" type="submit">Iniciar juego</button>
      </form>
    </div>
  );
}

export default Home;
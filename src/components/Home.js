import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const { handleUsernameChange } = useContext(UserContext);

  const [username, setUsername] = React.useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validamos que el nombre de usuario no esté vacío
    if (username.trim() !== '') {
      // Actualizamos el nombre de usuario en el context
      handleUsernameChange(username);
      // Redirigimos a la pantalla del juego
      navigate('/game');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        placeholder="Introduce tu nombre"
        required
      />
      <button type="submit">Iniciar juego</button>
    </form>
  );
}

export default Home;
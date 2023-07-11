import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, MemoryRouter } from 'react-router-dom';
import { UserContext } from '../App';
import '@testing-library/jest-dom/extend-expect';
import Home from '../components/Home';
import Game from '../components/Game';

test('Se renderiza el componente Home en la ruta base', () => {
  const history = createMemoryHistory();
  history.push('/');

  const handleUsernameChange = jest.fn(); // Mock de la función handleUsernameChange
  window.HTMLMediaElement.prototype.pause = jest.fn(); // Mock para fichero de audio
  const { getByText } = render(
    <UserContext.Provider value={{ handleUsernameChange }}>
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    </UserContext.Provider>
  );

  expect(getByText('Iniciar juego')).toBeInTheDocument();
});

test('Se renderiza el componente Game en la ruta /Game', () => {
  const handleUsernameChange = jest.fn(); // Mock de la función handleUsernameChange

  const { getByText } = render(
    <UserContext.Provider value={{ handleUsernameChange }}>
      <MemoryRouter initialEntries={['/game']}>
        <Game />
      </MemoryRouter>
    </UserContext.Provider>
  );

  expect(getByText('PLAY')).toBeInTheDocument();
});

test('Se renderiza el componente Home en una ruta aleatoria', () => {
  const history = createMemoryHistory();
  history.push('/random');

  const handleUsernameChange = jest.fn(); // Mock de la función handleUsernameChange
  window.HTMLMediaElement.prototype.pause = jest.fn(); // Mock para fichero de audio
  const { getByText } = render(
    <UserContext.Provider value={{ handleUsernameChange }}>
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    </UserContext.Provider>
  );

  expect(getByText('Iniciar juego')).toBeInTheDocument();
});
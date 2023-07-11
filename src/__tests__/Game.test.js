import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from '../App';
import Game from '../components/Game';

window.HTMLMediaElement.prototype.pause = jest.fn(); // Mock para fichero de audio

describe('Game component', () => {
  test('se renderiza correctamente', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ username: 'Usuario' }}>
        <Game />
      </UserContext.Provider>
    );

    expect(getByText('Usuario')).toBeInTheDocument();
    expect(getByText('Puntos:')).toBeInTheDocument();
    expect(getByText('Bajo')).toBeInTheDocument();
    expect(getByText('PLAY')).toBeInTheDocument();
  });

  test('maneja el cambio de dificultad', () => {
    const { getByText, getByDisplayValue } = render(
      <UserContext.Provider value={{ username: 'Usuario' }}>
        <Game />
      </UserContext.Provider>
    );

    const select = getByDisplayValue('Bajo');
    fireEvent.change(select, { target: { value: 'Medio' } });
    expect(getByText('Medio')).toBeInTheDocument();
  });

  test('maneja el evento click de PLAY/STOP', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ username: 'Usuario' }}>
        <Game />
      </UserContext.Provider>
    );

    const button = getByText('PLAY');
    fireEvent.click(button);
    expect(getByText('STOP')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from '../App';
import Home from '../components/Home';

describe('Home component', () => {
  test('Comprobar que la página inicial del Home se renderiza correctamente', () => {
    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={{ username: '', handleUsernameChange: jest.fn() }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );
    expect(getByPlaceholderText('Introduce tu nombre')).toBeInTheDocument();
    expect(getByText('Iniciar juego')).toBeInTheDocument();
  });

  test('Permite a los usuarios ingresar un nombre de usuario', () => {
    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ username: '', handleUsernameChange: jest.fn() }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );
    const input = getByPlaceholderText('Introduce tu nombre');
    fireEvent.change(input, { target: { value: 'Jugador' } });
    expect(input.value).toBe('Jugador');
  });

  test('Llama a handleUsernameChange cuando se hace clic en el botón de inicio del juego', () => {
    const handleUsernameChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <UserContext.Provider value={{ username: 'Test', handleUsernameChange }}>
      <Router>
        <Home />
      </Router>
      </UserContext.Provider>
    );
  
    const input = getByPlaceholderText('Introduce tu nombre');
    const button = getByText('Iniciar juego');
  
    // Simula el ingreso del nombre de usuario antes de hacer clic en el botón
    fireEvent.change(input, { target: { value: 'Jugador' } });
    
    fireEvent.click(button);
  
    expect(handleUsernameChange).toHaveBeenCalledWith('Jugador');
    expect(handleUsernameChange).toHaveBeenCalledTimes(1);
  });
  
});

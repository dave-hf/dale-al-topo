import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MoleGrid from '../components/MoleGrid';

describe('MoleGrid component', () => {
  test('se renderiza correctamente con topos', () => {
    const { getAllByRole } = render(<MoleGrid molePositions={[1, 2]} />);

    const cells = getAllByRole('button');
    expect(cells.length).toBe(9);
    expect(cells[1].className).toBe('mole');
    expect(cells[2].className).toBe('mole');
  });

  test('maneja el evento click del topo', () => {
    const handleMoleWhack = jest.fn();

    const { getAllByRole } = render(
      <MoleGrid molePositions={[1, 2]} onMoleWhack={handleMoleWhack} />
    );

    const cells = getAllByRole('button');
    fireEvent.click(cells[1]);
    expect(handleMoleWhack).toHaveBeenCalledTimes(1);
  });
});

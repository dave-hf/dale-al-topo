import React from 'react';

const MoleGrid = ({ molePosition, onMoleWhack }) => {
  // Creamos un array de 9 elementos para representar la cuadrícula de juego
  const grid = Array.from({length: 9});

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '10px'
  };

  return (
    <div style={gridStyle}>
      {grid.map((_, index) => {
        // Si el índice coincide con la posición del topo, mostramos un topo
        if (index === molePosition) {
          return (
            <button key={index} onClick={onMoleWhack}>
              Topo!
            </button>
          );
        } else {
          // Si no, mostramos un cuadro vacío
          return <button key={index} disabled>Empty</button>;
        }
      })}
    </div>
  );
}

export default MoleGrid;
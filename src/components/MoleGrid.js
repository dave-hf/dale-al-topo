import "../styles/MoleGrid.css";

const MoleGrid = ({ molePositions, onMoleWhack }) => {
  // Creamos un array de 9 elementos para representar la cuadrícula de juego
  const grid = Array.from({ length: 9 });

  return (
    <div className="moleGrid">
      {grid.map((_, index) => (
        <div className="cell" key={index}>
          <button
            className={molePositions.includes(index) ? "mole" : "pipe"}
            onClick={molePositions.includes(index) ? onMoleWhack : null}
          />
        </div>
      ))}
    </div>
  );
};

export default MoleGrid;

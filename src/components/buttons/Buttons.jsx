import PropTypes from "prop-types";
import "../../assets/styles/buttons/buttons.css";

export default function Buttons({ nextPage, previowsPage, actualPage }) {
  Buttons.propTypes = {
    nextPage: PropTypes.func,
    previowsPage: PropTypes.func,
    actualPage: PropTypes.number,
  };

  return (
    <div className="container">
        <button onClick={previowsPage}>{"<<"} Página Anterior</button>
        <span>Página: {actualPage}</span>
        <button onClick={nextPage}>Próx Página {">>"}</button>
    </div>
  );
}

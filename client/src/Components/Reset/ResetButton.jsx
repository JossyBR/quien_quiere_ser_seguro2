import { button } from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaRedoAlt } from "react-icons/fa";
import { resetJuego } from "../../features/preguntas/preguntasSlice";

const ResetButton = ({ handleReset }) => {
  const dispatch = useDispatch();

  const reiniciarJuego = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se reiniciara todo el progreso del juego",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, reiniciar",
      confirmButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetJuego());
        handleReset();
        Swal.fire("Reiniciado!", "El juego ha sido reiniciado.", "success");
      }
    });
  };

  return (
    <button onClick={reiniciarJuego} className="font-bold rounded">
      <FaRedoAlt className="h-5 w-5 ml-2" />
    </button>
  );
};

export default ResetButton;

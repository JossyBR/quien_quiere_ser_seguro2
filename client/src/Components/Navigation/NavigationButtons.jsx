// src/components/NavigationButtons/NavigationButtons.js
import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const NavigationButtons = ({
  currentPreguntaIndex,
  setCurrentPreguntaIndex,
  respondidas,
  setRespondidas,
  tiemposRestantes,
  setTiemposRestantes,
  temporizadorRef,
  preguntas,
  setAyuda,
}) => {
  const guardarTiempoRestante = (index) => {
    if (temporizadorRef.current) {
      setTiemposRestantes((prevTiempos) => ({
        ...prevTiempos,
        [index]: temporizadorRef.current.timeLeft,
      }));
    }
  };

  const handleNext = () => {
    if (
      !respondidas[currentPreguntaIndex] &&
      !temporizadorRef.current.isTimeOut
    ) {
      Swal.fire({
        icon: "warning",
        title: "No has respondido",
        text: "Debes responder la pregunta",
      });
      return;
    }
    guardarTiempoRestante(currentPreguntaIndex);
    setCurrentPreguntaIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < preguntas.length) {
        setAyuda(false);
        temporizadorRef.current.handleReset(tiemposRestantes[newIndex] || 30);
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handlePrevious = () => {
    guardarTiempoRestante(currentPreguntaIndex);
    const newIndex = currentPreguntaIndex - 1;
    if (newIndex >= 0) {
      setCurrentPreguntaIndex(newIndex);
      if (respondidas[newIndex]) {
        temporizadorRef.current.handleStop(tiemposRestantes[newIndex]);
      } else {
        temporizadorRef.current.handleReset(tiemposRestantes[newIndex] || 30);
      }
    }
  };

  return (
    <div className="flex justify-center mt-24 ">
      <button
        onClick={handlePrevious}
        className="border-2 font-bold h-10 px-4 rounded-xl mr-5"
      >
        Anterior
      </button>
      <button
        onClick={handleNext}
        className="border-2 font-bold h-10 px-4 rounded-xl mr-2 hover:scale-105"
      >
        Siguiente
      </button>
    </div>
  );
};

NavigationButtons.propTypes = {
  currentPreguntaIndex: PropTypes.number.isRequired,
  setCurrentPreguntaIndex: PropTypes.func.isRequired,
  respondidas: PropTypes.array.isRequired,
  setRespondidas: PropTypes.func.isRequired,
  tiemposRestantes: PropTypes.object.isRequired,
  setTiemposRestantes: PropTypes.func.isRequired,
  temporizadorRef: PropTypes.object.isRequired,
  preguntas: PropTypes.array.isRequired,
  setAyuda: PropTypes.func.isRequired,
};

// export default NavigationButtons;

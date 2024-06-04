import React, { useEffect, useState, useRef } from "react";

const Temporizador = ({ onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(30); //Estado para el tiempo restatante
  const timerRef = useRef(null); //Referencia para el temporizador
  const [isPaused, setIsPaused] = useState(false); // Estado para determinar si el temporizador está pausado

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1); //Decrementa el tiempo cada segundo
      }, 1000);
    } else if (timeLeft === 0) {
      onTimeOut(); // Llama a la función de tiempo agotado pasada desde el componente padre
    }

    return () => clearTimeout(timerRef.current); // Limpia el temporizador cuando el componente se desmonta o el estado cambia
  }, [timeLeft, onTimeOut, isPaused]);

  //Función para pausar el temporizador
  const handlePause = () => {
    setIsPaused(true);
  };

  //Funcion para renudar el temporizador
  const handleResume = () => {
    setIsPaused(false);
  };

  //Funcion para reiniciar el temporizador
  const handleReset = () => {
    setTimeLeft(30); //Resetea el tiempo a 30seg
    setIsPaused(false); //Asegura que el temporizador no este pausado
  };

  //Para reiniciar el temporizador cuando el componente se monta
  useEffect(() => {
    handleReset();
  }, []);

  //Para detener el temporizador cuando esta pausado
  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current);
    }
  }, [isPaused]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{timeLeft}s</div>
      <div>
        <button onClick={handlePause} className="border-2 px-4 py-2">
          Pausar
        </button>
        <button onClick={handleResume} className="border-2 px-4 py-2">
          Reanudar
        </button>
      </div>
    </div>
  );
};

export default Temporizador;

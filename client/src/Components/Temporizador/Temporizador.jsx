import React, { useEffect, useState, useRef } from "react";

const Temporizador = ({ onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(30); //Estado para el tiempo restatante
  const timerRef = useRef(null); //Referencia ara el temporizador

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1); //Decrementa el tiempo cada segundo
      }, 1000);
    } else {
      onTimeOut(); // Llama a la función de tiempo agotado pasada desde el componente padre
    }

    return () => clearTimeout(timerRef.current); // Limpia el temporizador cuando el componente se desmonta o el estado cambia
  }, [timeLeft, onTimeOut]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{timeLeft}s</div>
    </div>
  );
};

export default Temporizador;

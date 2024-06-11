// import React, {
//   useEffect,
//   useState,
//   useRef,
//   forwardRef,
//   useImperativeHandle,
// } from "react";

// const Temporizador = forwardRef(({ onTimeOut }, ref) => {
//   const [timeLeft, setTimeLeft] = useState(30); //Estado para el tiempo restatante
//   const timerRef = useRef(null); //Referencia para el temporizador
//   const [isPaused, setIsPaused] = useState(false); // Estado para determinar si el temporizador está pausado

//   useEffect(() => {
//     if (!isPaused && timeLeft > 0) {
//       timerRef.current = setTimeout(() => {
//         setTimeLeft(timeLeft - 1); //Decrementa el tiempo cada segundo
//       }, 1000);
//     } else if (timeLeft === 0) {
//       onTimeOut(); // Llama a la función de tiempo agotado pasada desde el componente padre
//     }

//     return () => clearTimeout(timerRef.current); // Limpia el temporizador cuando el componente se desmonta o el estado cambia
//   }, [timeLeft, isPaused, onTimeOut]);

//   //Función para pausar el temporizador
//   const handlePause = () => {
//     setIsPaused(true);
//   };

//   //Funcion para renudar el temporizador
//   const handleResume = () => {
//     setIsPaused(false);
//   };

//   //Funcion para reiniciar el temporizador
//   const handleReset = () => {
//     setTimeLeft(30); //Resetea el tiempo a 30seg
//     setIsPaused(false); //Asegura que el temporizador no este pausado
//   };

//   //Funcion para detener el temporizador al responder una pregunta
//   const handleStop = () => {
//     clearTimeout(timerRef.current);
//     setTimeLeft(true); //Pausar el temporizador sin resetaer a cero
//   };

//   //Para reiniciar el temporizador cuando el componente se monta
//   useEffect(() => {
//     handleReset();
//   }, []);

//   //Para detener el temporizador cuando esta pausado
//   useEffect(() => {
//     if (isPaused) {
//       clearTimeout(timerRef.current);
//     }
//   }, [isPaused]);

//   //Exponer funciones para el componente pader usando useImperativeHandle

//   useImperativeHandle(ref, () => ({
//     handlePause,
//     handleResume,
//     handleStop,
//     handleReset,
//   }));

//   return (
//     <div className="flex flex-col items-center">
//       <div className="text-2xl">{timeLeft}s</div>
//       <div>
//         <button onClick={handlePause} className="border-2 px-4 py-2">
//           Pausar
//         </button>
//         <button onClick={handleResume} className="border-2 px-4 py-2">
//           Reanudar
//         </button>
//       </div>
//     </div>
//   );
// });

// export default Temporizador;

// import React, {
//   useEffect,
//   useState,
//   useRef,
//   forwardRef,
//   useImperativeHandle,
// } from "react";

// const Temporizador = forwardRef(({ onTimeOut }, ref) => {
//   const [timeLeft, setTimeLeft] = useState(30); // Estado para el tiempo restante
//   const timerRef = useRef(null); // Referencia para el temporizador
//   const [isPaused, setIsPaused] = useState(false); // Estado para determinar si el temporizador está pausado
//   const [isTimeOut, setIsTimeOut] = useState(false); //Estado para determinar si el tiempo se ha agotado

//   useEffect(() => {
//     if (!isPaused && timeLeft > 0) {
//       timerRef.current = setTimeout(() => {
//         setTimeLeft(timeLeft - 1); // Decrementa el tiempo cada segundo
//       }, 1000);
//     } else if (timeLeft === 0) {
//       setIsTimeOut(true); //Marca el tiempo como agotado
//       onTimeOut(); // Llama a la función de tiempo agotado pasada desde el componente padre
//     }

//     return () => clearTimeout(timerRef.current); // Limpia el temporizador cuando el componente se desmonta o el estado cambia
//   }, [timeLeft, isPaused, onTimeOut]);

//   // Función para pausar el temporizador
//   const handlePause = () => {
//     setIsPaused(true);
//   };

//   // Función para reanudar el temporizador
//   const handleResume = () => {
//     setIsPaused(false);
//   };

//   // Función para reiniciar el temporizador
//   const handleReset = (tiempo = 30) => {
//     setTimeLeft(tiempo); // Resetea el tiempo a 30 segundos
//     setIsPaused(false); // Asegura que el temporizador no esté pausado
//     setIsTimeOut(false); // Resetea la bandera de tiempo agotado
//   };

//   // Función para detener el temporizador al responder una pregunta
//   const handleStop = () => {
//     clearTimeout(timerRef.current);
//     setIsPaused(true); // Pausar el temporizador sin resetear a cero
//   };

//   // Para reiniciar el temporizador cuando el componente se monta
//   useEffect(() => {
//     handleReset();
//   }, []);

//   // Para detener el temporizador cuando está pausado
//   useEffect(() => {
//     if (isPaused) {
//       clearTimeout(timerRef.current);
//     }
//   }, [isPaused]);

//   // Exponer funciones para el componente padre usando useImperativeHandle
//   useImperativeHandle(ref, () => ({
//     handlePause,
//     handleResume,
//     handleStop,
//     handleReset,
//     isTimeOut,
//     timeLeft,
//   }));

//   return (
//     <div className="flex flex-col items-center">
//       <div className="text-2xl">{timeLeft}s</div>
//       <div className="flex gap-2 mt-2">
//         <button onClick={handlePause} className="border-2 px-4 py-2">
//           Pausar
//         </button>
//         <button onClick={handleResume} className="border-2 px-4 py-2">
//           Reanudar
//         </button>
//       </div>
//     </div>
//   );
// });

// export default Temporizador;

import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Temporizador = forwardRef(({ onTimeOut }, ref) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimeOut(true);
      onTimeOut();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isPaused, onTimeOut]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = (tiempo = 30) => {
    setTimeLeft(tiempo);
    setIsPaused(false);
    setIsTimeOut(false);
  };

  const handleStop = () => {
    clearTimeout(timerRef.current);
    setIsPaused(true);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current);
    }
  }, [isPaused]);

  useImperativeHandle(ref, () => ({
    handlePause,
    handleResume,
    handleStop,
    handleReset,
    isTimeOut,
    timeLeft,
  }));

  return (
    <div className="bg-[#0D0D0D] flex flex-col items-center justify-center ">
      <div className="text-lg mb-2 text-white">{timeLeft}s</div>
      <div className="flex">
        <button onClick={handlePause} className="">
          <FaPause className="bg-white" />
        </button>
        <button onClick={handleResume} className="bg-white">
          <FaPlay />
        </button>
      </div>
    </div>
  );
});

export default Temporizador;

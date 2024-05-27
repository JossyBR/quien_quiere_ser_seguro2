import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomCard from "../../Components/Card/CustomCard";
import { loadPreguntas } from "../../features/preguntas/preguntasSlice";
import {
  incrementarPuntaje,
  incrementarNivel,
  chequearProgresoNivel,
} from "../../utils/utils";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
// import { BsHourglassSplit } from "react-icons/bs";
// import {
//   FaRegPlayCircle,
//   FaRegStopCircle,
//   FaRedoAlt,
//   FaEye,
// } from "react-icons/fa";
// import { MdSportsScore } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const preguntas = useSelector((state) => state.preguntas.preguntas);
  //Mantener el indice de la pregunta actual
  const [currentPreguntaIndex, setCurrentPreguntaIndex] = useState(0);

  const [puntaje, setPuntaje] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [ayuda, setAyuda] = useState(false);

  console.log("soy el nivel:", nivel);
  console.log("soy puntaje: ", puntaje);
  console.log("soy respuestascorrectas:", respuestasCorrectas);

  //Se deben obtener las preguntas del back.
  useEffect(() => {
    dispatch(loadPreguntas());
  }, [dispatch]);

  useEffect(() => {
    console.log("Preguntas cargadas: ", preguntas);
  }, [preguntas]);

  const handleNext = () => {
    setCurrentPreguntaIndex((prevIndex) => {
      // Incrementa el índice de la pregunta actual
      const newIndex = prevIndex + 1;

      // Resetea la ayuda cuando se cambia la pregunta
      setAyuda(false);

      // Si el nuevo índice es menor que el número total de preguntas, se actualiza el índice
      // Si no, se mantiene el índice actual (no se incrementa más allá del último índice)
      return newIndex < preguntas.length ? newIndex : prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentPreguntaIndex((prevIndex) => {
      // Decrementa el índice de la pregunta actual
      const newIndex = prevIndex - 1;
      
      // Resetea la ayuda cuando se cambia la pregunta
      setAyuda(false);

      // Si el nuevo índice es mayor o igual a 0, se actualiza el índice
      // Si no, se mantiene el índice actual (no se decrementa más allá del primer índice)
      return newIndex >= 0 ? newIndex : prevIndex;
    });
  };

  const manejarRespuestaCorrecta = () => {
    // Incrementar el puntaje actual en 100 puntos
    setPuntaje((prevPuntaje) => incrementarPuntaje(prevPuntaje));
    // Actualizar el número de respuestas correctas
    setRespuestasCorrectas((prevRespuestasCorrectas) => {
      const nuevasRespuestasCorrectas = prevRespuestasCorrectas + 1;

      //Verifica si el usuario he respondido a tres preguntas correctas en el nivel actual
      if (chequearProgresoNivel(nuevasRespuestasCorrectas)) {
        // Calcula el nuevo nivel antes de actualizar el estado
        const nuevoNivel = incrementarNivel(nivel);
        Swal.fire({
          icon: "Sucess",
          title: "¡Siguiente Nivel",
          text: `Has pasado al siguiente nivel: ${nuevoNivel}`,
        });
        // Actualizar el estado del nivel al nuevo nivel
        setNivel((prevNivel) => incrementarNivel(prevNivel));
        return 0; // Reiniciar el contador de respuestas correctas para el nuevo nivel
      }
      // Si no ha respondido correctamente a tres preguntas, simplemente retornar el nuevo número de respuestas correctas
      return nuevasRespuestasCorrectas;
    });
  };

  const manejarAyuda = () => {
    setAyuda(true);
  };

  return (
    <div className={` text-black min-h-screen p-8`}>
      <h1 className="text-xl text-center md:text-4xl font-bold mb-4">
        ¿QUIEN QUIERE SER SEGURO?
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Link to="/admin">CRUD</Link>
        </div>
        <div>
          <button
            // onClick={reiniciarJuego}
            // onClick={manejarReiniciarJuego}
            className="font-bold py-2 px-4 rounded mr-2"
          >
            Reiniciar
            {/* <FaRedoAlt className="h-5 w-5" /> */}
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <div>
          <button
            onClick={manejarAyuda}
            className="border-2 rounded-full font-bold px-2 "
          >
            50/50
          </button>
        </div>

        <div
          id="temporizador"
          className="flex flex-col justify-center gap-2 items-center text-base text-center mb-2 lg:text-2xl"
        >
          <div>
            <p>Temporizador</p>
            {/* <Temporizador /> */}
          </div>
        </div>
      </div>{" "}
      <br />
      <div className="flex gap-1 mt-4">
        {/* <MdSportsScore className="h-7 w-7" /> */}
        <p className="text-base">
          Nivel Actual: <span className="font-bold text-lg">{nivel}</span>
        </p>
      </div>
      <div className="border mt-2">
        <h1 className="text-xl text-center md:text-4xl font-bold mb-4">
          ¿LOGO?
        </h1>
      </div>
      <div className="border flex items-center">{/* //temporizador */}</div>
      <div className="flex gap-1 mt-4">
        {/* <MdSportsScore className="h-7 w-7" /> */}
        <p className="text-base">
          Puntaje actual:
          <span className="font-bold text-lg">{puntaje}</span>
        </p>
      </div>
      <div className={`flex justify-center`}>
        <div>
          <div>
            {preguntas.length > 0 && (
              <CustomCard
                preguntaIndex={currentPreguntaIndex}
                manejarRespuestaCorrecta={manejarRespuestaCorrecta}
                ayuda={ayuda}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={handlePrevious}
          className="border-2  font-bold h-10 px-4  rounded-xl"
        >
          Anterior
        </button>

        {/* Si indiceactual es menor que totalpreguntas quiere decir que hay mas preguntas despues de la actual se resta 1 de $totalPreguntas para ajustar el hecho de que los índices comienzan en 0 */}

        <button
          onClick={handleNext}
          className="border-2   font-bold h-10 px-4 rounded-xl mr-2 hover:scale-105"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;

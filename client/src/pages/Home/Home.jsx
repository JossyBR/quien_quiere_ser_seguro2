import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomCard from "../../Components/Card/CustomCard";
import Temporizador from "../../Components/Temporizador/Temporizador";
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
  const [respondidas, setRespondidas] = useState([]); //Para rastraer si una pregunta ha sido respondida
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const temporizadorRef = useRef(null); //Referencia para el temporizador

  console.log("soy el nivel:", nivel);
  console.log("soy puntaje: ", puntaje);
  console.log("soy respuestascorrectas:", respuestasCorrectas);

  // Cargar las preguntas desde el backend al montar el componente atraves del loadPPreguntas().
  useEffect(() => {
    dispatch(loadPreguntas());
  }, [dispatch]);

  useEffect(() => {
    console.log("Preguntas cargadas: ", preguntas);
  }, [preguntas]);

  //Primero verifica si la pregunta actual ha sido respondida antes de permitir avanzar
  const handleNext = () => {
    if (!respondidas[currentPreguntaIndex]) {
      Swal.fire({
        icon: "warning",
        title: "No has respondido",
        text: "Debes responder la pregunta",
      });
      return;
    }
    setCurrentPreguntaIndex((prevIndex) => {
      // Incrementa el índice de la pregunta actual
      const newIndex = prevIndex + 1;
      if (newIndex < preguntas.length) {
        setAyuda(false); //Resetea la ayuda cuando se cambia a la pregunta
        return newIndex;
      }
      return prevIndex; //No avanza mas alla del ultimo indice
    });
  };

  //Maneja el retroceso de la pregunta anterior
  const handlePrevious = () => {
    const newIndex = currentPreguntaIndex - 1;
    if (newIndex >= 0) {
      setCurrentPreguntaIndex(newIndex);
    }
  };

  //Se llama cuando se selecciona una respuesta y asi determinar si es correcta o incorrecta y actualiza el estado de respondidas.
  const manejarRespuesta = (esCorrecta, respuestaTexto) => {
    if (respondidas[currentPreguntaIndex]) {
      Swal.fire({
        icon: "warning",
        title: "Pregunta ya respondida",
        text: "No puedes cambiar la respuesta.",
      });
      return;
    }

    const preguntaActual = preguntas[currentPreguntaIndex];
    const respuestaCorrecta = preguntaActual.respuesta_correcta;

    if (esCorrecta) {
      Swal.fire({
        icon: "Success",
        title: "Respuesta Correcta",
        text: "Tu respuesta es correcta",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Incorrecto!",
        text: "Has seleccionado la respuesta incorrecta",
      }).then(() => {
        // Marcar la respuesta correcta
        setRespuestasSeleccionadas((prevRespuestas) => {
          const nuevasRespuestas = [...prevRespuestas];
          nuevasRespuestas[currentPreguntaIndex] = {
            texto: respuestaTexto,
            esCorrecta: false,
          };
          nuevasRespuestas.push({
            texto: respuestaCorrecta,
            esCorrecta: true,
          });
          return nuevasRespuestas;
        });
      });
    }

    //Conteo para subir de nivel
    if (esCorrecta) {
      setPuntaje((prevPuntaje) => incrementarPuntaje(prevPuntaje));
      setRespuestasCorrectas((prevRespuestasCorrectas) => {
        const nuevasRespuestasCorrectas = prevRespuestasCorrectas + 1;
        if (chequearProgresoNivel(nuevasRespuestasCorrectas)) {
          const nuevoNivel = incrementarNivel(nivel);
          Swal.fire({
            icon: "success",
            title: "¡Siguiente Nivel!",
            text: `Has pasado al siguiente nivel: ${nuevoNivel}`,
          });
          setNivel(nuevoNivel);
          return 0;
        }
        return nuevasRespuestasCorrectas;
      });
    }

    //Marcar la pregunta actual como respondida
    setRespondidas((prevRespondidas) => {
      const nuevasRespondidas = [...prevRespondidas];
      nuevasRespondidas[currentPreguntaIndex] = true;
      return nuevasRespondidas;
    });

    //Almacenar la respuesta seleccionada y si fue correcta
    setRespuestasSeleccionadas((prevRespuestas) => {
      const nuevasRespuestas = [...prevRespuestas];
      nuevasRespuestas[currentPreguntaIndex] = {
        texto: respuestaTexto,
        esCorrecta: esCorrecta,
      };
      return nuevasRespuestas;
    });

    //Dejo esta funcionalidad or si mas adelante quiero utilizarla
    //Avanzar automaticamente a la siguiente pregunta
    // setCurrentPreguntaIndex((prevIndex) => {
    //   const newIndex = prevIndex + 1;
    //   setAyuda(false); //Resetea la ayuda cuando se cambia a la pregunta
    //   return newIndex < preguntas.length ? newIndex : prevIndex;
    // });
  };

  const manejarAyuda = () => {
    setAyuda(true);
  };

  //Funcion para manejar el tiempo agotado
  const handleTimeOut = () => {
    Swal.fire({
      icon: "error",
      title: "¡Tiempo terminado!",
      text: "Se ha acabado el tiempo para responder la pregunta.",
    });
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
            <Temporizador ref={temporizadorRef} onTimeOut={handleTimeOut} />
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
                manejarRespuesta={manejarRespuesta}
                ayuda={ayuda}
                respondida={respondidas[currentPreguntaIndex]}
                respuestasSeleccionadas={respuestasSeleccionadas}
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

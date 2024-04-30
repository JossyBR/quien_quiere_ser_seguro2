import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BsHourglassSplit } from "react-icons/bs";
// import {
//   FaRegPlayCircle,
//   FaRegStopCircle,
//   FaRedoAlt,
//   FaEye,
// } from "react-icons/fa";
// import { MdSportsScore } from "react-icons/md";

const Preguntas = (
  {
    // preguntaActual,
    // indiceActual,
    // totalPreguntas,
    // puntaje,
  }
) => {
  return (
    <div className={` text-white min-h-screen p-8`}>
      <h1 className="text-xl text-center md:text-4xl font-bold mb-4">
        ¿QUIEN QUIERE SER SEGURO?
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Link
            className="flex items-center gap-1 font-bold"
            rel="stylesheet"
            to="/crear"
          >
            {" "}
            CRUD
            {/* <FaEye className="h-4 w-4" /> Preguntas{" "} */}
          </Link>
        </div>
        <div>
          <button
            // onClick={reiniciarJuego}
            // onClick={manejarReiniciarJuego}
            className=" text-white font-bold py-2 px-4 rounded mr-2"
          >
            Reiniciar
            {/* <FaRedoAlt className="h-5 w-5" /> */}
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <div>
          <button
            // onClick={manejarAyudaCincuenta}
            className="border-2 rounded-full text-white font-bold px-2 "
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
          Nivel Actual: <span className="font-bold text-lg">xxx</span>
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
          {/* Puntaje actual:{" "} */}

          <span className="font-bold text-lg">Puntaje</span>
        </p>
      </div>
      <div className={`flex justify-center`}>
        <div>
          <h2 className="text-lg font-bold mb-4 text-center">pregunta</h2>
        </div>
      </div>
      <div className={`flex flex-col items-center `}>mostrar preguntas</div>
      <div className="flex justify-center mt-2">
        <button className="border-2 text-white font-bold h-10 px-4  rounded-xl">
          Anterior
        </button>

        {/* Si indiceactual es menor que totalpreguntas quiere decir que hay mas preguntas despues de la actual se resta 1 de $totalPreguntas para ajustar el hecho de que los índices comienzan en 0 */}

        <button className="border-2  text-white font-bold h-10 px-4 rounded-xl mr-2 hover:scale-105">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Preguntas;

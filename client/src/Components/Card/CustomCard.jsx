import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  useSelect,
} from "@nextui-org/react";
import { validarRespuesta } from "../../utils/utils";
import Swal from "sweetalert2";

const CustomCard = ({ preguntaIndex }) => {
  const preguntas = useSelector((state) => state.preguntas.preguntas);
  const pregunta = preguntas[preguntaIndex];
  const [selectRespuesta, setSelectRespuesta] = useState(null);

  useEffect(() => {
    // Resetear selectRespuesta cuando cambia la pregunta
    setSelectRespuesta(null);
  }, [preguntaIndex]);

  const handleResCorrecta = (respuesta) => {
    const esCorrecta = validarRespuesta(respuesta, pregunta.respuesta_correcta);
    setSelectRespuesta(respuesta);

    if (selectRespuesta !== null) {
      return;
    }

    if (esCorrecta) {
      Swal.fire({
        icon: "success",
        title: "¡Correcto",
        text: "Has seleccionado la respuesta correcta",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Incorrecto",
        text: "Has seleccionado la respuesta incorrecta",
      });
    }
  };

  return (
    <div>
      <h1>Yo soy la card</h1>
      {pregunta ? (
        <div>
          <p>{pregunta.preguntas}</p>
          <div
            onClick={() => handleResCorrecta(pregunta.respuesta1)}
            style={{
              backgroundColor:
                selectRespuesta === pregunta.respuesta1
                  ? validarRespuesta(
                      pregunta.respuesta1,
                      pregunta.respuesta_correcta
                    )
                    ? "green"
                    : "red"
                  : "transparent",
              pointerEvents: selectRespuesta !== null ? "none" : "auto",
            }}
          >
            {pregunta.respuesta1}
          </div>
          <div
            onClick={() => handleResCorrecta(pregunta.respuesta2)}
            style={{
              backgroundColor:
                selectRespuesta === pregunta.respuesta2
                  ? validarRespuesta(
                      pregunta.respuesta2,
                      pregunta.respuesta_correcta
                    )
                    ? "green"
                    : "red"
                  : "transparent",
              pointerEvents: selectRespuesta !== null ? "none" : "auto",
            }}
          >
            {pregunta.respuesta2}
          </div>
          <div
            onClick={() => handleResCorrecta(pregunta.respuesta3)}
            style={{
              backgroundColor:
                selectRespuesta === pregunta.respuesta3
                  ? validarRespuesta(
                      pregunta.respuesta3,
                      pregunta.respuesta_correcta
                    )
                    ? "green"
                    : "red"
                  : "transparent",
              pointerEvents: selectRespuesta !== null ? "none" : "auto",
            }}
          >
            {pregunta.respuesta3}
          </div>
          <div
            onClick={() => handleResCorrecta(pregunta.respuesta4)}
            style={{
              backgroundColor:
                selectRespuesta === pregunta.respuesta4
                  ? validarRespuesta(
                      pregunta.respuesta4,
                      pregunta.respuesta_correcta
                    )
                    ? "green"
                    : "red"
                  : "transparent",
              pointerEvents: selectRespuesta !== null ? "none" : "auto",
            }}
          >
            {pregunta.respuesta4}
          </div>
          <p>{pregunta.respuesta_correcta}</p>
        </div>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
      {/* <div>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2"></CardBody>
        </Card>
      </div> */}
    </div>
  );
};

export default CustomCard;

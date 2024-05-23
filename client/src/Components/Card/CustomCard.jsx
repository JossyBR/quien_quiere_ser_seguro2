import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  useSelect,
} from "@nextui-org/react";

const CustomCard = ({ preguntaIndex }) => {
  const preguntas = useSelector((state) => state.preguntas.preguntas);
  const pregunta = preguntas[preguntaIndex];
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Este es el preguntaIndex: ", preguntaIndex);
    console.log("pregunta: ", pregunta);
  }, [preguntaIndex, pregunta]);

  return (
    <div>
      <h1>Yo soy la card</h1>
      {pregunta ? (
        <div>
          <p>{pregunta.preguntas}</p>
          <boton>{pregunta.respuesta1}</boton>
          <boton className="ml-2">{pregunta.respuesta2}</boton>
          <boton className="ml-2">{pregunta.respuesta3}</boton>
          <boton className="ml-2">{pregunta.respuesta4}</boton>
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

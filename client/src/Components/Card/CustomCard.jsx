import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from "@nextui-org/react";
import Swal from "sweetalert2";
import { validarRespuesta } from "../../utils/utils";

const CustomCard = ({ preguntaIndex, manejarRespuestaCorrecta, ayuda }) => {
  const preguntas = useSelector((state) => state.preguntas.preguntas);
  const pregunta = preguntas[preguntaIndex];
  const [selectRespuesta, setSelectRespuesta] = useState(null);
  const [respuestasMostrar, setRespuestasMostrar] = useState([]);

  useEffect(() => {
    // Resetear selectRespuesta cuando cambia la pregunta
    setSelectRespuesta(null);
    if (pregunta) {
      const respuestas = [
        {
          texto: pregunta.respuesta1,
          esCorrecta: validarRespuesta(
            pregunta.respuesta1,
            pregunta.respuesta_correcta
          ),
        },
        {
          texto: pregunta.respuesta2,
          esCorrecta: validarRespuesta(
            pregunta.respuesta2,
            pregunta.respuesta_correcta
          ),
        },
        {
          texto: pregunta.respuesta3,
          esCorrecta: validarRespuesta(
            pregunta.respuesta3,
            pregunta.respuesta_correcta
          ),
        },
        {
          texto: pregunta.respuesta4,
          esCorrecta: validarRespuesta(
            pregunta.respuesta4,
            pregunta.respuesta_correcta
          ),
        },
      ];

      if (ayuda && preguntaIndex === preguntas.indexOf(pregunta)) {
        const respuestasFiltradas = [
          respuestas.find((respuesta) => respuesta.esCorrecta),
          // respuestas.find((respuesta) => !respuesta.esCorrecta),
          ...respuestas
            .filter((respuesta) => !respuesta.esCorrecta)
            .slice(0, 1),
        ];
        setRespuestasMostrar(respuestasFiltradas);
      } else {
        setRespuestasMostrar(respuestas);
      }
    }
  }, [preguntaIndex, pregunta, ayuda, preguntas]);

  const handleResCorrecta = (respuesta) => {
    // Si ya se ha seleccionado una respuesta, no hacer nada
    if (selectRespuesta !== null) {
      return;
    }

    const esCorrecta = validarRespuesta(
      respuesta.texto,
      pregunta.respuesta_correcta
    );
    setSelectRespuesta(respuesta.texto);

    if (esCorrecta) {
      manejarRespuestaCorrecta();
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
        text: "Has seleccionado la respuesta correcta",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Incorrecto!",
        text: "Has seleccionado la respuesta incorrecta",
      });
    }
  };

  // Esta función genera la tarjeta con la validación y estilos para seleccionar una respuesta
  const renderRespuesta = (respuesta) => (
    <div className="flex flex-row" key={respuesta.texto}>
      <Card
        className="w-48 h-48"
        isPressable
        onClick={() => handleResCorrecta(respuesta)}
        css={{
          backgroundColor:
            selectRespuesta === respuesta.texto
              ? validarRespuesta(respuesta.texto, pregunta.respuesta_correcta)
                ? "green"
                : "red"
              : "white",
          pointerEvents: selectRespuesta !== null ? "none" : "auto",
        }}
      >
        <CardBody>{respuesta.texto}</CardBody>
      </Card>
    </div>
  );

  return (
    <div>
      {pregunta ? (
        <div className="flex flex-col items-center">
          <p>{pregunta.preguntas}</p>
          <div className="flex flex-row gap-4">
            {respuestasMostrar.map(renderRespuesta)}
          </div>
        </div>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
};

export default CustomCard;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Card, CardHeader, CardBody } from "@nextui-org/react";
// import Swal from "sweetalert2";
// import { validarRespuesta } from "../../utils/utils";

// const CustomCard = ({ preguntaIndex, manejarRespuestaCorrecta, ayuda }) => {
//   const preguntas = useSelector((state) => state.preguntas.preguntas);
//   const pregunta = preguntas[preguntaIndex];
//   const [selectRespuesta, setSelectRespuesta] = useState(null);
//   const [respuestasMostrar, setRespuestasMostrar] = useState([]);

//   useEffect(() => {
//     // Resetear selectRespuesta cuando cambia la pregunta
//     setSelectRespuesta(null);
//     if (pregunta) {
//       const respuestas = [
//         {
//           texto: pregunta.respuesta1,
//           esCorrecta: validarRespuesta(
//             pregunta.respuesta1,
//             pregunta.respuesta_correcta
//           ),
//         },
//         {
//           texto: pregunta.respuesta2,
//           esCorrecta: validarRespuesta(
//             pregunta.respuesta2,
//             pregunta.respuesta_correcta
//           ),
//         },
//         {
//           texto: pregunta.respuesta3,
//           esCorrecta: validarRespuesta(
//             pregunta.respuesta3,
//             pregunta.respuesta_correcta
//           ),
//         },
//         {
//           texto: pregunta.respuesta4,
//           esCorrecta: validarRespuesta(
//             pregunta.respuesta4,
//             pregunta.respuesta_correcta
//           ),
//         },
//       ];

//       if (ayuda) {
//         const respuestasFiltradas = [
//           respuestas.find((respuesta) => respuesta.esCorrecta),
//           respuestas.find((respuesta) => !respuesta.esCorrecta),
//         ];
//         setRespuestasMostrar(respuestasFiltradas);
//       } else {
//         setRespuestasMostrar(respuestas);
//       }
//     }
//   }, [preguntaIndex, pregunta, ayuda]);

//   const handleResCorrecta = (respuesta) => {
//     // Si ya se ha seleccionado una respuesta, no hacer nada
//     if (selectRespuesta !== null) {
//       return;
//     }

//     const esCorrecta = validarRespuesta(respuesta, pregunta.respuesta_correcta);
//     setSelectRespuesta(respuesta);

//     if (esCorrecta) {
//       manejarRespuestaCorrecta();
//       Swal.fire({
//         icon: "success",
//         title: "¡Correcto!",
//         text: "Has seleccionado la respuesta correcta",
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "¡Incorrecto!",
//         text: "Has seleccionado la respuesta incorrecta",
//       });
//     }
//   };

//   //Esta funcion genera la tarjeta con la validacion y estilos para seleccionar una respuesta
//   const renderRespuesta = (respuesta) => (
//     <div className="flex flex-row">
//       <Card
//         className="w-48 h-48"
//         isPressable
//         onClick={() => handleResCorrecta(respuesta)}
//         css={{
//           backgroundColor:
//             selectRespuesta === respuesta
//               ? validarRespuesta(respuesta, pregunta.respuesta_correcta)
//                 ? "green"
//                 : "red"
//               : "white",
//           pointerEvents: selectRespuesta !== null ? "none" : "auto",
//         }}
//       >
//         <CardBody>{respuesta}</CardBody>
//       </Card>
//     </div>
//   );

//   return (
//     <div>
//       {pregunta ? (
//         <div className="flex flex-col items-center">
//           <p>{pregunta.preguntas}</p>
//           <div className="flex flex-row gap-4">
//             {renderRespuesta(pregunta.respuesta1)}
//             {renderRespuesta(pregunta.respuesta2)}
//             {renderRespuesta(pregunta.respuesta3)}
//             {renderRespuesta(pregunta.respuesta4)}
//             {pregunta.respuesta_correcta}
//           </div>
//         </div>
//       ) : (
//         <p>No hay preguntas disponibles</p>
//       )}
//     </div>
//   );
// };

// export default CustomCard;

// // import React, { useEffect, useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   Image,
// //   useSelect,
// // } from "@nextui-org/react";
// // import { validarRespuesta } from "../../utils/utils";
// // import Swal from "sweetalert2";

// // const CustomCard = ({ preguntaIndex }) => {
// //   const preguntas = useSelector((state) => state.preguntas.preguntas);
// //   const pregunta = preguntas[preguntaIndex];
// //   const [selectRespuesta, setSelectRespuesta] = useState(null);

// //   useEffect(() => {
// //     // Resetear selectRespuesta cuando cambia la pregunta
// //     setSelectRespuesta(null);
// //   }, [preguntaIndex]);

// //   const handleResCorrecta = (respuesta) => {
// //     const esCorrecta = validarRespuesta(respuesta, pregunta.respuesta_correcta);
// //     setSelectRespuesta(respuesta);

// //     if (selectRespuesta !== null) {
// //       return;
// //     }

// //     if (esCorrecta) {
// //       Swal.fire({
// //         icon: "success",
// //         title: "¡Correcto",
// //         text: "Has seleccionado la respuesta correcta",
// //       });
// //     } else {
// //       Swal.fire({
// //         icon: "error",
// //         title: "¡Incorrecto",
// //         text: "Has seleccionado la respuesta incorrecta",
// //       });
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Yo soy la card</h1>
// //       {pregunta ? (
// //         <div>
// //           <p>{pregunta.preguntas}</p>
// //           <div
// //             onClick={() => handleResCorrecta(pregunta.respuesta1)}
// //             style={{
// //               backgroundColor:
// //                 selectRespuesta === pregunta.respuesta1
// //                   ? validarRespuesta(
// //                       pregunta.respuesta1,
// //                       pregunta.respuesta_correcta
// //                     )
// //                     ? "green"
// //                     : "red"
// //                   : "transparent",
// //               pointerEvents: selectRespuesta !== null ? "none" : "auto",
// //             }}
// //           >
// //             {pregunta.respuesta1}
// //           </div>
// //           <div
// //             onClick={() => handleResCorrecta(pregunta.respuesta2)}
// //             style={{
// //               backgroundColor:
// //                 selectRespuesta === pregunta.respuesta2
// //                   ? validarRespuesta(
// //                       pregunta.respuesta2,
// //                       pregunta.respuesta_correcta
// //                     )
// //                     ? "green"
// //                     : "red"
// //                   : "transparent",
// //               pointerEvents: selectRespuesta !== null ? "none" : "auto",
// //             }}
// //           >
// //             {pregunta.respuesta2}
// //           </div>
// //           <div
// //             onClick={() => handleResCorrecta(pregunta.respuesta3)}
// //             style={{
// //               backgroundColor:
// //                 selectRespuesta === pregunta.respuesta3
// //                   ? validarRespuesta(
// //                       pregunta.respuesta3,
// //                       pregunta.respuesta_correcta
// //                     )
// //                     ? "green"
// //                     : "red"
// //                   : "transparent",
// //               pointerEvents: selectRespuesta !== null ? "none" : "auto",
// //             }}
// //           >
// //             {pregunta.respuesta3}
// //           </div>
// //           <div
// //             onClick={() => handleResCorrecta(pregunta.respuesta4)}
// //             style={{
// //               backgroundColor:
// //                 selectRespuesta === pregunta.respuesta4
// //                   ? validarRespuesta(
// //                       pregunta.respuesta4,
// //                       pregunta.respuesta_correcta
// //                     )
// //                     ? "green"
// //                     : "red"
// //                   : "transparent",
// //               pointerEvents: selectRespuesta !== null ? "none" : "auto",
// //             }}
// //           >
// //             {pregunta.respuesta4}
// //           </div>
// //           <p>{pregunta.respuesta_correcta}</p>
// //         </div>
// //       ) : (
// //         <p>No hay preguntas disponibles</p>
// //       )}
// //       {/* <div>
// //         <Card className="py-4">
// //           <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
// //             <p className="text-tiny uppercase font-bold">Daily Mix</p>
// //             <small className="text-default-500">12 Tracks</small>
// //             <h4 className="font-bold text-large">Frontend Radio</h4>
// //           </CardHeader>
// //           <CardBody className="overflow-visible py-2"></CardBody>
// //         </Card>
// //       </div> */}
// //     </div>
// //   );
// // };

// // export default CustomCard;

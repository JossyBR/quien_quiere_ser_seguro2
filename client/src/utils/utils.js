//Validar respuesta
export const validarRespuesta = (selectrespuesta, correctRespuesta) => {
  return selectrespuesta === correctRespuesta;
};

//Incrementar puntaje
export const incrementarPuntaje = (puntajeActual) => {
  return puntajeActual + 100;
};

//Actualizar el nivel basado en el numero de respuestas correctas
export const chequearProgresoNivel = (respuestasCorrectas) => {
  if (respuestasCorrectas >= 3) return true; //Esta listo ara subir de nivel
};

//Incrementar nivel
export const incrementarNivel = (nivelActual) => {
  if (nivelActual < 5) {
    return nivelActual + 1;
  }
  return nivelActual; //No incrementa si ya esta en el nivel maximo
};

import { configureStore } from "@reduxjs/toolkit";
import preguntaReducer from "../features/preguntas/preguntasSlice";

export const store = configureStore({
  reducer: {
    preguntas: preguntaReducer,
  },
});

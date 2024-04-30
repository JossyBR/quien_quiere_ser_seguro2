import { createSlice } from "@reduxjs/toolkit";

export const preguntasSlice = createSlice({
  name: "preguntas",
  initialState: {
    preguntas: [],
  },
  reducers: {
    addPregunta: (state, action) => {
      state.preguntas.push(action.payload);
    },
  },
});

export const { addPregunta } = preguntasSlice.actions;
export default preguntasSlice.reducer;

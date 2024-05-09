// Importamos createSlice y createAsyncThunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Definimos la acción asíncrona con createAsyncThunk
export const sendPregunta = createAsyncThunk(
  "preguntas/sendPregunta", // Identificador de la acción
  async (preguntaData, { rejectWithValue }) => {
    console.log("Enviando datos al servidor:", preguntaData);
    try {
      const response = await fetch("http://localhost:3001/preguntas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preguntaData),
      });
      alert("Pregunta creada exitosamente");
      if (!response.ok) {
        throw new Error("Error al enviar pregunta");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Definimos el slice
const preguntasSlice = createSlice({
  name: "preguntas",
  initialState: {
    preguntas: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPregunta: (state, action) => {
      state.preguntas.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPregunta.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendPregunta.fulfilled, (state, action) => {
        state.preguntas.push(action.payload);
        state.loading = false;
      })
      .addCase(sendPregunta.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default preguntasSlice.reducer;

// export const { addPregunta } = preguntasSlice.actions;

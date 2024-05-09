// Importamos createSlice y createAsyncThunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Obtener preguntas
export const loadPreguntas = createAsyncThunk(
  "preguntas/loadPreguntas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/preguntas");
      if (!response.ok) {
        throw new Error("No se pudo cargar las preguntas");
      }
      const data = await response.json();
      console.log("Obteniendo los datos: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Crear preguntas
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

export const editPregunta = createAsyncThunk(
  "preguntas/editPregunta",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/preguntas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar la pregunta");
      }
      const updatedPregunta = await response.json();
      return updatedPregunta;
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
      .addCase(loadPreguntas.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPreguntas.fulfilled, (state, action) => {
        state.preguntas = action.payload;
        state.loading = false;
      })
      .addCase(loadPreguntas.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
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
      })
      .addCase(editPregunta.fulfilled, (state, action) => {
        const index = state.preguntas.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.preguntas[index] = action.payload;
        }
      })
      .addCase(editPregunta.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPregunta.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default preguntasSlice.reducer;

// export const { addPregunta } = preguntasSlice.actions;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePregunta } from "../features/preguntas/preguntasSlice";

const DeletePreguntas = ({ isOpen, onClose }) => {
  const { preguntaId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Soy el de DeletePreguntas: ', preguntaId)

  const handleDelete = async () => {
    await dispatch(deletePregunta(preguntaId));
    onClose(); // Cierra el modal después de la acción
    navigate("/admin"); // Navega a la página de administración
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-lg font-bold">Eliminar pregunta</h1>
        <p className="my-4">¿Estás seguro que deseas eliminar esta pregunta?</p>
        <div className="flex justify-around">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Sí
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePreguntas;

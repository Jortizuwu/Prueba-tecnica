import React from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { mainApi } from "../api/mainApi";

/**
 *
 * @param {cliente} cliente un objeto de tipo cliente
 *
 */

export const CardCliente = ({ cliente }) => {
  const { push } = useRouter();

  const handleDelete = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mainApi.delete(`/clients/${cliente.id}`);
          Swal.fire("Deleted!", "Cliente eliminado correctamente", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Oops..", "Ocurrio un error", "error");
        }
      }
    });
  };

  return (
    <div
      className="bg-white shadow-sm md:shadow-none hover:shadow-md p-2 rounded-md w-full cursor-pointer transition duration-150"
      onClick={() => {
        push(`clientes/${cliente.id}`);
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div>
            <h2>Nombre del cliente</h2>
            <p className="font-semibold capitalize">{`${cliente.name} ${cliente.lastName}`}</p>
          </div>
          <div className="flex flex-col mt-4">
            <h2>Mas Informacion</h2>
            <div className="flex flex-row space-x-2">
              <p className="font-semibold capitalize">{cliente.zipCode}</p>
              <p className="font-semibold capitalize truncate">
                {cliente.address}
              </p>
              <p className="font-semibold capitalize">{cliente.nationalId}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-row md:flex-col items-end space-x-2 space-y-0 md:space-x-2 md:space-y-3 justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              push(`clientes/edit/${cliente.id}`);
            }}
            className="btn bg-blue-400 w-1/2 md:w-auto hover:bg-blue-500 text-white flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-1/2 md:w-auto btn bg-red-500 hover:bg-red-600 text-white flex items-center"
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

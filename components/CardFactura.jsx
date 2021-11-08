import React from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";

import { mainApi } from "../api/mainApi";

/**
 *
 * @param {factura} factura un objeto de tipo factura
 *
 */

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "COP",
});

export const CardFactura = ({ factura }) => {
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
      confirmButtonText: "Si, borrar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mainApi.delete(`/invoices/${factura.id}`);
          Swal.fire("Deleted!", "Factura eliminada correctamente", "success");
        } catch (error) {
          Swal.fire("Oops..", "Ocurrio un error", "error");
        }
      }
    });
  };

  return (
    <div
      className="shadow-sm md:shadow-none bg-white hover:shadow-md p-2 rounded-md w-full cursor-pointer transition duration-150"
      onClick={() => {
        push(`facturas/${factura.id}`);
      }}
    >
      <div className="relative">
        <div className="w-full">
          <div>
            <h2>Creacion de la factura</h2>
            <p className="font-semibold capitalize">
              {moment(factura.updatedAt).fromNow()}
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <h2>Mas Informacion</h2>
            <ul className="mt-1">
              <li className="font-semibold capitalize">
                Ultima actualizacion: {moment(factura.date).fromNow()}
              </li>
              <li className="font-semibold capitalize">
                total: {formatter.format(factura.total)}
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="absolute rounded-full -top-5 -right-5 p-1 bg-red-500 hover:bg-red-600 text-center text-white transform hover:scale-125 transition duration-150"
        >
          <svg
            className="ml-1 w-5 h-6 mr-1 text-center "
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
        </button>
      </div>
    </div>
  );
};

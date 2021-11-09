import React from "react";

import { useRouter } from "next/router";

import { mainApi } from "../api/mainApi";
import { CardFactura } from "../components/CardFactura";

const Facturas = ({ data }) => {
  const { push } = useRouter();

  return (
    <div className="w-full px-2 py-5 md:px-10 md:py-10 h-full">
      <button
        onClick={() => push("/facturas/create")}
        className="btn absolute top-5 right-5  bg-green-500  text-white  hover:bg-green-600 "
      >
        Crear nueva factura
      </button>
      <div className="h-full">
        {data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12">
            {data.items.map((factura) => (
              <CardFactura factura={factura} key={factura.id} />
            ))}
          </div>
        ) : (
          <p className="font-bold text-center text-2xl text-red-400 mt-10">
            No hay facuturas disponibles dale al boton de crear para crear una
            nueva
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await mainApi.get("/invoices?page=1&limit=10");
  return {
    props: {
      data: data.data,
    },
  };
};

export default Facturas;

import React from "react";
import { useRouter } from "next/router";

import { mainApi } from "../api/mainApi";
import { CardCliente } from "../components/CardCliente";

const Cliente = ({ data }) => {
  const { push } = useRouter();

  return (
    <div className="w-full px-2 py-5 md:px-10 md:py-10 h-full">
      <button
        onClick={() => push("/clientes/create")}
        className="btn absolute top-5 right-5  bg-green-500  text-white  hover:bg-green-600 "
      >
        crear nuevo cliente
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12">
        {data.items.length > 0 ? (
          data.items.map((cliente) => (
            <CardCliente cliente={cliente} key={cliente.id} />
          ))
        ) : (
          <p className="font-bold text-center text-2xl text-red-400">
            No hay clientes dale al boton de crear, para crear un nuevo
            cliente
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await mainApi.get("/clients?page=1&limit=10");

  return {
    props: {
      data: data.data,
    },
  };
};

export default Cliente;

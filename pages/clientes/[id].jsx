import React from "react";
import moment from "moment";
import { useRouter } from "next/router";

import { mainApi } from "../../api/mainApi";
import Error from "../Error";

const ClienteId = ({ data }) => {
  const { push } = useRouter();
  if (!data.ok) return <Error title={data.message} />;

  const { client } = data;

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-center text-2xl font-bold w-full">
        {client.name} {client.lastName}
      </h1>
      <p className="font-bold my-4">
        Total de facturas {client.invoices.length}
      </p>
      {client.invoices.length > 0 ? (
        client.invoices.map((invoice, idx) => (
          <div
            className="bg-white rounded-md hover:shadow-md p-2 w-full cursor-pointer transition duration-150"
            onClick={() => push(`/facturas/${invoice.id}`)}
            key={invoice.id}
          >
            <span className="font-medium mb-2 block text-gray-500">
              Factura #{idx + 1}
            </span>
            <div>
              <p className="font-bold uppercase ">total: {invoice.total}</p>
              <ol className="space-y-1">
                <li>Creacion: {moment(invoice.createdAt).fromNow()}</li>
                <li>
                  Ultima actualizacion: {moment(invoice.updatedAt).fromNow()}
                </li>
              </ol>
            </div>
          </div>
        ))
      ) : (
        <p className="font-bold text-center text-2xl text-red-400 mt-10">
          El cliente {client.name} {client.lastName} no tiene ninguna factura registrada a
          su nombre
        </p>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  try {
    const { data } = await mainApi.get(`/clients/${id}`);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default ClienteId;

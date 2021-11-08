import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

import { mainApi } from "../api/mainApi";
import { uiCreateNewInvoices } from "../actions/ui";
import { CardFactura } from "../components/CardFactura";
import {
  createAnewInvoices,
  infoNewInvoicesIdClienet,
  infoNewInvoicesItesm,
} from "../actions/api";

const Facturas = ({ data, paquetes, clientes, tracks }) => {
  const { createNewInvoice, loadingCreateInvoice } = useSelector(
    (state) => state.ui
  );

  const [trackId, setTrackId] = useState(null);

  const { packageSelects, idClientSelect } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  const handleCreateNewInvoices = () => {
    dispatch(uiCreateNewInvoices());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      idClientSelect === null ||
      packageSelects.length === 0 ||
      trackId === null
    ) {
      Swal.fire("Error!", "faltan campos por llenar", "error");
      return;
    }
    dispatch(createAnewInvoices(packageSelects, idClientSelect));
  };

  const seleccionarPaquetes = (items) => {
    const newItems = items.map((item) => ({
      ...item.value,
      trackId: trackId.value,
    }));
    dispatch(infoNewInvoicesItesm(newItems));
  };

  const seleccionarCliente = (IdClient) => {
    dispatch(infoNewInvoicesIdClienet(IdClient));
  };

  return (
    <div className="w-full px-2 py-5 md:px-10 md:py-10 h-full">
      <button
        onClick={handleCreateNewInvoices}
        className="btn absolute top-5 right-5  bg-green-500  text-white  hover:bg-green-600 "
      >
        {!createNewInvoice ? "crear nueva facutura" : "Ver facturas"}
      </button>

      {createNewInvoice ? (
        <section className="flex flex-col items-center justify-center mt-10 md:mt-0">
          <h1 className="text-center text-lg font-bold mb-2 md:mb-6 md:text-2xl capitalize ">
            Crear nueva factura
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-full md:w-1/2"
          >
            <label
              className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              htmlFor="clientes"
            >
              Clientes
            </label>
            <Select
              name="clientId"
              id="clientId"
              className="mb-2"
              onChange={(e) => seleccionarCliente(e)}
              options={clientes.items.map((cliente) => ({
                value: cliente.id,
                label: cliente.name,
              }))}
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              htmlFor="clientes"
            >
              Pista
            </label>
            <Select
              defaultInputValue={tracks.items?.[0].track?.id}
              name="clientId"
              id="clientId"
              className="mb-2"
              onChange={(e) => setTrackId(e)}
              options={tracks.items.map((track) => ({
                value: track.id,
                label: `${track.origin} - ${track.destiny}`,
              }))}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              htmlFor="paquetes"
            >
              Paquetes
            </label>
            <Select
              isDisabled={!trackId ? true : false}
              name="items"
              id="items"
              onChange={(e) => {
                seleccionarPaquetes(e);
              }}
              isMulti={true}
              className="mb-2"
              options={paquetes.items.map((paquete) => ({
                value: { name: paquete.name, price: paquete.price },
                label: paquete.name,
              }))}
            />

            <button
              type="submit"
              className={`${
                loadingCreateInvoice && "opacity-20 cursor-wait"
              } btn bg-blue-500 w-full p-2 text-white hover:bg-blue-600`}
              disabled={loadingCreateInvoice}
            >
              crear factura
            </button>
          </form>
        </section>
      ) : (
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
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await mainApi.get("/invoices?page=1&limit=10");
  const info = await mainApi.get("/packages?page=1&limit=10");
  const clientes = await mainApi.get("/clients?page=1&limit=10");
  const tracks = await mainApi.get("/packages/tracks?page=1&limit=10");

  return {
    props: {
      data: data.data,
      paquetes: info.data,
      clientes: clientes.data,
      tracks: tracks.data,
    },
  };
};

export default Facturas;

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { mainApi } from "../../api/mainApi";
import { createAnewInvoices } from "../../actions/api";

const CreateInvoices = ({ clientes, tracks }) => {
  const { push } = useRouter();

  const { createNewInvoice, loadingCreateInvoice } = useSelector(
    (state) => state.ui
  );

  const dispatch = useDispatch();

  const initialValues = {
    clientId: "",
    numbreOfitems: "",
    items: [],
  };

  const validationSchema = Yup.object().shape({
    numbreOfitems: Yup.string().required("el numero de paquetes es requerido"),
    clientId: Yup.string().required("el cliente es requerido"),
    items: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("El nombre del producto es requerido"),
        price: Yup.number()
          .min(1, "el minimo es de 1")
          .required("el precio es requerido"),
        trackId: Yup.string().required("la pista es requerido"),
      })
    ),
  });

  const onChangeItems = (e, field, values, setValues) => {
    const items = [...values.items];
    const numbreOfitems = e.target.value || 0;
    const previousNumber = parseInt(field.value || "0");
    if (previousNumber < numbreOfitems) {
      for (let i = previousNumber; i < numbreOfitems; i++) {
        items = [...items, { name: "", price: 0, trackId: "" }];
      }
    } else {
      for (let i = previousNumber; i >= numbreOfitems; i--) {
        items.splice(i, 1);
      }
    }
    setValues({ ...values, items });

    field.onChange(e);
  };

  const onSubmit =  (fields) => {
    const { clientId, items } = fields;
    dispatch(createAnewInvoices(items, clientId));
    setTimeout(() => {
        push("/facturas")
    }, 1500);
  };

  return (
    <div className="w-full px-2 py-5 md:px-10 md:py-10 h-full">
      <button
        onClick={() => push("/facturas")}
        className="btn absolute top-5 right-5  bg-green-500  text-white  hover:bg-green-600 "
      >
        Ver facturas
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setValues }) => (
          <Form className="flex flex-col items-center justify-center mt-10 md:mt-0">
            <h5 className="text-center text-lg font-bold mb-2 md:mb-6 md:text-2xl capitalize">
              Crear nueva factura
            </h5>
            <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-full md:w-1/2">
              <div className="flex flex-col ite">
                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  seleccione el cliente
                </label>
                <Field name="clientId">
                  {({ field }) => (
                    <select
                      {...field}
                      className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
                    >
                      <option value="">Seleccione</option>
                      {clientes.items.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {`${cliente.name} ${cliente.lastName}`}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <ErrorMessage
                  name="clientId"
                  component="div"
                  className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize mt-2">
                  Numero de paquetes
                </label>
                <Field name="numbreOfitems">
                  {({ field }) => (
                    <select
                      {...field}
                      className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
                      onChange={(e) =>
                        onChangeItems(e, field, values, setValues)
                      }
                    >
                      <option value="">0</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <option
                          className="p-2 cursor-pointer"
                          key={i}
                          value={i}
                        >
                          {i}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>

                <ErrorMessage
                  name="numbreOfitems"
                  component="div"
                  className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                />
              </div>
              <FieldArray name="items">
                {() =>
                  values.items.map((ticket, i) => {
                    return (
                      <div key={i} className="border-b-2 border-blue-400 py-4">
                        <div className="">
                          <h5 className="card-title">Paquete #{i + 1}</h5>
                          <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                            Nombre del paquete
                          </label>
                          <Field
                            name={`items.${i}.name`}
                            type="text"
                            className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
                          />
                          <ErrorMessage
                            name={`items.${i}.name`}
                            component="div"
                            className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                          />
                        </div>
                        <div className="">
                          <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                            Precio
                          </label>
                          <Field
                            name={`items.${i}.price`}
                            type="number"
                            className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
                          />
                          <ErrorMessage
                            name={`items.${i}.price`}
                            component="div"
                            className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                          />
                        </div>
                        <div className="">
                          <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                            pista
                          </label>
                          <Field name={`items.${i}.trackId`}>
                            {({ field }) => (
                              <select
                                {...field}
                                className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
                              >
                                <option value="">Seleccione</option>
                                {tracks.items.map((track) => (
                                  <option
                                    className="p-2 cursor-pointer"
                                    key={track.id}
                                    value={track.id}
                                  >
                                    {`${track.origin}  ${track.destiny}`} -{" "}
                                    {`COP ${track.cost}`}
                                  </option>
                                ))}
                              </select>
                            )}
                          </Field>
                          <ErrorMessage
                            name={`items.${i}.trackId`}
                            component="div"
                            className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                          />
                        </div>
                      </div>
                    );
                  })
                }
              </FieldArray>
              <button
                type="submit"
                className={`${
                  loadingCreateInvoice && "cursor-wait opacity-30"
                } btn bg-blue-500 text-white w-full mt-4`}
                disabled={loadingCreateInvoice}
              >
                Crear
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async () => {
  const clientes = await mainApi.get("/clients?page=1&limit=10");
  const tracks = await mainApi.get("/packages/tracks?page=1&limit=10");

  return {
    props: {
      clientes: clientes.data,
      tracks: tracks.data,
    },
  };
};

export default CreateInvoices;

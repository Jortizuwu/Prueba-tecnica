import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import { InputComponent } from "../../../components/InputComponent";
import { mainApi } from "../../../api/mainApi";
import Error from "../../Error";
import { uiUpdateClienteLoading } from "../../../actions/ui";

const Edit = ({ data }) => {
  const { loadingUpdateUser } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { push } = useRouter();

  if (!data.ok) return <Error title={data.message} />;
  const { client } = data;

  return (
    <div className="flex flex-col w-1/2">
      <h1 className="text-center font-bold mb-6 text-2xl capitalize ">
        editar cliente
      </h1>
      <Formik
        initialValues={{
          name: client.name,
          lastName: client.lastName,
          zipCode: client.zipCode,
          address: client.address,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("El nombre es obligatorio"),
          lastName: Yup.string().required("El apellido es obligatoria"),
          zipCode: Yup.number("El codigo zip debe de ser de tipo numerico")
            .integer("Debe de ser entero")
            .required("El codigo zip es obligatorio"),
          address: Yup.string().required("La dirrecion es obligatorio"),
        })}
        onSubmit={async (valores) => {
          try {
            dispatch(uiUpdateClienteLoading());
            await mainApi.put(`/clientes/${client.id}`, {
              valores,
            });
            Swal.fire(
              "Editado correctamente",
              "Cliente eliminado correctamente",
              "success"
            );
            dispatch(uiUpdateClienteLoading());
            setTimeout(() => {
              push("/clientes");
            }, 1500);
          } catch (error) {
            dispatch(uiUpdateClienteLoading());
            Swal.fire("Oopss...", "Algo no va bien", "error");
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <InputComponent
              name="Nombre"
              id="name"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.name}
              placeholder="Nombre del cliente"
            />
            {touched.name && errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.name}</p>
              </div>
            )}
            <InputComponent
              name="Apellido"
              id="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.lastName}
              placeholder="Apellido"
            />
            {touched.lastName && errors.lastName && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.lastName}</p>
              </div>
            )}
            <InputComponent
              name="Código postal"
              id="zipCode"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.zipCode}
              placeholder="codigo zip"
              type="number"
            />
            {touched.zipCode && errors.zipCode && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.zipCode}</p>
              </div>
            )}
            <InputComponent
              name="Direccion"
              id="address"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.address}
              placeholder="Direccion del cliente"
            />
            {touched.zipCode && errors.zipCode && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.zipCode}</p>
              </div>
            )}
            <button
              type="submit"
              className={`${
                loadingUpdateUser && "opacity-20 cursor-wait"
              } btn bg-blue-500 w-full p-2 text-white hover:bg-blue-600`}
              disabled={loadingUpdateUser}
            >
              Editar
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  const { data } = await mainApi.get(`/clients/${id}`);

  return {
    props: {
      data,
    },
  };
};

export default Edit;

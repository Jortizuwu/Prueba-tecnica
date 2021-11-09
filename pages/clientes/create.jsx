import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { InputComponent } from "../../components/InputComponent";
import { useDispatch } from "react-redux";
import { uiCreateClienteLoading, uiCreateNewCliente } from "../../actions/ui";
import { mainApi } from "../../api/mainApi";

const CreateClient = () => {
  const { loadingCreateUser } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { handleBlur, handleChange, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        nationalId: "",
        lastName: "",
        zipCode: "",
        address: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        nationalId: Yup.number().required("La cedula es es obligatorio"),
        lastName: Yup.string().required("El apellido es obligatoria"),
        zipCode: Yup.number("El codigo zip debe de ser de tipo numerico")
          .integer("Debe de ser entero")
          .required("El codigo zip es obligatorio"),
        address: Yup.string().required("La dirrecion es obligatorio"),
      }),
      onSubmit: async (valores) => {
        try {
          dispatch(uiCreateClienteLoading());
          const data = await mainApi.post("/clients", valores);
          console.log(data);

          if (data.data?.ok === false) {
            Swal.fire("Error!", `${data.data.message}`, "error");
            dispatch(uiCreateClienteLoading());
            return;
          }
          Swal.fire(
            "Creado!",
            "Nuevo cliente creado de forma correcta",
            "success"
          );
          dispatch(uiCreateNewCliente());
          setTimeout(() => {
            push("/clientes");
          }, 1500);
          dispatch(uiCreateClienteLoading());
        } catch (error) {
          console.log(error.message);
          dispatch(uiCreateClienteLoading());
          Swal.fire("Error!", "Oops.. para que algo no va bien", "error");
        }
      },
    });
  return (
    <div className="w-full px-2 py-5 md:px-10 md:py-10 h-full">
      <button
        onClick={() => push("/clientes")}
        className="btn absolute top-5 right-5  bg-green-500  text-white  hover:bg-green-600 "
      >
        Ver Clientes
      </button>
      <section className="flex flex-col items-center justify-center mt-10 md:mt-0">
        <h1 className="text-center text-lg font-bold mb-2 md:mb-6 md:text-2xl capitalize ">
          Crear nuevo cliente
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-full md:w-1/2"
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
            name="Documento de identidad"
            id="nationalId"
            onBlur={handleBlur}
            onChange={handleChange}
            values={values.nationalId}
            placeholder="Documento de identidad"
            type="number"
          />
          {touched.nationalId && errors.nationalId && (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.nationalId}</p>
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
              loadingCreateUser && "opacity-20 cursor-wait"
            } btn bg-blue-500 w-full p-2 text-white hover:bg-blue-600`}
            disabled={loadingCreateUser}
          >
            enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateClient;

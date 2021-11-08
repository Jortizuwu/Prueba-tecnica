import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { uiCreateNewCliente, uiCreateNewInvoices } from "../actions/ui";

import { Icon } from "../components/Icon";

const Index = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleShowClient = () => {
    push("/clientes");
  };
  // const handleCreateClient = () => {
  //   push("/clientes");
  //   dispatch(uiCreateNewCliente());
  // };
  const handleShowInvoices = () => {
    push("/facturas");
  };
  // const handleCreateInvoices = () => {
  //   push("/facturas");
  //   dispatch(uiCreateNewInvoices());
  // };

  return (
    <div className="w-full h-full mt-12 md:mt-0 grid gap-4 grid-cols-1 md:grid-cols-2 p-4 text-white">
      <button
        onClick={handleShowClient}
        className="flex flex-col hover:shadow-md transition duration-150 justify-center items-center cursor-pointer bg-blue-500 p-2 rounded-lg text-center text-3xl font-bold"
      >
        Ver Clientes
        <Icon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </button>
      {/* <button
        onClick={handleCreateClient}
        className="flex flex-col hover:shadow-md transition duration-150 justify-center items-center cursor-pointer bg-red-500 p-2 rounded-lg text-center text-3xl font-bold"
      >
        Agregar cliente
        <Icon d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </button> */}
      <button
        onClick={handleShowInvoices}
        className="flex flex-col hover:shadow-md transition duration-150 justify-center items-center cursor-pointer bg-green-500 p-2 rounded-lg text-center text-3xl font-bold"
      >
        Ver facturas
        <Icon d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </button>
      {/* <button
        onClick={handleCreateInvoices}
        className="flex flex-col hover:shadow-md transition duration-150 justify-center items-center cursor-pointer bg-purple-500 p-2 rounded-lg text-center text-3xl font-bold"
      >
        Crear facturas
        <Icon d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </button> */}
    </div>
  );
};

export default Index;

import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import {
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js";
import { useDispatch, useSelector } from "react-redux";

import { mainApi } from "../../api/mainApi";
import Error from "../Error";
import { viewPfd } from "../../actions/ui";
import { FacturaPdf } from "../../components/FacturaPdf";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "COP",
});

const FacturaId = ({ data }) => {
  const { push } = useRouter();
  const { showPdf } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  if (!data.ok) return <Error title={data.message} />;

  const { invoice } = data;

  const handleShowPdf = () => {
    dispatch(viewPfd());
  };

  return (
    <div className="w-full h-full p-4 relative">
      {showPdf ? (
        <div className="mt-14">
          <PDFViewer style={{ width: "100%", height: "80vh" }}>
            <FacturaPdf invoice={invoice} />
          </PDFViewer>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-bold mt-12 md:mt-4">
            Total de paquetes {invoice.packages.length}
          </p>
          {invoice.packages.map((paquete, idx) => (
            <div key={paquete.id} className="bg-white rounded-md shadow-md p-2">
              <span className="font-medium mb-2 block text-gray-500">
                Paquete #{idx + 1}
              </span>
              <div>
                <p className="font-bold uppercase ">Nombre: {paquete.name}</p>
                <ol className="space-y-1">
                  <li className="font-bold uppercase">
                    Precio: {formatter.format(paquete.price)}
                  </li>
                  <li>Creacion: {moment(paquete.createdAt).fromNow()}</li>
                  <li>
                    Ultima actualizacion: {moment(paquete.updatedAt).fromNow()}
                  </li>
                  <li
                    onClick={() => push(`/clientes/${invoice.client.id}`)}
                    className="bg-blue-400 text-white p-1 shadow border rounded-md font-semibold cursor-pointer"
                  >
                    Cliente : {invoice.client.name}
                  </li>
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row items-center space-x-2 absolute top-5 right-5">
        <button
          onClick={handleShowPdf}
          className="btn bg-green-400 text-white  hover:bg-green-500"
        >
          {!showPdf ? " ver pdf de la factura" : "ver facturas"}
        </button>
        {showPdf && (
          <PDFDownloadLink
            document={<FacturaPdf invoice={invoice} />}
            fillName="invoice.pdf"
          >
            <button className="btn bg-blue-400  text-white hover:bg-blue-500">
              descargar
            </button>
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  try {
    const { data } = await mainApi.get(`/invoices/${id}`);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default FacturaId;

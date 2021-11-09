import Swal from "sweetalert2";

import { mainApi } from "../api/mainApi";
import { types } from "../types/types";
import { uiCreateInvoicesLoading, uiCreateNewInvoices } from "./ui";

export const createAnewInvoices = (items, clientId) => {
  return async (dispatch) => {
    try {
      dispatch(uiCreateInvoicesLoading());
      const data = await mainApi.post("/invoices", {
        date: new Date().toISOString(),
        items,
        clientId,
      });
      if (data.data.ok === true) {
        Swal.fire("Creada!", "Nueva factura creada correctamente", "success");
        dispatch(uiCreateInvoicesLoading());
        dispatch(uiCreateNewInvoices());
        dispatch(restValuesState());
        return;
      }
      console.log(data);
      Swal.fire("Error!", `${data.data.message}`, "error");
    } catch (error) {
      dispatch(uiCreateInvoicesLoading());
      Swal.fire("Error!", "Oops.. para que algo no va bien", "error");
      dispatch(restValuesState());
    }
  };
};

export const infoNewInvoicesItesm = (items) => ({
  type: types.apiSelectItems,
  payload: items,
});

export const infoNewInvoicesIdClienet = (client) => ({
  type: types.apiSelectIdClient,
  payload: client.value,
});

const restValuesState = () => ({
  type: types.resetValues,
});

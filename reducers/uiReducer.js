import { types } from "../types/types";

const initialState = {
  // global
  showSidebar: true,

  //clinete
  createNewClinete: false,
  loadingUpdateUser: false,
  loadingCreateUser: false,

  //invoices
  createNewInvoice: false,
  loadingCreateInvoice: false,
  showPdf: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    //global
    case types.showSidebar:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    //clientes
    case types.createNewCliente:
      return {
        ...state,
        createNewClinete: !state.createNewClinete,
      };

    case types.updateCliente:
      return {
        ...state,
        loadingUpdateUser: !state.loadingUpdateUser,
      };

    case types.createClienteLoading:
      return {
        ...state,
        loadingCreateUser: !state.loadingCreateUser,
      };
    // invoices
    case types.createNewInvoice:
      return {
        ...state,
        createNewInvoice: !state.createNewInvoice,
      };
    case types.createNewInvoice:
      return {
        ...state,
        loadingCreateInvoice: !state.loadingCreateInvoice,
      };

    case types.showPdf:
      return {
        ...state,
        showPdf: !state.showPdf,
      };

    default:
      return state;
  }
};

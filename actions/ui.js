import { types } from "../types/types";

//global
export const uiShowSidebar = () => ({
  type: types.showSidebar,
});

//clientes
export const uiCreateNewCliente = () => ({
  type: types.createNewCliente,
});

export const uiUpdateClienteLoading = () => ({
  type: types.updateCliente,
});

export const uiCreateClienteLoading = () => ({
  type: types.createClienteLoading,
});

//invoices
export const uiCreateNewInvoices = () => ({
  type: types.createNewInvoice,
});

export const uiCreateInvoicesLoading = () => ({
  type: types.createClienteLoading,
});

export const viewPfd = () => ({
  type: types.showPdf,
});

import { types } from "../types/types";

const initialState = {
  packageSelects: [],
  idClientSelect: null,
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.apiSelectItems:
      return {
        ...state,
        packageSelects: action.payload,
      };
    case types.apiSelectIdClient:
      return {
        ...state,
        idClientSelect: action.payload,
      };
    case types.resetValues:
      return {
        ...state,
        packageSelects: [],
        idClientSelect: null,
      };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { apiReducer } from "./apiReducer";

import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  api: apiReducer,
});

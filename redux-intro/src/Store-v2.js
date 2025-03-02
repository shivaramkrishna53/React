import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

const combinedreducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  combinedreducers,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
);

export default store;

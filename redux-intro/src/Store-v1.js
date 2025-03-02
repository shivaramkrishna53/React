// import { combineReducers, createStore } from "redux";
// const accountinitialState = {
//   balance: 0,
//   loan: 0,
//   loanpurpose: "",
// };

// function accountReducer(state = accountinitialState, action) {
//   switch (action.type) {
//     case "account/deposite":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loanpurpose: action.payload.purpose,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanpurpose: "",
//       };
//     default:
//       return state;
//   }
// }

// const customerInitialState = {
//   fullName: "",
//   nationalId: null,
//   createdAt: null,
// };

// function customerReducer(state = customerInitialState, action) {
//   switch (action.type) {
//     case "customer/createcustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updatename":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// const combinedreducers = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
// const store = createStore(combinedreducers);

// store.dispatch({ type: "account/deposite", payload: 1000 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 500 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { purpose: "to buy home", amount: 50000 },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// // ACTION CREATORS FOR ACCOUNT

// function deposit(amount) {
//   return { type: "account/deposite", payload: amount };
// }

// function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// function getloan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// function payloan() {
//   return { type: "account/payLoan" };
// }

// store.dispatch(deposit(5000));
// console.log(store.getState());
// store.dispatch(withdraw(1000));
// console.log(store.getState());
// store.dispatch(getloan(9000, "to get a bike"));
// console.log(store.getState());
// store.dispatch(payloan());
// console.log(store.getState());

// // ACTION CREATORS FOR CUSTOMER
// function createcustomer(fullName, nationalId) {
//   return {
//     type: "customer/createcustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }

// function updatename(fullName) {
//   return { type: "customer/updatename", payload: fullName };
// }

// store.dispatch(createcustomer("Shiva Ram Krishna Durgi", 10374421));
// console.log(store.getState());
// store.dispatch(updatename("Shiva"));
// console.log(store.getState());
// store.dispatch(deposit(5));
// console.log(store.getState());
// store.dispatch(withdraw(5));
// console.log(store.getState());
// store.dispatch(createcustomer("Sai Ram Krishna Durgi", 7332));
// console.log(store.getState());

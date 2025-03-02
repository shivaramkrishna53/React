// const accountinitialState = {
//   balance: 0,
//   loan: 0,
//   loanpurpose: "",
// };

// export default function accountReducer(state = accountinitialState, action) {
//   switch (action.type) {
//     case "account/deposit":
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

// // ACTION CREATORS FOR ACCOUNT

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from =${currency}&to=USD`
//     );
//     const data = await res.json();
//     const convertedRate = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: convertedRate });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// export function payloan() {
//   return { type: "account/payLoan" };
// }

// using redux-tool kit we can define the reducer as follows

import { createSlice } from "@reduxjs/toolkit";

const accountinitialState = {
  balance: 0,
  loan: 0,
  loanpurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountinitialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loanpurpose = action.payload.purpose;
        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
      },
    },
    payloan(state, action) {
      state.loanpurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from =${currency}&to=USD`
    );
    const data = await res.json();
    const convertedRate = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedRate });
  };
}

console.log(accountSlice);
console.log(accountSlice.actions.requestLoan(500, "bike"));

export const { withdraw, requestLoan, payloan } = accountSlice.actions;

export default accountSlice.reducer;

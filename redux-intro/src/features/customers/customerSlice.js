import { createSlice } from "@reduxjs/toolkit";

// const customerInitialState = {
//   fullName: "",
//   nationalId: null,
//   createdAt: null,
// };

// export default function customerReducer(state = customerInitialState, action) {
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

// // ACTION CREATORS FOR CUSTOMER
// export function createcustomer(fullName, nationalId) {
//   return {
//     type: "customer/createcustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }

// export function updatename(fullName) {
//   return { type: "customer/updatename", payload: fullName };
// }

// Below is the code which uses redux-tool-kit to perform state mangement.

const customerInitialState = {
  fullName: "",
  nationalId: null,
  createdAt: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitialState,
  reducers: {
    createcustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updatename(state, action) {
      state.fullName = action.payload;
    },
  },
});

console.log(customerSlice);

export const { createcustomer, updatename } = customerSlice.actions;

export default customerSlice.reducer;

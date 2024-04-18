import { createContext, useReducer } from "react";

const initialState = {
  data: {
    userData: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      promoCode: "",
    },
    signUpErrorMessages: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      promoCode: "",
    },
  },
};
export const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "set-input": {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;

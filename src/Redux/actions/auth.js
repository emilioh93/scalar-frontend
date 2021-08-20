import { types } from "../types/types";

export const login = (token, email) => {
  return {
    type: types.login,
    payload: {
      token,
      email,
    },
  };
};

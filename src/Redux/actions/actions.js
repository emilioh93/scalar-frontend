import { types } from "../types/types";

export const login = (id, email) => {
  return {
    type: types.login,
    payload: {
      id,
      email,
    },
  };
};

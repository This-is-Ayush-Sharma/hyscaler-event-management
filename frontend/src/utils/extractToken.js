import { jwtDecode } from "jwt-decode";

export const extractToken = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

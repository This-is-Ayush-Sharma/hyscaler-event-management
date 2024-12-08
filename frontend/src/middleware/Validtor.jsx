import { Navigate } from "react-router-dom";
import { CheckToken } from "./checkToken";
import { extractToken } from "../utils/extractToken";

// eslint-disable-next-line react/prop-types
const Validtor = ({ children }) => {
  const checkToken = CheckToken();
  const tokenData = extractToken(checkToken);
  let isVerified = false;
  if (tokenData.status === "active") {
    isVerified = true;
  } else {
    isVerified = false;
  }
  return isVerified ? children : <Navigate to="/login" />;
};

export default Validtor;

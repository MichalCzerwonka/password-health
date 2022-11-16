import { Routes } from "~/constants";

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = Routes.Login;
};

export default logout;
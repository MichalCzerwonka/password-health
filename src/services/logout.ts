import { Routes, URL } from "~/constants";
import { API } from "~/services/api";

const logout = async () => {
  API(URL.Logout).then(() => {
    localStorage.removeItem('token');
    window.location.href = Routes.Login;
  })
};

export default logout;
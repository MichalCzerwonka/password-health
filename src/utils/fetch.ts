import logout from "~/services/logout";

export const fetchExtended = async (...args) => {
  let [resource, config] = args;

  let response = await fetch(resource, config);

  if (response.status === 401) {
    logout();
  }
  return response;
};
import logout from "~/services/logout";
import getUrl from "~/utils/getUrl";

export const API = async (...args) => {
  let [resource, config] = args;

  const url = getUrl(resource);
  const extendedConfig = {
    ...config,
    headers: {
      ...(config?.headers ? config?.headers : {}),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  let response = await fetch(url, extendedConfig);

  if (response.status === 401) {
    logout();
  }

  return response.json().catch(() => {
    return {};
  });
};
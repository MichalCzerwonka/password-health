import { API } from '~/constants';
import getUrl from '../utils/getUrl';
import { fetchExtended } from "~/utils/fetch";

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetchExtended(url);
  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;

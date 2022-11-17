import { API } from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;

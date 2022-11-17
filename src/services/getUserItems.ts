import { URL } from "~/constants";
import getUrl from "~/utils/getUrl";
import { API } from "~/utils/fetch";

export interface IItem {
  id: string;
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(URL.Items, {
    userId,
  });

  const response = await API(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });

  const data = await response.json();

  return data.items;
};

export default getUserItems;

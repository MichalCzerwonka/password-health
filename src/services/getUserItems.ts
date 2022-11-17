import { URL } from "~/constants";
import { API } from "~/services/api";

export interface IItem {
  id: string;
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (): Promise<Array<IItem>> => {
  const data = await API(URL.Items);

  return data.items;
};

export default getUserItems;

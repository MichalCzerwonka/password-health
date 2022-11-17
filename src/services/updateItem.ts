import { URL } from "~/constants";
import getUrl from "~/utils/getUrl";
import { IItem } from "./getUserItems";
import { API } from "~/utils/fetch";

const updateItem = (item: IItem) => (
  API(getUrl(URL.Items), {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).catch(e => {
    console.log(JSON.stringify(e));
  })
)

export default updateItem;
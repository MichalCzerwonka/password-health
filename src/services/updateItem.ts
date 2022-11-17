import { API } from "~/constants";
import getUrl from "~/utils/getUrl";
import { IItem } from "./getUserItems";
import { fetchExtended } from "~/utils/fetch";

const updateItem = (item: IItem) => (
  fetchExtended(getUrl(API.Items), {
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
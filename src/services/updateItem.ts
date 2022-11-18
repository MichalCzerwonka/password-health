import { URL } from "~/constants";
import { IItem } from "./getUserItems";
import { API } from "~/services/api";

const updateItem = (item: IItem) => (
  API(URL.Items, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    }
  }).catch(e => {
    console.log(JSON.stringify(e));
  })
)

export default updateItem;
import { IItem } from "~/services/getUserItems";
import { isOlderThan } from "~/utils/isOlderThan";

const itemHasOldPassword = ({ createdAt }: IItem) => isOlderThan(createdAt, 30);

export default itemHasOldPassword;

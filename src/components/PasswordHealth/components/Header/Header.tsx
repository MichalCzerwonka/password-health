import { FC } from 'react';
import { IItem } from "~/services/getUserItems";
import logout from '../../../../services/logout';

import './header-style.scss';
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({ items, username }) => {
  const atLeastOneVulnerability = items.filter((item) =>
    itemHasOldPassword(item) || itemHasReusedPassword(item, items) || itemHasWeakPassword(item)
  ).length;

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={logout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${atLeastOneVulnerability} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  )
};

export default Header;

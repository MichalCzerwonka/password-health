import { passwords } from '../data';

const items = new Map();

export const updateItem = (item) => {
  items.set(item.id, item);
};

export const getItems = () => {
  return passwords.map((passwordItem) => {
    const updatedItem = items.get(passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  })
};




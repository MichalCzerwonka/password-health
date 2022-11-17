import { createContext, useContext, useEffect, useState } from 'react';
import getUserItems, { IItem } from "~/services/getUserItems";

interface IItems {
  items: IItem[],
  errorMessage: string,
  isLoading: boolean,
  refetch: () => void,
}

const ItemsContext = createContext<IItems>({
  items: [],
  errorMessage: null,
  isLoading: true,
  refetch: () => {
  },
});

export const useItemsContext = () => useContext(ItemsContext);

export const ItemsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([])

  const fetchItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchItems()
  }, []);

  const value = {
    isLoading,
    errorMessage,
    items,
    refetch: fetchItems
  }

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  )
}
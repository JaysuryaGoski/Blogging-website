import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccounts] = useState({ username: '', name: '' });

  return (
    <DataContext.Provider value={{ account, setAccounts }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

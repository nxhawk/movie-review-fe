import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface GlobalContextType {
  isGridView: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isGridView, setIsGridView] = useLocalStorageState({
    key: "global",
    initialState: false,
  });

  return (
    <GlobalContext.Provider
      value={{
        isGridView,
        setIsGridView,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

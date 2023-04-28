import { FC, ReactNode, createContext, useContext, useState } from "react";
import { IUser } from "../interfaces/user";

interface IValue {
  user?: IUser | null;
  setUser?: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IValue>({});

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const value = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): IValue => {
  const value = useContext(AuthContext);
  return value;
};

export { AuthProvider, useAuth };

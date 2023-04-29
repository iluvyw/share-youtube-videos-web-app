import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/user";
import { useFirestore } from "./useFirestore";
import { hash } from "../utils/hash";
import { Response } from "../enums/response";
import { Navigate, useLocation } from "react-router-dom";
import {
  getEncodedData,
  removeDecodedData,
  setEncodedData,
} from "../utils/accessToken";

interface IValue {
  user?: IUser | null;
  signUp?: (username: string, password: string) => Promise<void>;
  signIn?: (username: string, password: string) => Promise<void>;
  logOut?: () => void;
}

const AuthContext = createContext<IValue>({});

interface Props {
  children: ReactNode;
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { addUser, getUser } = useFirestore();

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = getEncodedData();
      if (!currentUser) {
        setUser(null);
        return;
      }
      const data = await getUser(currentUser.username);
      if (!data) {
        removeDecodedData();
        setUser(null);
        return;
      }
      const hashPassword = data.password;
      const salt = data.salt;
      if (hash(currentUser.password + salt) === hashPassword) {
        setUser({
          username: currentUser.username,
          password: currentUser.password,
        });
      } else {
        removeDecodedData();
        setUser(null);
        return;
      }
    }
    getCurrentUser();
  }, []);

  const signUp = async (username: string, password: string) => {
    try {
      const salt: string = Math.floor(Math.random() * 100000).toString();
      const hashPassword: string = hash(password + salt);
      const response = await addUser(username, hashPassword, salt);
      if (response === Response.SUCCESS) {
        alert("Register successfully");
        setUser({ username, password });
        setEncodedData({ username, password });
      } else {
        alert("Server error, please try again");
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again");
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const currentUser = await getUser(username);
      if (!currentUser) return signUp(username, password);
      const hashPassword = currentUser.password;
      const salt = currentUser.salt;
      if (hash(password + salt) === hashPassword) {
        alert("Login Successfully");
        setUser({ username, password });
        setEncodedData({ username, password });
      } else {
        alert("Wrong password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
  };

  const value = { user, signUp, signIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): IValue => {
  const value = useContext(AuthContext);
  return value;
};

export { AuthProvider, useAuth, RequireAuth };

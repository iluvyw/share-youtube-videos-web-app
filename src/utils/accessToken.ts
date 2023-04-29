// import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
// import { getLocalEnvVariable } from "./localEnv";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./localStorage";

const usernameKey = "ENCODED_USERNAME";
const passwordKey = "ENCODED_PASSWORD";

// const { sign, verify } = jwt;

export const setEncodedData = (user: IUser) => {
  const encodedUsername = btoa(user.username);
  const encodedPassword = btoa(user.password);
  setLocalStorage(usernameKey, encodedUsername);
  setLocalStorage(passwordKey, encodedPassword);
};

export const removeDecodedData = () => {
  removeLocalStorage(usernameKey);
  removeLocalStorage(passwordKey);
};

export const getEncodedData = () => {
  const encodedUsername = getLocalStorage(usernameKey);
  const encodedPassword = getLocalStorage(passwordKey);
  if (!encodedUsername || !encodedPassword) {
    removeDecodedData();
    return null;
  } else {
    return {
      username: atob(encodedUsername),
      password: atob(encodedPassword),
    } as IUser;
  }
};

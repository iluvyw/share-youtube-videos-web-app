import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Nav: FC = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const { user, signIn, logOut } = useAuth();

  useEffect(() => {
    async function getData() {
      console.log(user);
    }
    getData();
  }, [user]);

  const onSubmit = useCallback(async () => {
    setInputDisabled(true);
    const username = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    if (username && password) {
      signIn && (await signIn(username, password));
    }
    setInputDisabled(false);
  }, [signIn]);

  return (
    <div className="fixed mx-60 top-0 left-0 w-[calc(100%-30rem)] h-20 bg-white flex flex-row items-center border-b border-black z-10">
      <h1>Funny Movies</h1>
      {user == null || user == undefined ? (
        <>
          <input
            disabled={inputDisabled}
            className="ml-auto border mr-4"
            ref={usernameInputRef}
            placeholder="username"
          />
          <input
            disabled={inputDisabled}
            className="border mr-4"
            ref={passwordInputRef}
            placeholder="password"
          />
          <button disabled={inputDisabled} onClick={onSubmit}>
            Login / Register
          </button>
        </>
      ) : (
        <>
          <h1 className="ml-auto">{user.username}</h1>
          <Link to="/share">Share</Link>
          <button onClick={logOut}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Nav;

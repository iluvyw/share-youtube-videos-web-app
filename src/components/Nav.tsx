import { FC, useCallback, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFirestore } from "../hooks/useFirestore";

const Nav: FC = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuth();
  const { getAllUsers } = useFirestore();
  useEffect(() => {
    async function getData() {
      const users = await getAllUsers();
      console.log(users);
    }
    getData();
  }, [getAllUsers]);

  const onSubmit = useCallback(async () => {
    const username = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const users = await getAllUsers();
    const currentUser = users.find(
      (user) => user?.username === username && user?.password === password
    );
    if (currentUser) {
      setUser &&
        setUser({
          username: currentUser.username,
          password: currentUser.password,
        });
    }
  }, [setUser, getAllUsers]);

  return (
    <div>
      {user == null || user == undefined ? (
        <>
          <input ref={usernameInputRef} placeholder="username" />
          <input ref={passwordInputRef} placeholder="password" />
          <button onClick={onSubmit}>Login</button>
        </>
      ) : (
        <>
          <h1>{user.username}</h1>
          <h1>{user.password}</h1>
          <button
            onClick={() => {
              setUser && setUser(null);
            }}
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default Nav;

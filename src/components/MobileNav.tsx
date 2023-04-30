import { FC, useCallback, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Home from "../assets/home.png";
import Menu from "../assets/menu.png";
import Close from "../assets/close.png";

const MobileNav: FC = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const { user, signIn, logOut } = useAuth();
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    setInputDisabled(true);
    const username = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    if (username && password) {
      if (username.length < 6 || password.length < 6) {
        alert("Username and password should contain more than 6 characters");
      } else {
        signIn && (await signIn(username, password));
        setActive(false);
      }
    }
    setInputDisabled(false);
  }, [signIn]);

  return (
    <div className="hidden sm:flex fixed mx-8 top-0 left-0 w-[calc(100%-4rem)] h-20 bg-white flex-row items-center justify-between border-b border-black z-10">
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={Home}
          alt="home"
          className="w-[40px] h-[40px] object-contain"
        />
      </div>
      <img
        src={Menu}
        alt="menu"
        className="w-[30px] h-[30px] object-contain"
        onClick={() => setActive(true)}
      />
      <div
        className={`fixed top-0 left-0 z-20 h-screen w-screen bg-white flex flex-col items-center justify-center px-8 duration-300 ${
          !active && "-translate-y-[100vh]"
        }`}
      >
        <img
          src={Close}
          alt="close"
          className="absolute right-8 top-8 w-[30px] h-[30px] object-contain"
          onClick={() => setActive(false)}
        />
        {user == null || user == undefined ? (
          <>
            <input
              disabled={inputDisabled}
              className="border border-black outline-none w-full px-4 py-2 mb-10"
              ref={usernameInputRef}
              placeholder="username"
            />
            <input
              disabled={inputDisabled}
              className="border border-black outline-none w-full px-4 py-2 mb-10"
              ref={passwordInputRef}
              placeholder="password"
              type="password"
            />
            <button
              className="border border-black w-full py-2 text-center bg-white hover:bg-black active:bg-black hover:text-white duration-300"
              disabled={inputDisabled}
              onClick={onSubmit}
            >
              Login / Register
            </button>
          </>
        ) : (
          <>
            <h1 className="mb-10">
              Hi <span className="font-semibold">{user.username}</span>
            </h1>
            <Link
              className="mb-10 border border-black w-20 py-2 text-center bg-white hover:bg-black hover:text-white duration-300"
              to="/share"
            >
              Share
            </Link>
            <button
              className="border border-black w-20 py-2 text-center bg-white hover:bg-black hover:text-white duration-300"
              onClick={logOut}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNav;

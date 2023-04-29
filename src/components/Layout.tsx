import { FC } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="relative w-full h-auto">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;

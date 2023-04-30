import { FC } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";

const Layout: FC = () => {
  return (
    <div className="relative w-full h-auto">
      <Nav />
      <MobileNav />
      <Outlet />
    </div>
  );
};

export default Layout;

import { FC, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Post from "./Post";

const Feed: FC = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="flex flex-col items-center pt-28 w-full h-auto">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;

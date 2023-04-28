import { FC, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Feed: FC = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return <div>Feed</div>;
};

export default Feed;

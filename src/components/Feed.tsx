import { FC, useEffect, useState } from "react";
import Post from "./Post";
import { useFirestore } from "../hooks/useFirestore";
import { IVideo } from "../interfaces/video";

const Feed: FC = () => {
  const { getAllVideos } = useFirestore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      const data = await getAllVideos();
      setVideos(data);
      setIsLoading(false);
    }
    fetchVideos();
  }, []);
  return (
    <div className="flex flex-col items-center pt-28 w-full h-auto">
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && videos.length === 0 && <h1>Feed is currently empty</h1>}
      {videos.map((video, index) => (
        <Post data={video} key={index} />
      ))}
    </div>
  );
};

export default Feed;

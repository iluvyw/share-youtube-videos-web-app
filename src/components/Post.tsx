import { FC } from "react";
import { IVideo } from "../interfaces/video";
import Youtube, { YouTubeProps } from "react-youtube";

interface Props {
  data: IVideo;
}

const Post: FC<Props> = ({ data }) => {
  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div
      data-testid={`post-${data.videoId}`}
      className="border border-black w-full h-[calc(200px+2rem)] sm:h-auto my-4 flex flex-row sm:flex-col sm:items-center p-4 bg-white overflow-hidden"
    >
      <div className="h-full w-[300px] flex flex-row items-center justify-center">
        <Youtube videoId={data.videoId} opts={opts} />
      </div>
      <div className="h-full w-full sm:w-[300px] flex flex-col pl-10 sm:pl-0 sm:pt-10">
        <h1 className="font-bold text-xl line-clamp-2 mb-2">{data.title}</h1>
        <h2 className="text-sm font-semibold">
          Shared by {data.author ? data.author : "unknown"}
        </h2>
        <h3 className="text-sm mt-4 mb-2 font-semibold">Description</h3>
        <p className="text-xs line-clamp-3">{data.description}</p>
      </div>
    </div>
  );
};

export default Post;

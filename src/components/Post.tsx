import { FC } from "react";
import { IVideo } from "../interfaces/video";

interface Props {
  data: IVideo;
}

const Post: FC<Props> = ({ data }) => {
  // const opts: YouTubeProps["opts"] = {
  //   height: "360",
  //   width: "500",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 0,
  //   },
  // };

  return (
    <div className="border border-black w-full h-[400px] my-4 flex flex-row p-4 bg-white">
      <div className="h-full w-[800px] flex flex-row items-center">
        <a href={data.url} target="_blank" className="h-full w-full">
          <img
            src={data.thumbnailUrl}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </a>
        {/* <Youtube videoId={data.videoId} opts={opts} /> */}
      </div>
      <div className="h-full w-full flex flex-col pl-10">
        <h1 className="font-bold text-xl line-clamp-3 mb-2">{data.title}</h1>
        <h2 className="text-sm">
          Shared by {data.author ? data.author : "unknown"}
        </h2>
        <h3 className="text-sm mt-4 mb-2">Description</h3>
        <p className="text-xs line-clamp-5">{data.description}</p>
      </div>
    </div>
  );
};

export default Post;

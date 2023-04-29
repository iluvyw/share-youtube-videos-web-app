import { FC, useRef, useState } from "react";
import { youtube_parser } from "../utils/youtube";
import axios from "axios";
import { getLocalEnvVariable } from "../utils/localEnv";
import { useFirestore } from "../hooks/useFirestore";
import { Response } from "../enums/response";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Share: FC = () => {
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addVideo } = useFirestore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      setInputDisabled(true);
      const url = inputRef.current?.value;
      const id = youtube_parser(url ? url : "");

      if (!url || id === false) {
        alert("Invalid Url");
        setInputDisabled(false);
        return;
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${getLocalEnvVariable(
        "VITE_YOUTUBE_API_KEY"
      )}
      &part=snippet`;

      const data = await axios.get(apiUrl);
      const snippet = data.data.items[0].snippet;

      const response = await addVideo({
        title: snippet.title,
        description: snippet.description,
        thumbnailUrl: snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${id}`,
        author: user?.username ? user.username : "",
        videoId: id,
      });

      if (response === Response.SUCCESS) {
        alert("Share Successfully");
        navigate(-1);
      } else {
        alert("Fail to share your video, please try again");
      }

      setInputDisabled(false);
    } catch (error) {
      console.error(error);
      setInputDisabled(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div>
        <h1>Share a Youtube movie</h1>
        <div>
          <h2>Youtube URL</h2>
          <input disabled={inputDisabled} className="border" ref={inputRef} />
        </div>
        <button disabled={inputDisabled} onClick={onSubmit}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;

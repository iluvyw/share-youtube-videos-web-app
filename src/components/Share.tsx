import { FC } from "react";

const Share: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div>
        <h1>Share a Youtube movie</h1>
        <div>
          <h2>Youtube URL</h2>
          <input />
        </div>
        <button>Share</button>
      </div>
    </div>
  );
};

export default Share;

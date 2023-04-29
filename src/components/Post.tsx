import { FC } from "react";

const Post: FC = () => {
  return (
    <div className="border border-black w-full h-[500px] my-4 flex flex-row p-4 bg-white">
      <div className="h-full w-2/3"></div>
      <div className="h-full w-1/3 flex flex-col">
        <h1 className="font-bold text-4xl">Title</h1>
        <h2 className="text-xl">Shared by: anpham</h2>
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique id
          praesentium, deserunt quod quam voluptas, quis pariatur cumque,
          voluptates rem atque sunt. Magnam explicabo maxime harum numquam
          mollitia minima tenetur.
        </p>
      </div>
    </div>
  );
};

export default Post;

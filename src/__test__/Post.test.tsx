import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Post from "../components/Post";
import { IVideo } from "../interfaces/video";

const mockData: IVideo = {
  title: "Video 1",
  author: "",
  description: "This is a description for video 1",
  thumbnailUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyggQHslGIemFyGZbzkZ4eSV0O1Sq-TXDkhQ&usqp=CAU",
  url: "https://www.youtube.com/watch?v=fHCemviY06Y",
  videoId: "fHCemviY06Y",
};

describe("Nav", async () => {
  it("Display unknown author if author in props data is empty", async () => {
    render(<Post data={mockData} />);
    const author = screen.getByText(/unknown/i);
    expect(author).toBeInTheDocument;
  });
});

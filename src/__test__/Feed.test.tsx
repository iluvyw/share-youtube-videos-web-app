import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Feed from "../components/Feed";
import { mockVideos } from "../__mocks__/videos";

const mock: any = {
  getAllUsers: null,
  addUser: null,
  getUser: null,
  addVideo: null,
  getAllVideos: () => undefined,
};

vi.mock("../hooks/useFirestore", () => ({
  useFirestore: () => {
    return mock;
  },
}));

describe("Feed", async () => {
  it("Loading text", async () => {
    render(<Feed />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it("Should render 3 mock posts", async () => {
    mock.getAllVideos = vi.fn().mockResolvedValue(mockVideos);
    render(<Feed />);
    const postDivs = await screen.findAllByTestId(/post-/i);
    expect(postDivs.length).toBe(3);
  });

  it("Should display /Empty Feed/ when there is no post", async () => {
    mock.getAllVideos = vi.fn().mockResolvedValue([]);
    render(<Feed />);
    const text = await screen.findByText(/Feed is currently empty/i);
    expect(text).toBeInTheDocument;
  });
});

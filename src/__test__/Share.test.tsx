import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Share from "../components/Share";

const MockShare = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
};

describe("Share", async () => {
  it("Alert when youtube link is invalid", async () => {
    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => undefined);
    render(<MockShare />);
    const videoInput = screen.getByPlaceholderText(/Youtube URL/i);
    const submitButton = screen.getByRole("button");
    fireEvent.change(videoInput, { target: { value: "abc123" } });
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Nav from "../components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MockNav = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />} />
      </Routes>
    </BrowserRouter>
  );
};

describe("Nav", async () => {
  it("Alert when username or password length less than 6", async () => {
    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => undefined);
    render(<MockNav />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/Login/i);
    fireEvent.change(usernameInput, { target: { value: "an" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});

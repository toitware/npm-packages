import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CookieConsent } from ".";

test("clicking the close button hides the notice", () => {
  const reloadFunction = jest.fn();

  // Note that this is only possible, because we made `window.location` writable
  // in `jest.setup.js`
  window.location.reload = reloadFunction;

  render(<CookieConsent show={true} segmentKey="123" changeConsent={false} />);

  const closeButton = screen.getByRole("button");
  fireEvent.click(closeButton);

  // The close button should have disappeared
  expect(screen.queryByRole("button")).toBeNull();

  // The page should have been reloaded.
  expect(reloadFunction).toHaveBeenCalled();
  (window.location.reload as jest.Mock).mockRestore();
});

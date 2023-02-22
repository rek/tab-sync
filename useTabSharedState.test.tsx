import React, { useEffect } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";

import { useTabSharedState } from "./useTabSharedState";

const KEY = "test-key";
const AppA = () => {
  const [value, setValue] = useTabSharedState<number>(KEY, 1);

  useEffect(() => {
    setValue(5);
  }, []);

  return <div>A: {value}</div>;
};

const AppB = () => {
  const [value] = useTabSharedState<number>(KEY, 1);

  return <div>B: {value}</div>;
};

const App = () => {
  return (
    <div>
      <AppA />
      <AppB />
    </div>
  );
};

test("state syncs changes after loading", async () => {
  render(<App />); // default testing lib
  const stateAValue = screen.getByText(/A: 5/i);
  expect(stateAValue).toBeInTheDocument();

  const stateBInitialValue = screen.getByText(/B: 1/i);
  expect(stateBInitialValue).toBeInTheDocument();

  // fake the storage even that the browser would have triggered:
  act(() => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: KEY,
      })
    );
  });

  await waitFor(() => {
    const stateBValue = screen.getByText(/B: 5/i);
    return expect(stateBValue).toBeInTheDocument();
  });
});

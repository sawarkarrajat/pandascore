import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";

describe("App component exists", () => {
  it("Testing App Component exists", () => {
    expect(shallow(<App />).exists()).toBe(true);
  });
});

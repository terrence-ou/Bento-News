import "@testing-library/jest-dom";
import "./utils/window.mock";
// import { render, screen, fireEvent } from "./utils";
import { expect, test } from "vitest";
// import { act } from "react";
// import App from "@/App";

describe("Base test", () => {
  test("1 + 2 = 3", () => {
    expect(1 + 2).toBe(3);
  });
});

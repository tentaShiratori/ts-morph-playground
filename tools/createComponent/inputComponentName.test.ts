import { inputComponentName } from "./inputComponentName";
import { describe, expect, it, vi } from 'vitest'

vi.mock("inquirer", () => ({
  prompt: vi.fn(() => Promise.resolve({ componentName: "test" })),
}));
describe("inputComponentName", () => {
  it("should return component name", async () => {
    const result = await inputComponentName();

    expect(result).toEqual("Test");
  });
});

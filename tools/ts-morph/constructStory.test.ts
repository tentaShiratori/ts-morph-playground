import { Project } from "ts-morph";
import { constructStory } from "./constructStory";
import { describe, expect, it } from 'vitest'

describe("constructStory", () => {
  it("should construct a component", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile("Test.tsx", "");
    constructStory(sourceFile, "foo", "Test");
    expect(sourceFile.getText()).toBe(`import { Meta, StoryObj } from "@storybook/react";
import { Test } from "./Test";

const meta: Meta<typeof Test> = { title: "foo/Test", component: Test, tags: [], argTypes: {} };

export default meta;

type Story = StoryObj<typeof Test>;

export const Primary: Story = {};
`);
  });
});

import { Project } from "ts-morph";
import { constructComponent } from "./constructComponent";
import { describe, expect, it } from 'vitest'

describe("constructComponent", () => {
  it("should construct a component", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile("Test.tsx", "");
    constructComponent(sourceFile, "Test");
    expect(sourceFile.getText()).toBe(`import { FC } from "react";

export const Test: FC = () => { return <div />; };
`);
  });
});

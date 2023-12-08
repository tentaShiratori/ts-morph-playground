import { createWrappedNode, NodeFlags, SyntaxKind,ts } from "ts-morph";
import { runWithDigKind } from "./runWithDigKind";
import { describe, expect, it, vi } from 'vitest'

const {factory}=ts

describe("runWithDigKind", () => {
  it("should run the callback when the node is of the given kind", () => {
    const sourceFile = factory.createSourceFile([], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None);
    const node = createWrappedNode(
      factory.createVariableDeclaration("test", undefined, factory.createTypeReferenceNode("Test")),
      {
        sourceFile,
      },
    );
    const callback = vi.fn();
    runWithDigKind(
      node,
      [SyntaxKind.VariableDeclaration, (node) => node?.getTypeNode()],
      [SyntaxKind.TypeReference, (node) => node?.getTypeName()],
      [SyntaxKind.Identifier, callback],
    );
    expect(callback).toBeCalled();
  });
  it("should not run the callback when the node is not of the given kind", () => {
    const sourceFile = factory.createSourceFile([], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None);
    const node = createWrappedNode(
      factory.createVariableDeclaration("test", undefined, factory.createTypeReferenceNode("Test")),
      {
        sourceFile,
      },
    );
    const callback = vi.fn();
    runWithDigKind(
      node,
      [SyntaxKind.VariableDeclaration, (node) => node?.getTypeNode()],
      [SyntaxKind.Identifier, callback],
    );
    expect(callback).not.toBeCalled();
  });
});

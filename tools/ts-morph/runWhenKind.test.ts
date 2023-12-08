import { createWrappedNode, NodeFlags, SyntaxKind,ts } from "ts-morph";
import { runWhenKind } from "./runWhenKind";
import { describe, expect, it, vi } from 'vitest'

const {factory}=ts

describe("runWhenKind", () => {
  it("should run the callback when the node is of the given kind", () => {
    const sourceFile = factory.createSourceFile([], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None);
    const identifier = createWrappedNode(factory.createIdentifier("test"), {
      sourceFile,
    });
    const callback = vi.fn();
    runWhenKind(identifier, SyntaxKind.Identifier, callback);
    expect(callback).toBeCalledWith(identifier);
  });
  it("should not run the callback when the node is not of the given kind", () => {
    const sourceFile = factory.createSourceFile([], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None);
    const identifier = createWrappedNode(factory.createIdentifier("test"), {
      sourceFile,
    });
    const callback = vi.fn();
    runWhenKind(identifier, SyntaxKind.StringLiteral, callback);
    expect(callback).not.toBeCalled();
  });
});

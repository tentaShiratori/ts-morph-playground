import { KindToNodeMappings, SyntaxKind, Node } from "ts-morph";
import { runWhenKind } from "./runWhenKind";

export function runWithDigKind<A extends SyntaxKind, B extends SyntaxKind>(
  node: Node,
  a: [A, (node: KindToNodeMappings[A] | undefined) => Node | undefined],
  b: [B, (node: KindToNodeMappings[B] | undefined) => Node | undefined],
): Node | undefined;

export function runWithDigKind<A extends SyntaxKind, B extends SyntaxKind, C extends SyntaxKind>(
  node: Node,
  a: [A, (node: KindToNodeMappings[A] | undefined) => Node | undefined],
  b: [B, (node: KindToNodeMappings[B] | undefined) => Node | undefined],
  c: [C, (node: KindToNodeMappings[C] | undefined) => Node | undefined],
): Node | undefined;

export function runWithDigKind<A extends SyntaxKind, B extends SyntaxKind, C extends SyntaxKind, D extends SyntaxKind>(
  node: Node,
  a: [A, (node: KindToNodeMappings[A] | undefined) => Node | undefined],
  b: [B, (node: KindToNodeMappings[B] | undefined) => Node | undefined],
  c: [C, (node: KindToNodeMappings[C] | undefined) => Node | undefined],
  d: [D, (node: KindToNodeMappings[D] | undefined) => Node | undefined],
): Node | undefined;

export function runWithDigKind(
  node: Node,
  ...rest: [SyntaxKind, (node: Node | undefined) => Node | undefined][]
): Node | undefined {
  let result: Node | undefined = node;

  for (const [kind, callback] of rest) {
    result = runWhenKind(result, kind, callback);

    if (result == null) {
      break;
    }
  }

  return result;
}

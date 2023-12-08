import { KindToNodeMappings, Node,SyntaxKind } from "ts-morph";

export function runWhenKind<K extends SyntaxKind, R>(
  node: Node | undefined,
  kind: K,
  callback: (node: KindToNodeMappings[K]) => R,
): R | undefined {
  if (node?.isKind(kind)) {
    return callback(node);
  }
}

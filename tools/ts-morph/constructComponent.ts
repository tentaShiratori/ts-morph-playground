import { VariableDeclarationKind, printNode, SourceFile, SyntaxKind,ts } from "ts-morph";

const { factory } = ts;

export function constructComponent(componentFile: SourceFile, componentName: string) {
  componentFile.addImportDeclaration({
    namedImports: ["FC"],
    moduleSpecifier: "react",
  });
  componentFile.addVariableStatement({
    declarations: [
      {
        name: componentName,
        type: "FC",
        initializer: printNode(
          factory.createArrowFunction(
            undefined,
            undefined,
            [],
            undefined,
            factory.createToken(SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock([
              factory.createReturnStatement(
                factory.createJsxSelfClosingElement(
                  factory.createIdentifier("div"),
                  undefined,
                  factory.createJsxAttributes([]),
                ),
              ),
            ]),
          ),
        ),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
  });
}

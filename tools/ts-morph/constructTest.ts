import { VariableDeclarationKind, printNode, SourceFile,ts,SyntaxKind } from "ts-morph";

const { factory } = ts;

export function constructTest(testFile: SourceFile, componentName: string) {
  testFile.addImportDeclaration({
    namespaceImport: componentName,
    moduleSpecifier: `./${componentName}.stories`,
  });

  testFile.addImportDeclaration({
    namedImports: ["composeStories"],
    moduleSpecifier: "@storybook/react",
  });
  testFile.addImportDeclaration({
    namedImports: ["render"],
    moduleSpecifier: "@testing-library/react",
  });
  testFile.addVariableStatement({
    declarations: [
      {
        name: "{Primary}",
        initializer: printNode(
          factory.createCallExpression(factory.createIdentifier("composeStories"), undefined, [
            factory.createIdentifier(componentName),
          ]),
        ),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });
  testFile.addStatements([
    printNode(
      factory.createCallExpression(factory.createIdentifier("describe"), undefined, [
        factory.createStringLiteral(componentName),
        factory.createArrowFunction(
          undefined,
          undefined,
          [],
          undefined,
          factory.createToken(SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock([
            factory.createExpressionStatement(
              factory.createCallExpression(factory.createIdentifier("it"), undefined, [
                factory.createStringLiteral("renders correctly"),
                factory.createArrowFunction(
                  undefined,
                  undefined,
                  [],
                  undefined,
                  factory.createToken(SyntaxKind.EqualsGreaterThanToken),
                  factory.createBlock([
                    factory.createExpressionStatement(
                      factory.createCallExpression(factory.createIdentifier("render"), undefined, [
                        factory.createJsxSelfClosingElement(
                          factory.createIdentifier("Primary"),
                          undefined,
                          factory.createJsxAttributes([]),
                        ),
                      ]),
                    ),
                  ]),
                ),
              ]),
            ),
          ]),
        ),
      ]),
    ),
  ]);
}

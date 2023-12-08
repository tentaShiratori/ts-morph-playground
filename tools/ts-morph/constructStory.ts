import path from "path";
import { VariableDeclarationKind, printNode, SourceFile,ts } from "ts-morph";

const { factory } = ts;

export function constructStory(storyFile: SourceFile, dirPath: string, componentName: string) {
  storyFile.addImportDeclaration({
    namedImports: ["Meta", "StoryObj"],
    moduleSpecifier: "@storybook/react",
  });
  storyFile.addImportDeclaration({
    namedImports: [componentName],
    moduleSpecifier: "./" + componentName,
  });
  const typeofComponent = factory.createTypeQueryNode(factory.createIdentifier(componentName));

  const title = dirPath.replaceAll(path.sep, "/").replace(".stories.tsx", "").concat("/", componentName);

  storyFile.addVariableStatement({
    declarations: [
      {
        name: "meta",
        type: printNode(factory.createTypeReferenceNode("Meta", [typeofComponent])),
        initializer: printNode(
          factory.createObjectLiteralExpression([
            factory.createPropertyAssignment("title", factory.createStringLiteral(title)),
            factory.createPropertyAssignment("component", factory.createIdentifier(componentName)),
            factory.createPropertyAssignment("tags", factory.createArrayLiteralExpression([])),
            factory.createPropertyAssignment("argTypes", factory.createObjectLiteralExpression()),
          ]),
        ),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });
  storyFile.addExportAssignment({ expression: "meta", isExportEquals: false });
  storyFile.addTypeAlias({
    name: "Story",
    type: printNode(factory.createTypeReferenceNode("StoryObj", [typeofComponent])),
  });
  storyFile.addVariableStatement({
    declarations: [
      {
        name: "Primary",
        type: "Story",
        initializer: printNode(factory.createObjectLiteralExpression()),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
  });
}

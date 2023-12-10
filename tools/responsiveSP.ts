import path from "path";
import { Node, Project, SyntaxKind } from "ts-morph";
import { escapeRegExp } from "./utils/escapeRegExp";


const projectPath = path.join(__dirname, "..");

async function main(
) {
  const project = new Project({
    tsConfigFilePath: path.join(projectPath, "tsconfig.json"),
  });
  // biome-ignore lint/complexity/noForEach: <explanation>
project
    .getDirectory(path.join(projectPath, "components"))
    ?.getDescendantSourceFiles()
    .forEach((sourceFile) => {
      sourceFile.forEachDescendant((node) => {
        if (
          node.isKind(SyntaxKind.JsxAttribute) &&
          node.getNameNode().getText() == "className"
        ) {
          const initializer = node.getInitializerOrThrow();
          initializer.forEachDescendant((node) => {
            if (node.isKind(SyntaxKind.StringLiteral)) {
              replaceClassName(initializer, 350);
            }
          });

          if (initializer.isKind(SyntaxKind.StringLiteral)) {
            replaceClassName(initializer, 350);
          }
        }
      });
    });
  await project.save();
}

function replaceClassName(node: Node, width: number) {
  const text = node.getText();
  let newText = text;
  const reg = /([a-zA-Z:-]*)-\[([-0-9]*px)\]/g;
  let result = reg.exec(text);
  while (result) {
    const [org, prop, px] = result;
    const num = parseInt(px);
    const vw = ((num / width) * 100).toFixed(2);
    const vwStr =`${prop}-[${vw}vw]`
    newText = newText.replace(
      new RegExp(`(?<![a-zA-Z-])${escapeRegExp(org)}`),
      vwStr,
    );

    result = reg.exec(text);
  }
  node.replaceWithText(newText);
}

void main();
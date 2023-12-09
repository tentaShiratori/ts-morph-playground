import fs from "fs";
import path from "path";
import { Project } from "ts-morph";
import { fileURLToPath } from "url";
import { inputComponentName } from "./createComponent/inputComponentName";
import { inputFilePath } from "./createComponent/inputFilePath";
import { constructComponent } from "./ts-morph/constructComponent";
import { constructStory } from "./ts-morph/constructStory";
import { exec } from "./utils/exec";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(dirname, "../components");

async function main() {
  const componentName = await inputComponentName();
  const filePath = await inputFilePath(componentName);

  const componentDir = path.resolve(componentsDir, filePath);

  const componentFilePath = path.join(componentDir, componentName + ".tsx");
  const storyFilePath = path.join(componentDir, componentName + ".stories.tsx");

  fs.mkdirSync(componentDir, { recursive: true });

  const project = new Project({});
  const componentFile = project.createSourceFile(componentFilePath);
  constructComponent(componentFile, componentName);
  const storyFile = project.createSourceFile(storyFilePath);
  constructStory(storyFile, filePath, componentName);
  project.saveSync();

  await exec(`pnpm prettier --write ${componentFilePath} ${storyFilePath}`);
}

void main();

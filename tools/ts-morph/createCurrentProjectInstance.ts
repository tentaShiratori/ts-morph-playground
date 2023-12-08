import path from "path";
import { Project } from "ts-morph";
import { projectPath } from "../utils/constants";

export function createCurrentProjectInstance() {
  return new Project({
    tsConfigFilePath: path.resolve(projectPath, "tsconfig.json"),
  });
}

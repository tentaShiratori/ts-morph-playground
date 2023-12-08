import path from "path";
import { fileURLToPath } from "url";

export const projectPath = path.join(fileURLToPath(import.meta.url), "../../../");

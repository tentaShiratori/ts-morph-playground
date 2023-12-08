import fs from "fs";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import path from "path";

inquirer.registerPrompt("autocomplete", inquirerPrompt);
const componentsDir = path.resolve(process.cwd(), "components");

function digComponentDir(childPath: string) {
  return fs
    .readdirSync(path.join(componentsDir, childPath), {
      withFileTypes: true,
    })
    .filter((file) => file.isDirectory())
    .map((file) => file.name);
}

export async function inputFilePath(componentName: string) {
  let filePath = "";
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const CreateComponentCommand = "<Create Component>";
    const ComponentNameDirectoryCommand = "<Component Name Directory>";
    const newDirSuffix = "(new directory)";
    const { dirname } = await inquirer.prompt<{ dirname: string }>([
      {
        type: "autocomplete",
        name: "dirname",
        message: `Enter new component path ${filePath && path.normalize(filePath + "/")}`,
        source: async (_: unknown, input?: string) => {
          await Promise.resolve();

          if (!input) {
            const defaultSelect = [CreateComponentCommand, ComponentNameDirectoryCommand];
            let files: string[] = [];
            try {
              files = digComponentDir(filePath);
            } catch (e) { /* empty */ }

            return defaultSelect.concat(files);
          }

          let files: string[] = [];

          if (fs.existsSync(path.join(componentsDir, filePath, input))) {
            return [input, ...digComponentDir(path.join(filePath, input)).map((file) => path.join(input, file))];
          }
          try {
            files = digComponentDir(path.join(filePath, input, "../"))
              .filter((file) => {
                const arr = input.split(path.sep);

                return file.startsWith(arr[arr.length - 1]);
              })
              .map((file) => path.join(input, "../", file));
          } catch (e) { /* empty */ }

          files = [...files, input + newDirSuffix];

          return files;
        },
      },
    ]);

    if (dirname.includes(CreateComponentCommand)) {
      filePath = path.join(filePath);
      break;
    }

    if (dirname.includes(ComponentNameDirectoryCommand)) {
      filePath = path.join(filePath, componentName);
      break;
    }

    if (dirname.includes(newDirSuffix)) {
      filePath = path.join(filePath, dirname.replace(newDirSuffix, ""));
      continue;
    }
    filePath = path.join(filePath, dirname);
  }

  return filePath;
}

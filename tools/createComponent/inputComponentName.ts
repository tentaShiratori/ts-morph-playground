import inquirer from "inquirer";

export async function inputComponentName() {
  let { componentName } = await inquirer.prompt<{ componentName: string }>([
    {
      name: "componentName",
      message: "Enter new component name",
    },
  ]);
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  return componentName;
}

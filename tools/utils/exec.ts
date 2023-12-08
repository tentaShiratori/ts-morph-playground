import { spawn } from "child_process";

/**
 * コマンドを実行する
 *
 * 子プロセスの標準入出力を親プロセスの標準入出力に接続するためにspawnをラップしている
 * @param command
 * @returns
 */
export function exec(command: string) {
  const args = command.split(" ");

  return new Promise<void>((resolve, reject) => {
    const child = spawn(args[0], args.slice(1), {
      stdio: "inherit",
      // shell: trueにしないと、Windowsでコマンドが実行できない
      // https://stackoverflow.com/questions/37459717/error-spawn-enoent-on-windows
      shell: true,
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(" ")}`));

        return;
      }
      resolve();
    });
  });
}

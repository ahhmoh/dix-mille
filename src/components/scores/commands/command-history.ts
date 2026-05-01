import { Command } from "./command";

export class CommandHistory {
  private commands: Command[] = [];

  public push(command: Command) {
    this.commands.push(command);
  }

  public pop(): Command | undefined {
    return this.commands.pop();
  }

  public reset() {
    this.commands = [];
  }
}
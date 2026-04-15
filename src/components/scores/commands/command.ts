import { Player } from "../../player/player";

export interface Command {
  execute: () => void;
  undo: () => void;
}
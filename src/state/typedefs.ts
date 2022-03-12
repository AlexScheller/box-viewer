import type { TSelector } from "../minidux/typedefs";
import type { TStateScene } from "./scene/typedefs";
import type { TStateUI } from "./ui/typedefs";

export type TStateRoot = {
  ui: TStateUI;
  scene: TStateScene;
};

export type TRootSelector<T> = TSelector<TStateRoot, T>;

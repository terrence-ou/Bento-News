import { atom } from "jotai";

export const foldersAtom = atom<string[]>([]);
export const readFoldersAtom = atom((get) => get(foldersAtom));
export const setFoldersAtom = atom(
  null,
  (_, set, folders: string[]) => {
    set(foldersAtom, folders);
  }
);

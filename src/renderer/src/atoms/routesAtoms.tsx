import { atom } from "jotai";

const folderRouteAtom = atom<string | undefined>(undefined);
export const readFolderRouteAtom = atom((get) =>
  get(folderRouteAtom)
);
export const setFolderRouteAtom = atom(
  null,
  (_, set, folderName: string | undefined) =>
    set(folderRouteAtom, folderName)
);

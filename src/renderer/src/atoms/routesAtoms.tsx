import { atom } from "jotai";
import { selectedArticlesAtom } from "./foldersAtoms";

const folderRouteAtom = atom<string | undefined>(undefined);
export const readFolderRouteAtom = atom((get) =>
  get(folderRouteAtom)
);

// navigate to a folder and reset selected articles
export const setFolderRouteAtom = atom(
  null,
  (_, set, folderName: string | undefined) => {
    set(folderRouteAtom, folderName);
    set(selectedArticlesAtom, []);
  }
);

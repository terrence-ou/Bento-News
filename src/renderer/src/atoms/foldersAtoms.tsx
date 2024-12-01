import { atom } from "jotai";
import { Article } from "@shared/models/Articles";
import { SubEditor } from "@shared/consts";

// folder-related atoms
export const foldersAtom = atom<string[]>([]);
export const readFoldersAtom = atom((get) => get(foldersAtom));
export const setFoldersAtom = atom(
  null,
  (_, set, folders: string[]) => {
    set(foldersAtom, folders);
  }
);

// Editor-related atoms
export const selectedArticlesAtom = atom<Article[]>([]);
export const includeSelectedArticlesAtom = atom<boolean>(true);
export const editorAtom = atom<SubEditor>(SubEditor.summary);
export const currEditorAtom = atom((get) => get(editorAtom));

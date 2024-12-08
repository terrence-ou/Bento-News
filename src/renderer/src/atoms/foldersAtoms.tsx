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
export const typingEffectAtom = atom<boolean>(false);
export const includeSelectedArticlesAtom = atom<boolean>(true);
export const editorAtom = atom<SubEditor>(SubEditor.summary);

export const currEditorAtom = atom((get) => get(editorAtom));
export const typing = atom((get) => get(typingEffectAtom));
export const toggleTyping = atom(null, (_, set, value: boolean) => {
  set(typingEffectAtom, value);
});

// Image generation is slow, user might navigate away from the img editor
// there we need to keep track of the state globally
export const generatingImg = atom<boolean>(false);

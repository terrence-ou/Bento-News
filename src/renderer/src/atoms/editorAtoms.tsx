import { SubEditor } from "@shared/consts";
import { atom } from "jotai";

export const editorAtom = atom<SubEditor>(SubEditor.summary);

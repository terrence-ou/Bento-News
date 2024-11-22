import { SearchParams } from "@shared/types";
import { atom } from "jotai";

export const searchBoxExpandedAtom = atom<boolean>(false);
export const searchQueryAtom = atom<SearchParams>({});

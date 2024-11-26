import { SearchParams } from "@shared/types";
import { atom } from "jotai";

export const searchBoxExpandedAtom = atom<boolean>(false);

export const searchLayoutAtom = atom<"full" | "mini" | "list">(
  "list"
);

export const displaySortByAtom = atom<
  "date-new" | "date-old" | "source-a-z" | "source-z-a"
>("date-new");

export const searchQueryAtom = atom<SearchParams>({
  language: "English",
  sortBy: "Relevance",
});

export const searchCountAtom = atom<number>(0);

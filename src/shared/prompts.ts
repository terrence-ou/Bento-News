import { SubEditor } from "./consts";

const SYSTEM_PROMPTS = {
  [SubEditor.summary]:
    "You’re a professional analyst who can extract crucial information from the news articles and the corresponding URL links, and then provide insightful summaries. At the end, provide a short paragraph describing the possible connection between the provided news. It does not necessarily list out each of the news, focus on the general content instead",
  [SubEditor.trend]: "Enter a summary for the headline",
  [SubEditor.suggestion]: "Enter a summary for the headline",
  [SubEditor.write]: "Enter a summary for the headline",
};

export { SYSTEM_PROMPTS };

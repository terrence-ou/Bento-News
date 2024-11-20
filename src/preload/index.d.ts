import {
  LoadHeadlines,
  GetHeadlinesFn,
  LoadApiKeys,
  WriteApiKeys,
  LoadHeadlineSettings,
  WriteHeadlineSettings,
  RemoveTodayHeadlines,
} from "@shared/types";

// Type definition for the preload process
declare global {
  interface Window {
    context: {
      getHeadlines: GetHeadlinesFn;
      loadTodayHeadlines: LoadHeadlines;
      loadPrevHeadlines: LoadHeadlines;
      loadApiKeys: LoadApiKeys;
      loadHeadlineSettings: LoadHeadlineSettings;
      writeApiKeys: WriteApiKeys;
      writeHeadlineSettings: WriteHeadlineSettings;
      removeTodayHeadlines: RemoveTodayHeadlines;
    };
  }
}

import {
  LoadHeadlinesFn,
  GetHeadlinesFn,
  LoadApiKeysFn,
  WriteApiKeysFn,
  LoadHeadlineSettingsFn,
  WriteHeadlineSettingsFn,
  RemoveTodayHeadlinesFn,
} from "@shared/types";

// Type definition for the preload process
declare global {
  interface Window {
    context: {
      getHeadlines: GetHeadlinesFn;
      loadTodayHeadlines: LoadHeadlinesFn;
      loadPrevHeadlines: LoadHeadlinesFn;
      loadApiKeys: LoadApiKeysFn;
      loadHeadlineSettings: LoadHeadlineSettingsFn;
      writeApiKeys: WriteApiKeysFn;
      writeHeadlineSettings: WriteHeadlineSettingsFn;
      removeTodayHeadlines: RemoveTodayHeadlinesFn;
    };
  }
}

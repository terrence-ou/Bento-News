import {
  LoadHeadlinesFn,
  GetHeadlinesFn,
  GetSearchResultsFn,
  LoadApiKeysFn,
  WriteApiKeysFn,
  LoadHeadlineSettingsFn,
  LoadSearchResultsFn,
  LoadUserFoldersFn,
  WriteHeadlineSettingsFn,
  RemoveTodayHeadlinesFn,
} from "@shared/types";

// Type definition for the preload process
declare global {
  interface Window {
    context: {
      getHeadlines: GetHeadlinesFn;
      getSearchResults: GetSearchResultsFn;
      loadTodayHeadlines: LoadHeadlinesFn;
      loadPrevHeadlines: LoadHeadlinesFn;
      loadSearchResults: LoadSearchResultsFn;
      loadApiKeys: LoadApiKeysFn;
      loadHeadlineSettings: LoadHeadlineSettingsFn;
      loadUserFolders: LoadUserFoldersFn;
      writeApiKeys: WriteApiKeysFn;
      writeHeadlineSettings: WriteHeadlineSettingsFn;
      removeTodayHeadlines: RemoveTodayHeadlinesFn;
    };
  }
}

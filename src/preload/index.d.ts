import {
  GetHeadlinesFn,
  GetSearchResultsFn,
  LoadHeadlinesFn,
  LoadApiKeysFn,
  LoadHeadlineSettingsFn,
  LoadSearchResultsFn,
  LoadUserFoldersFn,
  WriteApiKeysFn,
  WriteHeadlineSettingsFn,
  RemoveTodayHeadlinesFn,
  ManageFolderFn,
  ManageFolderArticleFn,
  LoadFolderContentsFn,
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
      loadFolderContents: LoadFolderContentsFn;
      writeApiKeys: WriteApiKeysFn;
      writeHeadlineSettings: WriteHeadlineSettingsFn;
      removeTodayHeadlines: RemoveTodayHeadlinesFn;
      createUserFolder: ManageFolderFn;
      removeUserFolder: ManageFolderFn;
      addArticleToFolder: ManageFolderArticleFn;
      removeArticleFromFolder: ManageFolderArticleFn;
    };
  }
}

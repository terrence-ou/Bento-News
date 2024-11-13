import { GetVersionsFn, GetHeadlinesFn } from "@shared/types";

// Type definition for the preload process
declare global {
  interface Window {
    context: {
      getVersions: GetVersionsFn;
      triggerIPC: () => void;
      getHeadlines: GetHeadlinesFn;
    };
  }
}

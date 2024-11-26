import Headlines from "./routes/headlines";
import Root from "./routes/root";
import Search from "./routes/search";
import Folders from "./routes/folders";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Articles } from "@shared/models/Articles";
import Workspace, {
  loader as workspaceLoader,
} from "./routes/workspace";

/* ========= Route functions ========== */
// load headlines
const headlineLoader = async () => {
  const [todayHeadlines, prevHeadlines, prevDays] = await Promise.all(
    [
      // load today's headlines
      window.context.loadTodayHeadlines().then(async (headlines) => {
        if (headlines === undefined) {
          await window.context.getHeadlines();
          return window.context.loadTodayHeadlines();
        }
        return headlines;
      }),
      // load previous headlines
      window.context.loadPrevHeadlines(),
      window.context
        .loadHeadlineSettings()
        .then(async (settings) => settings.previous_days),
    ]
  );
  return {
    todayHeadlines: todayHeadlines || new Articles([]),
    prevHeadlines: prevHeadlines || new Articles([]),
    prevDays,
  };
};

// load search results
const searchResultsLoader = async () => {
  const searchResults = await window.context.loadSearchResults();
  return searchResults || new Articles([]);
};

// load user folders
const userFoldersLoader = async () => {
  const folders = await window.context.loadUserFolders();
  return folders;
};

// router definition
const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Navigate to="headlines" /> },
        {
          path: "headlines",
          element: <Headlines />,
          loader: headlineLoader,
        },
        {
          path: "search",
          element: <Search />,
          loader: searchResultsLoader,
          children: [],
        },
        {
          path: "folders",
          element: <Folders />,
          loader: userFoldersLoader,
        },
        {
          path: "folders/:folderName",
          element: <Workspace />,
          loader: workspaceLoader,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

/*  ========== The App body ========== */
const App = () => {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  );
};

export default App;

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { setFoldersAtom } from "@/atoms/foldersAtoms";
import Root from "@/routes/root";
import Headlines, {
  loader as headlineLoader,
} from "@/routes/headlines";
import Search, {
  loader as searchResultsLoader,
} from "@/routes/search";
import Folders, {
  loader as userFoldersLoader,
} from "@/routes/folders";
import Workspace, {
  loader as workspaceLoader,
} from "@/routes/workspace";

/* ========= Route functions ========== */

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
  const setUserFolders = useSetAtom(setFoldersAtom);

  useEffect(() => {
    (async () => {
      setUserFolders(await window.context.loadUserFolders());
    })();
  }, []);

  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  );
};

export default App;

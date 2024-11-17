import Headlines from "./routes/headlines";
import Root from "./routes/root";
import Search from "./routes/search";
import Folders from "./routes/folders";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Articles } from "@shared/models/Articles";

// Loaders
// load headlines
const headlineLoader = async () => {
  const [todayHeadlines, prevHeadlines] = await Promise.all([
    window.context.loadTodayHeadlines().then(async (headlines) => {
      if (headlines === undefined) {
        await window.context.getHeadlines();
        return window.context.loadTodayHeadlines();
      }
      return headlines;
    }),
    window.context.loadPrevHeadlines(),
  ]);
  return {
    todayHeadlines: todayHeadlines || new Articles([]),
    prevHeadlines: prevHeadlines || new Articles([]),
  };
};

// router definition
const router = createBrowserRouter(
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
        { path: "search", element: <Search />, children: [] },
        { path: "folders", element: <Folders />, children: [] },
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

// The App body
const App = () => {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  );
};

export default App;

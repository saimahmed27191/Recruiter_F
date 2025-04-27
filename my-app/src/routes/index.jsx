import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
console.log("✅ Home page loaded:", Home);
import Interview from "../pages/Interview";
import InterviewInfo from "../pages/InterviewInfo";
import InterviewPerformanceAnalysis from "../pages/InterviewPerformanceAnalysis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <Home /> },
      { path: "interview", element: <Interview /> },
      { path: "info", element: <InterviewInfo /> },
      { path: "analysis", element: <InterviewPerformanceAnalysis /> },
    ],
  },
]);

export default router;

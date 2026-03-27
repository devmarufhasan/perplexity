import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { router } from "./app.routes";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, [handleGetMe]);

  return <RouterProvider router={router} />;
};

export default App;

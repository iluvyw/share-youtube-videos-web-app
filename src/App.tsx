import Feed from "./components/Feed";
import Layout from "./components/Layout";
import Share from "./components/Share";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
          <Route
            path="/share"
            element={
              <RequireAuth>
                <Share />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

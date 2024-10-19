import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/login";

import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Verification from "./pages/verification/verification";
import Signup from "./pages/signup/signup";

const store = createStore({
  authName: "author_token",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const AppRoutes = () => {
  return (
    <AuthProvider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<AuthOutlet fallbackPath="/" />}>
          <Route path="/verify" element={<Verification />} />
        </Route>

        <Route
          path="/*"
          element={
            <>
              <h1>Not Found</h1>
            </>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;

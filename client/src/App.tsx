import React, { useEffect } from "react";
import { NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import SideMenu from "./pages/SideMenu";
import { useUser } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import Protected from "./Auth/Protected";
// import { baseURL } from "./Auth/axiosbaseurl";
// import Session from "./Auth/Session";

interface Props {}

const App: React.FC<Props> = ({}) => {
  // const navigate: NavigateFunction = useNavigate();

  const { isSignedIn } = useUser();

  return (
    <main className="flex w-full  h-screen">
      {isSignedIn && <SideMenu />}
      <Routes>
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <Protected />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </main>
  );
};

export default App;

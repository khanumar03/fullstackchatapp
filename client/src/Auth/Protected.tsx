import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddFriend from "../pages/AddFriend";
import RequestList from "../pages/RequestList";
import { useUser } from "@clerk/clerk-react";
import { baseURL } from "./axiosbaseurl";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/reduxhook";
import { updateuserdata } from "../redux/reduxSlices";
import { socket } from "./socket";

const Protected: React.FC<{}> = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { userState, change } = useAppSelector((state) => state.userdata);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUser() {
      if (isLoaded && isSignedIn) {
        await baseURL({
          method: "POST",
          url: "/api/createuser",
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: {
            username: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            pic: user.imageUrl,
            authID: user.id,
          },
        })
          .then((saved) => {
            if (!change) {
              toast.success(saved.data.message, { duration: 2000 });
            }
            dispatch(updateuserdata(saved.data.data));

            socket.emit("clientroom", {
              id: saved.data.data.id,
              email: saved.data.data.email,
            });
          })
          .catch((err) => console.log(err));
      }
    }

    getUser();
  }, [change]);

  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default Protected;

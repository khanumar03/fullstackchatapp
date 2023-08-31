import React, { useEffect } from "react";
import { Route, Routes, useParams, useSearchParams } from "react-router-dom";
import ChatField from "./ChatField";
import { socket } from "../Auth/socket";
import { useAppDispatch, useAppSelector } from "../redux/reduxhook";
import { toast } from "react-hot-toast";
import AddFriend from "./AddFriend";
import RequestList from "./RequestList";
import { updatechange, updatecurrchat } from "../redux/reduxSlices";

const Dashboard: React.FC<{}> = () => {
  const { currchat, userState, selectedfriend } = useAppSelector(
    (state) => state.userdata
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (data: any) => {
      if (!currchat || selectedfriend.id !== data.sender) {
        toast.success(data.sender);
      } else {
        dispatch(
          updatecurrchat({
            ...currchat,
            messages: [...currchat.messages, data],
          })
        );
      }
    };
    socket.on("receive", handler);
    return () => {
      socket.off("receive", handler);
    };
  });

  useEffect(() => {
    const handler = (data: any) => {
      dispatch(updatechange(true));
      toast.success(data.requestemail);
    };
    socket.on("receivenotification", handler);
    return () => {
      socket.off("receivenotification", handler);
    };
  });

  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path="/chat/:friendemail" element={<ChatField />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/request" element={<RequestList />} />
      </Routes>
    </div>
  );
};

export default Dashboard;

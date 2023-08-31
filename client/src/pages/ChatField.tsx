import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxhook";
import { baseURL } from "../Auth/axiosbaseurl";
// import { useUser } from "@clerk/clerk-react";
import { updatecurrchat, updateselectedfriend } from "../redux/reduxSlices";
import { socket } from "../Auth/socket";
import { CustomTimer } from "../types/customtypes";
// import { useUser } from "@clerk/clerk-react";

const ChatField: React.FC<{}> = () => {
  const { selectedfriend, userState, currchat } = useAppSelector(
    (state) => state.userdata
  );
  const [text, setText] = useState("");
  // const { user } = useUser();
  const [typing, setTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<typeof CustomTimer>(null);

  const { friendemail } = useParams();
  const location = useLocation();
  const scroll = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (typingstate: { id: string; state: boolean }) => {
      if (typingstate.id === userState.id) setTyping(typingstate.state);
    };
    socket.on("typingstate", handler);

    return () => {
      socket.off("typingstate", handler);
    };
  });

  useEffect(() => {
    async function getcurrentchatdata() {
      await baseURL({
        method: "post",
        url: "/api/getcurrentchatdata",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          friendemail,
        },
      }).then((saved) => {
        dispatch(updatecurrchat(saved.data.chat));
      });
    }

    dispatch(updateselectedfriend(location.state));
    getcurrentchatdata();
  }, []);

  const handletyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (typingTimeout) clearTimeout(typingTimeout);
    else socket.emit("typinghandler", { id: selectedfriend?.id, state: true });

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typinghandler", { id: selectedfriend?.id, state: false });
        setTypingTimeout(null);
      }, 1000)
    );
  };

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && text.length > 0) sendMessage();
  };

  const sendMessage = async () => {
    if (text.length <= 0) return;
    const { data } = await baseURL({
      method: "put",
      url: "/api/sendmessage",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        text,
        receiverid: selectedfriend?.id,
        receiverpic: selectedfriend?.pic,
        conversationid: currchat?.id,
      },
    });

    dispatch(
      updatecurrchat({
        ...currchat,
        messages: [...data.data.messages],
      })
    );
    setText("");
    socket.emit("sendmessage", data.data.messages.at(-1));

    setTimeout(() => {
      scroll.current?.scrollBy({
        behavior: "smooth",
        top: scroll.current.scrollHeight,
      });
    }, 500);
  };

  return (
    <div className="flex-1  px-3 py-3  flex flex-col w-full h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            {/* <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span> */}
            <img
              src={selectedfriend?.pic || ""}
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="relative text-gray-700 mr-3 bottom-2">
                {selectedfriend?.username}
              </span>
              {typing && (
                <span className="absolute bottom-0 text-lg text-emerald-500 font-bold  animate-pulse">
                  typing
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="messages"
        ref={scroll}
        className="flex flex-col h-full p-3 space-y-4  overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {currchat && currchat.messages?.length > 0 ? (
          currchat.messages?.map((chat, i) => (
            <div key={i} className="chat-message">
              <div
                className={`flex ${
                  chat.sender === userState.id ? "justify-end" : null
                } items-end`}
              >
                <div
                  className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
                    chat.sender === userState.id ? "order-1" : "order-2"
                  } items-start`}
                >
                  <div>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block ${
                        chat.sender === userState.id
                          ? "rounded-br-none "
                          : "rounded-bl-none "
                      }bg-gray-300 text-gray-600`}
                    >
                      {chat.text}
                    </span>
                  </div>
                </div>
                <img
                  src={
                    chat.sender === selectedfriend.id
                      ? chat.senderpic
                      : chat.receiverpic
                  }
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
              </div>
            </div>
          ))
        ) : (
          <>🤡 !</>
        )}
      </div>
      <div
        onKeyDown={(e) => onEnter(e)}
        className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
      >
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => handletyping(e)}
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 pr-38px"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex m-2">
            <button
              type="button"
              onClick={sendMessage}
              className="inline-flex items-center justify-center rounded-lg px-2 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatField;

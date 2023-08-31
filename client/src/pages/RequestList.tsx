import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxhook";
import { Icons } from "../Icons";
import { baseURL } from "../Auth/axiosbaseurl";
import { toast } from "react-hot-toast";
import { socket } from "../Auth/socket";
import { updatechange } from "../redux/reduxSlices";

interface Props {}

const RequestList: React.FC<Props> = () => {
  const { userState } = useAppSelector((state) => state.userdata);
  const dispatch = useAppDispatch();

  const acceptrequest = async (fEmail: any, fID: any, fusername: any) => {
    await baseURL({
      method: "post",
      url: "/api/acceptrequest",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        friendemail: fEmail,
      },
    })
      .then((saved) => {
        toast.success(saved.data.message);
        if (saved.data.data) {
          dispatch(updatechange(true));
          socket.emit("notify", saved.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const declinerequest = async (fEmail: any) => {
    await baseURL({
      method: "post",
      url: "/api/declinerequest",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        friendemail: fEmail,
      },
    })
      .then((saved) => {
        toast.success(saved.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 w-fit flex flex-col overflow-y-auto">
      <h1 className="text-2xl mb-6">Friend Requests</h1>
      <div className="max-w-2xl mx-auto">
        <div className="w-80">
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {userState.friendsRequest?.length > 0 ? (
                userState.friendsRequest?.map((request) => (
                  <li
                    key={request.id}
                    className="p-3 mb-2 max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={request.pic as string}
                          alt="Thomas image"
                        />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {request.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {request.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center space-x-1 font-semibold text-gray-900 dark:text-white">
                        <button
                          onClick={() =>
                            acceptrequest(
                              request.email,
                              request.id,
                              request.username
                            )
                          }
                          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded"
                        >
                          <Icons.Check
                            strokeWidth={3}
                            className="h-5 w-5 font-bold"
                          />
                        </button>
                        <button
                          onClick={() => declinerequest(request.email)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                        >
                          <Icons.X
                            strokeWidth={3}
                            className="h-5 w-5 font-bold"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h1>No requets</h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;

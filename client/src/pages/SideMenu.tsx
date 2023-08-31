import React from "react";
import { Link } from "react-router-dom";
import { Icon, Icons } from "../Icons";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { useAppSelector } from "../redux/reduxhook";
import { User } from "../../../types/CustomInterface";

interface Props {}

interface SideBarOptions {
  Icons: Icon;
  id: number;
  href: string;
  text: string;
}

const sidebarOptions: SideBarOptions[] = [
  {
    Icons: "UserPlus2",
    id: 1,
    href: "/addfriend",
    text: "Add friend",
  },
  {
    Icons: "User2",
    id: 2,
    href: "/request",
    text: "Friend requests",
  },
];

const SideMenu: React.FC<Props> = () => {
  const { userState } = useAppSelector((state) => state.userdata);
  const { user } = useUser();

  console.log(userState);

  return (
    <div className="hidden md:flex w-full h-full max-w-xs grow flex-col gap-y-5  overflow-y-auto border-r border-gray-200 bg-white px-4">
      <span className="text-base mt-1 text-gray-500 font-semibold">
        Your chats
      </span>
      <nav className="flex flex-1 flex-col truncate overflow-hidden">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <div
            role="list"
            className="flex flex-col space-y-1 h-fit max-h-80 overflow-y-auto"
          >
            {userState?.friends?.length > 0 &&
              userState.friends.map((friend: User, fi) => (
                <Link
                  to={`/chat/${friend.email}/`}
                  state={friend}
                  key={fi}
                  className="flex cursor-pointer flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    <img src={friend.pic} className="rounded-full" alt="logo" />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {friend.username}
                  </div>
                </Link>
              ))}
          </div>

          <li>
            <div className="text-md font-semibold leading-6 text-gray-500">
              Overview
            </div>

            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {sidebarOptions.map((option) => {
                const Icon = Icons[option.Icons];
                return (
                  <li key={option.id}>
                    <Link
                      to={option.href}
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-4 text-base leading-6 font-semibold"
                    >
                      <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                        <Icon className="h-6 w-6" />
                      </span>

                      <span className="truncate mt-1">{option.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          <li className="-mx-4 mt-auto flex items-center">
            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
              <div className="relative h-8 w-8 bg-gray-50">
                <UserButton afterSignOutUrl="/" />
              </div>

              <span className="sr-only">Your profile</span>
              <div className="flex flex-col">
                <span aria-hidden="true">{user?.fullName}</span>
                <span className="text-xs text-zinc-400" aria-hidden="true">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;

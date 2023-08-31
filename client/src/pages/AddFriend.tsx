import React, { useState } from "react";
import { baseURL } from "../Auth/axiosbaseurl";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { socket } from "../Auth/socket";
import { CustomTimer } from "../types/customtypes";

interface Props {}

const AddFriend: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const { isSignedIn, isLoaded, user } = useUser();
  const [searchTimeout, setSearchTimeout] = useState<typeof CustomTimer>(null);
  const [userlist, setUserlist] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>,
    data: string | null
  ) => {
    e.preventDefault();

    if (isSignedIn && isLoaded) {
      await baseURL({
        method: "POST",
        url: "/api/addfriend",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { email: !data ? email : data },
      })
        .then((saved) => {
          if (saved.data.data) {
            socket.emit("notify", saved.data.data);
          }

          toast.success(saved.data.message, { duration: 2000 });
        })
        .catch((err) => console.log(err));
    }
  };

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsSearching(true);

    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(async () => {
        const data = await baseURL({
          method: "POST",
          url: "/api/getsearchuser",
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: {
            query: email,
          },
        });
        setUserlist(data.data.message);
        setIsSearching(false);
      }, 1000)
    );
  };

  return (
    <main className="pt-8 pl-2 w-fit h-screen">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <form onSubmit={(e) => handleSubmit(e, null)} className="mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add friend by E-Mail
        </label>
        <div className="relative w-80 mt-2 flex gap-4">
          <input
            onChange={(e) => searchUser(e)}
            type="text"
            className="block  bg w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
          <button className="bg-emerald-400 hover:bg-emerald-500-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </div>
      </form>

      <ul role="list">
        {userlist.length > 0 ? (
          userlist.map(
            (search: {
              id: string;
              username: string;
              email: string;
              pic: string;
            }) => (
              <li
                onClick={(e) => {
                  handleSubmit(e, search.email);
                }}
                key={search.id}
                className="cursor-pointer p-3 mb-2 max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={search.pic}
                      alt="Thomas image"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {search.email}
                    </p>
                  </div>
                </div>
              </li>
            )
          )
        ) : (
          <div></div>
        )}
      </ul>
    </main>
  );
};

export default AddFriend;

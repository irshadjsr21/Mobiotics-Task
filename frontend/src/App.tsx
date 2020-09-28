import React, { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import UserTable from "./Components/UserTable/UserTable";

import { getUsers } from "./services/user";
import User from "./modal/User";

function App() {
  const [userList, setUserList] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const resp = await getUsers({});
      setUserList(resp.data as User[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onAdd = (user: User) => {
    setUserList([user, ...userList]);
  };

  return (
    <div>
      <Header onAdd={onAdd} />
      <UserTable userList={userList} />
    </div>
  );
}

export default App;

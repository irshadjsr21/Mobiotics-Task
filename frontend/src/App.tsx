import React, { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import UserTable from "./Components/UserTable/UserTable";

import User from "./modal/User";
import { getUsers } from "./services/user";

function App() {
  const [userList, setUserList] = useState<User[]>([]);
  const [pageData, setPageData] = useState<{ currentPage: number; lastPage: number }>({
    currentPage: 1,
    lastPage: 1,
  });

  const fetchUsers = async (page: number) => {
    try {
      const resp = await getUsers({ page });
      setUserList(resp.data as User[]);
      setPageData({ currentPage: page, lastPage: resp.lastPage });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(pageData.currentPage);
  }, []);

  const onAdd = (user: User) => {
    setUserList([user, ...userList]);
  };

  const onEdit = (user: User) => {
    const index = userList.findIndex((u) => u._id === user._id);
    if (index !== -1) {
      const newList = [...userList];
      newList[index] = user;
      setUserList(newList);
    }
  };

  const onDelete = (userId: string) => {
    setUserList(userList.filter((user) => user._id !== userId));
  };

  return (
    <div>
      <Header onAdd={onAdd} />
      <UserTable
        currentPage={pageData.currentPage}
        lastPage={pageData.lastPage}
        pageChange={fetchUsers}
        onEdit={onEdit}
        onDelete={onDelete}
        userList={userList}
      />
    </div>
  );
}

export default App;

/* tslint:disable:jsx-no-lambda */
import React from "react";

import styles from "./user-table.module.scss";

import Table, { ColumnType } from "../Table/Table";
import User from "../../modal/User";

export interface UserTableProps {
  userList: User[];
}

export default function UserTable({ userList }: UserTableProps) {
  const columns: ColumnType[] = [
    {
      name: "Name",
      isSortable: true,
      key: "name",
    },
    {
      name: "City",
      isSortable: true,
      key: "city",
    },
    {
      name: "Country",
      isSortable: true,
      key: "country",
    },
    {
      name: "Date of Birth",
      isSortable: true,
      key: "dob",
    },
    {
      name: "Contact No.",
      isSortable: true,
      key: "phone",
    },
    {
      name: "Created at",
      isSortable: true,
      key: "createdAt",
    },
    {
      name: "Actions",
      isSortable: false,
    },
  ];

  const sortData = {
    column: undefined,
    asc: true,
  };

  const sort = (column: ColumnType) => {
    console.log(column);
  };

  const editUser = (userId: string) => {
    console.log(userId);
  };

  const deleteUser = (userId: string) => {
    console.log(userId);
  };

  return (
    <div className={`${styles["user-table"]} py-xl`}>
      <Table columns={columns} isLoading={false} sort={sort} sortData={sortData}>
        {userList.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.city}</td>
            <td>{user.country}</td>
            <td>{user.fDob}</td>
            <td>{user.phone}</td>
            <td>{user.createdAt}</td>
            <td className="flex">
              <button onClick={() => editUser(user._id)} className="btn-reset mr-2">
                <i className="material-icons btn-icon">edit</i>
              </button>
              <button onClick={() => deleteUser(user._id)} className="btn-reset">
                <i className="material-icons btn-icon">delete</i>
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

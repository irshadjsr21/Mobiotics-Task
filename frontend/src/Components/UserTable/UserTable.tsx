/* tslint:disable:jsx-no-lambda */
import React, { useState } from "react";
import dayjs from "dayjs";

import User from "../../modal/User";
import Table, { ColumnType } from "../Table/Table";
import styles from "./user-table.module.scss";

import { deleteUser } from "../../services/user";

import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AddUserModal from "../AddUserModal/AddUserModal";

export interface UserTableProps {
  userList: User[];
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
}

export default function UserTable({ userList, onDelete, onEdit }: UserTableProps) {
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

  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [editUserObj, setEditUserObj] = useState<User | null>(null);

  const sortData = {
    column: undefined,
    asc: true,
  };

  const sort = (column: ColumnType) => {
    console.log(column);
  };

  const editUser = (user: User) => {
    setEditUserObj(user);
  };

  const confirmDeleteUser = (userId: string) => {
    setDeleteUserId(userId);
  };

  const callDeleteUser = async () => {
    try {
      await deleteUser(deleteUserId);
      onDelete(deleteUserId);
      setDeleteUserId("");
    } catch (error) {
      console.log(error);
    }
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
            <td>{dayjs(user.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            <td className="flex">
              <button onClick={() => editUser(user)} className="btn-reset mr-2">
                <i className="material-icons btn-icon">edit</i>
              </button>
              <button onClick={() => confirmDeleteUser(user._id)} className="btn-reset">
                <i className="material-icons btn-icon">delete</i>
              </button>
            </td>
          </tr>
        ))}
      </Table>
      {deleteUserId ? (
        <ConfirmModal
          title="Delete User"
          onClose={() => setDeleteUserId("")}
          onConfirm={callDeleteUser}
        >
          Are you sure you want to delete this user?
        </ConfirmModal>
      ) : null}

      {editUserObj ? (
        <AddUserModal
          onAdd={(user) => {
            onEdit(user);
            setEditUserObj(null);
          }}
          user={editUserObj}
          onClose={() => setEditUserObj(null)}
          isEditing={true}
        />
      ) : null}
    </div>
  );
}

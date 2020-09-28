import React, { useState } from "react";

import Button from "./../Button/Button";
import AddUserModal from "./../AddUserModal/AddUserModal";

import User from "../../modal/User";

export interface HeaderProps {
  onAdd: (user: User) => void;
}

export default function Header({ onAdd }: HeaderProps) {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  return (
    <div>
      <h1 className="display-1 text-center">Mobiotics Task</h1>
      <div className="flex justify-content-center">
        <Button theme="primary" onClick={handleAdd} icon="add">
          Create User
        </Button>
        {isAddOpen ? (
          <AddUserModal
            onAdd={(user) => {
              onAdd(user);
              setIsAddOpen(false);
            }}
            onClose={() => setIsAddOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}

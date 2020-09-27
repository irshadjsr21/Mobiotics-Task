import React from "react";

import Button from "./../Button/Button";

export default function Header() {
  const handleAdd = () => {
    console.log("Hello world");
  };

  return (
    <div>
      <h1 className="display-1 text-center">Mobiotics Task</h1>
      <div className="flex justify-content-center">
        <Button onClick={handleAdd} icon="add">
          Create User
        </Button>
      </div>
    </div>
  );
}

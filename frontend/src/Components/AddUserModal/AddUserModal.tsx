import React, { useState } from "react";

import Button, { ButtonProps } from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import Modal from "../Modal/Modal";

import styles from "./add-user-modal.module.scss";
import User from "../../modal/User";

import { createUser } from "../../services/user";

export interface AddUserModalProps {
  onClose: () => void;
  onAdd: (user: User) => void;
}

export default function AddUserModal({ onClose, onAdd }: AddUserModalProps) {
  const initialValues = {
    name: "",
    city: "",
    country: "",
    phone: "",
    dob: "",
  };
  const initialErrors = {
    name: "",
    city: "",
    country: "",
    phone: "",
    dob: "",
    default: "",
  };

  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [fatalError, setFatalError] = useState("");

  const handleInput = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const callCreateUser = async () => {
    try {
      setIsLoading(true);
      const resp = await createUser(values);
      console.log(resp);
      onAdd(resp.data as User);
    } catch (error) {
      if (error.data) {
        setErrors(error.data);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: ButtonProps["onClick"] = (event) => {
    event.preventDefault();
    console.log(values);
    callCreateUser();
  };

  return (
    <Modal title="Create User" onClose={onClose}>
      <div className={styles["add-user-modal-container"]}>
        <form className="mb-l px-s" v-if="isInitialized">
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Name"
            name="name"
            error={errors.name}
            value={values.name}
            handleInput={(event) => handleInput("name", event)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="City"
            name="city"
            error={errors.city}
            value={values.city}
            handleInput={(event) => handleInput("city", event)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Country"
            name="country"
            error={errors.country}
            value={values.country}
            handleInput={(event) => handleInput("country", event)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Date of Birth"
            name="dob"
            error={errors.dob}
            value={values.dob}
            handleInput={(event) => handleInput("dob", event)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Phone No"
            name="phone"
            error={errors.phone}
            value={values.phone}
            handleInput={(event) => handleInput("phone", event)}
          />
          {errors && errors.default ? (
            <small className="text-danger" v-if="errors && errors.default">
              {errors.default}
            </small>
          ) : null}
          <div className="flex justify-content-center mt-xl">
            <Button
              type="submit"
              isLarge={true}
              theme="primary"
              onClick={handleSubmit}
              disabled={isLoading || !!fatalError}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import Button, { ButtonProps } from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import InputBox from "../InputBox/InputBox";
import Modal from "../Modal/Modal";

import User from "../../modal/User";
import styles from "./add-user-modal.module.scss";

import { createUser, updateUser } from "../../services/user";

import "react-datepicker/dist/react-datepicker.css";

export interface AddUserModalProps {
  onClose: () => void;
  onAdd: (user: User, isNew: boolean) => void;
  isEditing: boolean;
  user?: User;
}

export default function AddUserModal({ onClose, onAdd, user, isEditing }: AddUserModalProps) {
  const initialValues = {
    name: "",
    city: "",
    country: "",
    phone: "",
    dob: new Date(),
  };

  useEffect(() => {
    if (isEditing && user) {
      const newValues = {
        name: user.name,
        city: user.city,
        country: user.country,
        phone: user.phone,
        dob: new Date(user.dob),
      };
      setValues(newValues);
      console.log(newValues);
    }
  }, [user, isEditing]);

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

  const handleInput = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const setDate = (date: any) => {
    console.log(date);
    setValues({ ...values, dob: date });
  };

  const callCreateUser = async () => {
    try {
      setIsLoading(true);
      let formattedDate = "";
      if (values.dob) {
        formattedDate = dayjs(values.dob).format("DD/MM/YYYY");
      }
      const body = { ...values, dob: formattedDate };
      if (isEditing && user) {
        const resp = await updateUser(user._id, body);
        onAdd(resp.data as User, false);
      } else {
        const resp = await createUser(body);
        onAdd(resp.data as User, true);
      }
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
            handleInput={(event) => handleInput("name", event.target.value)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Phone No"
            name="phone"
            error={errors.phone}
            value={values.phone}
            handleInput={(event) => handleInput("phone", event.target.value)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="City"
            name="city"
            error={errors.city}
            value={values.city}
            handleInput={(event) => handleInput("city", event.target.value)}
          />
          <InputBox
            className="mx-auto mb-l"
            type="text"
            label="Country"
            name="country"
            error={errors.country}
            value={values.country}
            handleInput={(event) => handleInput("country", event.target.value)}
          />
          <DatePicker
            error={errors.dob}
            label="Date of Birth"
            value={values.dob}
            handleInput={setDate}
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
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

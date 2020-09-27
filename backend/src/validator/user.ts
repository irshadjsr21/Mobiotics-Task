import { body, param } from "express-validator";
import * as moment from "moment";

const DATE_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

export const createUserValidator = [
  body("name", "Please enter your name.")
    .exists()
    .isString()
    .isLength({ min: 1 }),
  body("city", "Please enter your city.")
    .exists()
    .isString()
    .isLength({ min: 1 }),
  body("dob", "Date of Birth is required.")
    .trim()
    .isString()
    .exists()
    .custom((value) => {
      const isValid = DATE_REGEX.test(value);
      if (!isValid) {
        throw new Error("Please enter a valid date.");
      }
      const date = moment(value, "DD/MM/YYYY", true);

      if (!date.isValid()) {
        throw new Error("Please enter a valid date.");
      }
      return true;
    }),
  body("phone", "Please enter a valid phone number.")
    .trim()
    .isMobilePhone("any", { strictMode: true }),
];

export const updateUserValidator = [
  param("id", "Invalid user id.").isMongoId(),
  body("name", "Please enter your name.")
    .exists()
    .isString()
    .isLength({ min: 1 }),
  body("city", "Please enter your city.")
    .exists()
    .isString()
    .isLength({ min: 1 }),
  body("country", "Please enter your country.")
    .exists()
    .isString()
    .isLength({ min: 1 }),
  body("dob", "Date of Birth is required.")
    .trim()
    .isString()
    .exists()
    .custom((value) => {
      const isValid = DATE_REGEX.test(value);
      if (!isValid) {
        throw new Error("Please enter a valid date.");
      }
      const date = moment(value, "DD/MM/YYYY", true);

      if (!date.isValid()) {
        throw new Error("Please enter a valid date.");
      }
      return true;
    }),
  body("phone", "Please enter a valid phone number.")
    .trim()
    .isMobilePhone("any", { strictMode: true }),
];

export const deleteUserValidator = [
  param("id", "Invalid user id.").isMongoId(),
];

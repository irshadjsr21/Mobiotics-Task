import * as express from "express";
import * as createError from "http-errors";
import * as moment from "moment";

import User from "../../models/User";
import {
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from "../../validator/user";
import createController from "../create";

export default {
  getUsers: createController(
    async (_req: express.Request, res: express.Response) => {
      const { pagination } = res.locals;
      const { page, itemsPerPage, filterObj, sortObj } = pagination;

      const users = await User.find(filterObj)
        .select(User.getProfileFields().join(" "))
        .sort(sortObj)
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const count = await User.countDocuments(filterObj);

      const lastPage = Math.ceil(count / itemsPerPage);

      res.json({ data: users, page, itemsPerPage, lastPage, itemCount: count });
    },
    {
      pagination: {
        defaultItemsPerPage: 10,
        defaultSort: "createdAt",
        defaultOrder: "a",
        allowedSort: ["createdAt", "updatedAt", "name", "city", "phone", "dob"],
        allowedFilters: [],
      },
    }
  ),

  createUser: createController(
    async (_req: express.Request, res: express.Response) => {
      const { inputBody } = res.locals;
      const { dob: rawDate } = inputBody;

      inputBody.dob = moment(rawDate, "DD/MM/YYYY", true);

      let user;
      try {
        user = await User.create(inputBody);
      } catch (error) {
        if (error && error.code === 11000) {
          throw createError(409, "Duplicate name.", {
            errors: { name: "This name already exists." },
          });
        }

        throw error;
      }

      res.status(201).json({
        data: { ...user.mapFields(User.getProfileFields()), fDob: rawDate },
      });
    },
    {
      validation: {
        validators: createUserValidator,
        throwError: true,
      },
      inputs: ["name", "city", "dob", "phone"],
    }
  ),

  updateUser: createController(
    async (req: express.Request, res: express.Response) => {
      const { inputBody } = res.locals;
      const { id } = req.params;
      const { dob: rawDate } = inputBody;

      inputBody.dob = moment(rawDate, "DD/MM/YYYY", true);

      let user;
      try {
        await User.updateOne({ _id: id }, inputBody);
        user = await User.findById(id).select(User.getProfileFields());
        if (!user) {
          throw createError(404, "User does not exist.");
        }
      } catch (error) {
        if (error && error.code === 11000) {
          throw createError(409, "Duplicate name.", {
            errors: { name: "This name already exists." },
          });
        }

        throw error;
      }

      res.status(200).json({
        data: user,
      });
    },
    {
      validation: {
        validators: updateUserValidator,
        throwError: true,
      },
      inputs: ["name", "city", "dob", "phone"],
    }
  ),

  deleteUser: createController(
    async (req: express.Request, res: express.Response) => {
      const { id } = req.params;

      const deletedData = await User.deleteOne({ _id: id });

      if (deletedData.deletedCount <= 0) {
        throw createError(404, "User does not exist.");
      }

      res.status(200).json({
        message: "User deleted successfully.",
      });
    },
    {
      validation: {
        validators: deleteUserValidator,
        throwError: true,
      },
    }
  ),
};

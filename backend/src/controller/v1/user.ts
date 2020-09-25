import * as express from "express";
import * as moment from "moment";
import * as createError from "http-errors";

import User from "../../models/User";
import { createUserValidator } from "../../validator/user";
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
};

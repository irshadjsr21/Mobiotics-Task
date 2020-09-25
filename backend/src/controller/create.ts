/**
 * This will export a helper function (route) which will abstract
 * some functionalities of the controller.
 */

import * as express from "express";
import {
  ValidationChain,
  ValidationError,
  validationResult,
} from "express-validator";
import * as createError from "http-errors";

const VALIDATION_ERROR = "Validation error.";

interface IFilter {
  name: string;
  allowed?: string[];
}

interface ICreateControllerOptions {
  validation?: {
    validators?: ValidationChain[];
    errorMsg?: string;
    throwError?: boolean;
  };
  inputs?: string[] | boolean;
  pagination?: {
    defaultItemsPerPage: number;
    defaultSort: string;
    defaultOrder: string;
    allowedFilters: IFilter[];
    allowedSort: any[];
  };
}

/**
 * Convert errors array to object.
 */
const convertErrorToObject = (errors: ValidationError[]) => {
  const fieldErrors = {};
  for (const error of errors) {
    if (error.param && !fieldErrors[error.param]) {
      fieldErrors[error.param] = error.msg;
    }
  }
  return fieldErrors;
};

/**
 * Extract inputs from the request object.
 *
 * It will return all the fields if `fields` parameter is not specified
 * or is empty.
 *
 * And if `fields` parameter is specified it will return the fields mentioned
 * in it.
 */
const getInputs = (req: express.Request, fields: any[]) => {
  const inputsObj = {};
  if (fields && fields.length > 0) {
    for (const key of fields) {
      if (req.body[key] !== undefined) {
        const value = req.body[key];
        if (typeof value === "string") {
          inputsObj[key] = value.trim();
        } else {
          inputsObj[key] = value;
        }
      }
    }
  } else {
    for (const key of Object.keys(req.body)) {
      inputsObj[key] = req.body[key];
    }
  }
  return inputsObj;
};

/**
 * It returns the validation errors.
 *
 * @param {Object} req The request object from express
 */
const getValidationError = (req: express.Request) => {
  const errors = validationResult(req).array();
  return convertErrorToObject(errors);
};

/**
 * Create a middleware for validation check with the options specified
 */
const createValidationMiddleware = ({ errorMsg, throwError }) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const errors = getValidationError(req);
    if (Object.keys(errors).length > 0) {
      if (throwError) {
        next(createError(400, { errors, code: 400 }, errorMsg));
        return;
      }
      res.locals.errors = errors;
    }

    next();
  };
};

/**
 * Create a middleware for pagination
 */
const createPaginationMiddleware = ({
  defaultItemsPerPage,
  defaultSort,
  defaultOrder,
  allowedFilters,
  allowedSort,
}: ICreateControllerOptions["pagination"]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let {
      page = 1,
      itemsPerPage = defaultItemsPerPage,
      sort = defaultSort,
      order = defaultOrder,
    } = req.query;

    const _page = parseInt(page.toString(), 10);
    const _itemsPerPage = parseInt(itemsPerPage.toString(), 10);
    let _sort = sort.toString();
    let _order = order.toString();

    const sortObj = {};
    const filterObj = {};
    if (!allowedSort.includes(_sort)) {
      _sort = defaultSort;
    }

    if (!["a", "d"].includes(_order)) {
      _order = defaultOrder;
    }

    sortObj[_sort] = order === "a" ? 1 : -1;

    if (allowedFilters && allowedFilters.length > 0) {
      for (const obj of allowedFilters) {
        let allowedStrings: string[] = [];
        if (obj.allowed !== undefined) {
          allowedStrings = obj.allowed;
        }
        if (req.query[obj.name] !== undefined) {
          if (
            allowedStrings.length > 0 &&
            !allowedStrings.includes(req.query[obj.name].toString())
          ) {
            break;
          }

          filterObj[obj.name] = req.query[obj.name];
        }
      }
    }

    res.locals.pagination = {
      page: _page,
      itemsPerPage: _itemsPerPage,
      sortObj,
      filterObj,
    };
    next();
  };
};

/**
 * This will create a series of middleware functions to execute common tasks
 * based on the options provided.
 */
const route = (
  controller: express.RequestHandler,
  options: ICreateControllerOptions = {
    inputs: false,
    pagination: {
      allowedFilters: [],
      allowedSort: [],
      defaultItemsPerPage: undefined,
      defaultOrder: "a",
      defaultSort: "createdAt",
    },
    validation: {
      errorMsg: VALIDATION_ERROR,
      throwError: false,
      validators: [],
    },
  }
) => {
  const middlewareArray = [];

  const customController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  if (options.inputs) {
    let fields = [];
    if (Array.isArray(options.inputs)) {
      fields = options.inputs;
    }

    middlewareArray.push(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const inputs = getInputs(req, fields);
        if (res.locals.inputBody) {
          res.locals.inputBody = { ...res.locals.inputBody, ...inputs };
        } else {
          res.locals.inputBody = inputs;
        }
        next();
      }
    );
  }

  if (options.validation) {
    middlewareArray.push(options.validation.validators);
    middlewareArray.push(
      createValidationMiddleware({
        errorMsg: options.validation.errorMsg || VALIDATION_ERROR,
        throwError: options.validation.throwError,
      })
    );
  }

  if (options.pagination && options.pagination.defaultItemsPerPage) {
    middlewareArray.push(createPaginationMiddleware(options.pagination));
  }

  middlewareArray.push(customController);
  return middlewareArray;
};

export default route;

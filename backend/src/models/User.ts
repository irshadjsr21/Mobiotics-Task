/* tslint:disable:only-arrow-functions */
import * as moment from "moment";
import { Document, Model, model, Schema } from "mongoose";

import { logger } from "../utils/logger";

export interface IUser extends Document {
  id: string;
  name: string;
  city?: string;
  dob?: Date;
  phone?: string;
  mapFields(fields: string[]): any;
}

interface IUserDocument extends Model<IUser, {}> {
  getProfileFields(): string[];
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    city: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    dob: {
      type: Schema.Types.Date,
      required: true,
      trim: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

schema.virtual("fDob").get(function () {
  try {
    if (this.dob !== undefined) {
      const date = moment(this.dob);
      return date.format("DD/MM/YYYY");
    }
    return undefined;
  } catch (error) {
    logger.error(error);
    return "";
  }
});

schema.statics.getProfileFields = function () {
  return ["_id", "name", "city", "dob", "phone", "createdAt", "updatedAt"];
};

schema.methods.mapFields = function (fields: string[]) {
  const user = this as IUser;
  const userObj = user.toJSON();
  for (const key in userObj) {
    if (!fields.includes(key)) {
      delete userObj[key];
    }
  }

  return userObj;
};

const User = model<IUser>("User", schema, "users");

export default User as IUserDocument;

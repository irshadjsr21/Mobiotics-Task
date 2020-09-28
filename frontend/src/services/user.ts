import querystring from "querystring";
import http from "./http";

const BASE_URL = `/users`;

export interface ResponseType {
  [key: string]: any;
}

export const getUsers = ({
  itemsPerPage = 15,
  page = 1,
  sort = "createdAt",
  order = "a",
}): Promise<ResponseType> =>
  new Promise(async (resolve, reject) => {
    try {
      const queryObj = {
        itemsPerPage,
        page,
        sort,
        order,
      };

      const query = querystring.stringify(queryObj);
      const resp = await http.get(`${BASE_URL}?${query}`);
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });

export const createUser = (body: {
  name: string;
  city: string;
  country: string;
  dob: string;
  phone: string;
}): Promise<ResponseType> =>
  new Promise(async (resolve, reject) => {
    try {
      const resp = await http.post(BASE_URL, body);
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });

export const updateUser = (
  userId: string,
  body: {
    name: string;
    city: string;
    country: string;
    dob: string;
    phone: string;
  }
): Promise<ResponseType> =>
  new Promise(async (resolve, reject) => {
    try {
      const resp = await http.patch(`${BASE_URL}/${userId}`, body);
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });

export const deleteUser = (userId: string): Promise<ResponseType> =>
  new Promise(async (resolve, reject) => {
    try {
      const resp = await http.delete(`${BASE_URL}/${userId}`);
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });

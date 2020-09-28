import axios from "axios";
import config from "../config";

interface ExtractedError {
  [key: string]: string;
}

const instance = axios.create({
  baseURL: `${config.BACKEND_URL}/v1`,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    let errorMsg = "Unexpected error occured.";
    let extractedErrors: ExtractedError = { default: errorMsg };
    const errorObj = {
      data: {},
      message: "",
      status: 0,
    };
    if (!(error && error.response)) {
      extractedErrors.default = "Can not reach the server at the moment.";
    } else if (error.response.data) {
      if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {
        extractedErrors = error.response.data.errors;
      } else if (error.response.data.message) {
        extractedErrors.default = error.response.data.message;
      }
    }

    if (extractedErrors) {
      if (extractedErrors.default) {
        errorMsg = extractedErrors.default;
      } else {
        const keys = Object.keys(extractedErrors);
        errorMsg = extractedErrors[keys[keys.length - 1]];
      }
    }
    errorObj.data = extractedErrors;
    errorObj.message = errorMsg;
    if (error && error.response && error.response.status) {
      errorObj.status = error.response.status;
    }
    return Promise.reject(errorObj);
  }
);

export default instance;

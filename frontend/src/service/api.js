import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = `${config.url}/${config.TYPE.query}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => processResponse(response),
  (error) => Promise.reject(processError(error))
);

// Helper functions
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      message: response?.statusText || 'Error occurred',
      code: response?.status,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure.message,
      code: error.response.status,
      details: error.response.data,
    };
  } else if (error.request) {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure.message,
      code: '',
    };
  } else {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError.message,
      code: '',
    };
  }
};

const API = {};

Object.entries(SERVICE_URLS).forEach(([key, value]) => {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? {} : body,
      responseType: value.responseType,
      headers: {
        Authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
});

export { API };

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: 'Loading...',
    message: 'Please wait while we load the data.',
  },
  success: {
    title: 'Success',
    message: 'Data loaded successfully!',
  },
  responseFailure: {
    title: 'Server Error',
    message: 'There was an error fetching data from the server. Please try again.',
  },
  requestFailure: {
    title: 'Request Error',
    message: 'There was an error with the request data. Please check your input and try again.',
  },
  networkError: {
    title: 'Network Error',
    message: 'Network issue detected. Please check your internet connection and try again.',
  },
};

export const SERVICE_URLS = {
  auth: {
      userSignup: { url: '/signup', method: 'POST' },
      userLogin: { url: '/login', method: 'POST' },
  },
  fileUpload: { url: '/file/upload', method: 'POST' },
  post: {
      create: { url: '/create', method: 'POST' },
      getAll: { url: '/posts', method: 'GET', params: true },
      getById: { url: '/post', method: 'GET', query: true },
      update: { url: '/update', method: 'PUT', query: true },
      delete: { url: '/delete', method: 'DELETE', query: true },
  },
  comments: {
      new: { url: '/comment/new', method: 'POST' },
      getAll: { url: '/comments', method: 'GET', query: true },
      delete: { url: '/comment/delete', method: 'DELETE', query: true },
  }
};

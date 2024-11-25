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
  userLogin: { url: '/login', method: 'POST' },
  userSignup: { url: '/signup', method: 'POST' },
  getAllPosts: { url: '/posts', method: 'GET', params: true },
  getRefreshToken: { url: '/token', method: 'POST' },
  uploadFile: { url: '/upload', method: 'POST' },
  createPost: { url: 'create', method: 'POST' },
  deletePost: { url: 'delete', method: 'DELETE', query: true },
  getPostById: { url: 'post', method: 'GET', query: true },
  newComment: { url: '/comment/new', method: 'POST' },
  getAllComments: { url: 'comments', method: 'GET', query: true },
  deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
  updatePost: { url: 'update', method: 'PUT', query: true }
}

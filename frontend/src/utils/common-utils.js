export const getAccessToken = () => sessionStorage.getItem('accessToken');

export const getRefreshToken = () => sessionStorage.getItem('refreshToken');

export const setAccessToken = (accessToken) => {
  sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
};

export const setRefreshToken = (refreshToken) => {
  sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
};

export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    return { query: typeof body === 'object' ? body._id : body };
  }
  return {};
};

export const addEllipsis = (str, limit) => {
  return str.length > limit ? `${str.substring(0, limit)}...` : str;
};

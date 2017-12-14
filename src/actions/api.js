import uuidv4 from 'uuid/v4';

export const API_FETCH = 'api/fetch';
export const apiFetch = (endpoint, options = {}) => ({
  type: API_FETCH,
  payload: {
    endpoint,
    options,
    requestId: uuidv4(),
  },
});

export const API_POST = 'api/post';
export const apiPost = (endpoint, data = {}) => ({
  type: API_POST,
  payload: {
    endpoint,
    data: {
      data,
    },
    requestId: uuidv4(),
  },
});

/* break out res into data / tokens */
export const API_RECEIVE = 'api/receive';
export const apiReceive = (endpoint, res, requestId) => ({
  type: API_RECEIVE,
  payload: {
    endpoint,
    res,
    requestId,
  },
});

/* break out res into data / tokens */
export const API_ERROR = 'api/error';
export const apiError = (error, requestId) => ({
  type: API_ERROR,
  payload: {
    error,
    requestId,
  },
});

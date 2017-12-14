import * as apiAction from 'actions/api';

export const DEFAULT = {};

// Rebuild the api response for state so that it's accessable by a hash of
// {id: data} instead of as an array. Merge this into the old data, overwriting
// existing data.
export const mergeApiResponse = (state, res) => ({
  ...state,
  [res.endpoint]: {
    ...state[res.endpoint],
    ...(
      Array.isArray(res.body) ?
        Object.keys(res.body).reduce((o, i) => ({
          ...o,
          [res.body[i].id]: res.body[i],
        }), {})
        :
        {
          [res.body.id]: res.body,
        }
    ),
  },
});

export default (state = DEFAULT, action) => {
  switch (action.type) {
    case (apiAction.API_RECEIVE):
      return mergeApiResponse(state, action.payload);
    default:
      return state;
  }
};

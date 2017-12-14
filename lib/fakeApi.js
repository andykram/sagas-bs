export const TESTAPI = 'test';
export const buildRes = ({ status = 200, body = {}, endpoint }) => {
  if (status === 200) {
    return Promise.resolve({ status, body, endpoint });
  }

  return Promise.reject(new Error({ status, body, endpoint }));
};

const DATA = {
  [TESTAPI]: [{
    id: 0,
    title: 'Test 1',
    description: 'A test response',
  }, {
    id: 1,
    title: 'Test 2',
    description: 'A second test response',
  }],
};


/* eslint import/prefer-default-export: 0 */
// real api will take something like an oauth token param to auth requests
export const get = async (endpoint, { id }) => {
  if (!DATA[endpoint] || (id && !DATA[endpoint][id])) {
    return buildRes({ status: 404, endpoint });
  }

  if (!id) {
    return buildRes({ body: DATA[endpoint], endpoint });
  }

  return buildRes({ body: DATA[endpoint].find(o => o.id === id), endpoint });
};

/* eslint import/prefer-default-export: 0 */
// real api will take something like an oauth token param to auth requests
export const post = async (endpoint, { data }) => {
  if (!DATA[endpoint]) {
    return buildRes({ status: 404, endpoint });
  }

  return data;
};

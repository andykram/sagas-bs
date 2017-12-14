const NODE_ENV = 'development';

// note: to get env vars here from process.env, you need to whitelist it in
// ./env.js first (so we don't accidentally expose the entire env)
export default extraConfig => ({
  node_env: process.env.NODE_ENV || NODE_ENV,
  ...extraConfig,
});

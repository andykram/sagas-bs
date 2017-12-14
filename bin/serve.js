// start up cluster
const Cluster = require('../build/server/server').default;
const assets = require('../build/client/webpack-assets.json');
const Log = require('log');

const log = new Log(process.env.LOG_LEVEL || Log.WARNING);
const processes = parseInt(process.env.PROCESSES, 10) || 2;
const port = parseInt(process.env.PORT) || 3000;

const options = {
  assets,
  port,
};

const cluster = new Cluster(processes, options, log);

cluster.start();

/* eslint no-console: 0 */
console.log(`${processes} web processes started at http://localhost:${port}.`);

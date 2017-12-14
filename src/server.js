import path from 'path';

import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaStatic from 'koa-static';

import Log from 'log';
import Emitter from 'eventemitter3';
import cluster from 'cluster';

import React from 'react';
import ReactDom from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';

import mainSaga from 'sagas';
import serverRoutes from 'server/routes';
import baseConfig from 'config/config';
import createStore from 'store';

import Html from 'components/containers/html';
import Root from 'components/containers/root';

import { SERVER } from 'constants';

/* eslint react/jsx-filename-extension: 0 */

const fakeprops = assets => ({
  assets,
  component: <div />,
  store: createStore({
  }),
});

export const ENV = SERVER;

const config = baseConfig({
  env: ENV,
});

export class Server {
  constructor(options) {
    this.options = options;
    this.server = new Koa();
    this.router = new KoaRouter();
    this.setupRoutes();
  }

  setupRoutes() {
    // bind server routes - robots.txt, etc.
    this.server.use(KoaStatic(path.join(process.cwd(), 'build', 'client')));
    this.server.use(KoaStatic(path.join(process.cwd(), 'static')));
    serverRoutes(this.router);
    this.server.use(this.route);
    this.server.use(this.router.routes());
  }

  /* eslint class-methods-use-this: 0, no-param-reassign: 0 */
  route = async (ctx, next) => {
    const history = createMemoryHistory({
      initialEntries: [ctx.req.url],
    });

    const props = fakeprops(this.options.assets);

    const rootComponent = (
      <Root
        config={config}
        history={history}
        store={props.store}
        renderProps={props}
        type="server"
      />
    );

    const htmlComponent = (
      <Html
        assets={props.assets}
        component={rootComponent}
        store={props.store}
      />
    );

    const promise = props.store.runSaga(mainSaga(history, true)).done;
    props.store.endSaga();

    await promise;
    const renderedDomString = ReactDom.renderToString(htmlComponent);
    ctx.body = `<!doctype html>\n ${renderedDomString}`;

    await next();
  }

  start() {
    this.server.listen(this.options.port);
  }
}

export default class Cluster {
  failures = 0;

  workerExit = (worker) => {
    this.failures += 1;
    this.log.warning(`Worker ${worker.process.pid} died, restarting.`);
    cluster.fork();
  }

  constructor(threads = 2, serverConfig = {}, log) {
    this.failures = 0;

    this.serverConfig = {
      ...baseConfig(),
      ...serverConfig,
    };

    this.threads = threads;
    this.emitter = new Emitter();
    this.log = log || new Log();
  }

  startCluster() {
    cluster.setupMaster();
    cluster.on('exit', this.workerExit);

    for (let i = 0; i < this.threads; i += 1) {
      cluster.fork();
    }
  }

  startWorker() {
    this.server = new Server(this.serverConfig);
    this.server.start();
  }

  start() {
    if (cluster.isMaster && this.threads > 1) {
      this.startCluster();
    } else {
      this.startWorker();
    }
  }

  status() {
    return `Running ${this.threads} processes on port ${this.serverConfig.port}`;
  }
}

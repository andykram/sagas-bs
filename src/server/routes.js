/* eslint no-param-reassign: 0 */

import { readFileSync } from 'fs';
import moment from 'moment-timezone';

class DataManipulator {
  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  bucketByDayHour(tz = 'America/Los_Angeles') {
    return this.data.reduce((res, row) => {
      const d = moment(row.timestamp).tz(tz).format('"YYYY-MM-DD"');
      if (!res[d]) {
        res[d] = [];
      }
      res[d].push(row);
      return res;
    }, {});
  }
}

const dataManipulator = new DataManipulator(JSON.parse(readFileSync('./data')));

export default (router) => {
  router.get('/robots.txt', (ctx) => {
    ctx.body = 'DENY *';
  });

  router.get('/data.json', (ctx) => {
    ctx.body = JSON.stringify(dataManipulator.getData());
  });

  router.get('/data-bucket.json', (ctx) => {
    ctx.body = JSON.stringify(dataManipulator.bucketByDayHour());
  });
};

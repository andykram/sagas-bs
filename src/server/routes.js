/* eslint no-param-reassign: 0 */

export default (router) => {
  router.get('/robots.txt', (ctx) => {
    ctx.body = 'DENY *';
  });
};

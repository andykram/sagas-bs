import Error404Page from 'components/pages/error404';
import Route from './route';

export default class Error404 extends Route {
  static path = '*';
  /* eslint func-names: 0, no-empty-function: 0 */
  static route = function* () {};
  static page = Error404Page;
}

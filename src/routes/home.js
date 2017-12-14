import HomePage from 'components/pages/home';
import Route from './route';

export default class Home extends Route {
  static path = '/';
  static page = HomePage;

  /* eslint func-names: 0, no-empty-function: 0 */
  static route = function* () { };
}

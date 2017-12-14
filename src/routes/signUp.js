import SignUpPage from 'components/pages/signup';
import Route from './route';

export default class SignUp extends Route {
  static path = '/sign-up';
  static page = SignUpPage;

  /* eslint no-empty-function: 0, func-names: 0 */
  static route = function* () { };
}

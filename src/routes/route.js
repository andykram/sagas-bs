export default class Route {
  static path = '*';

  /* eslint no-empty-function: 0, func-names: 0 */
  static route = function* () { };

  static run = function* (store) {
    yield* this.route(store);
  };
}


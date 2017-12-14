import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom/server';

export default function Html(props) {
  const { assets, component, store } = props;
  const content = component ? ReactDOM.renderToStaticMarkup(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en-US">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link href={assets.client.css} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />
      </head>

      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__data=${JSON.stringify(store.getState())};` }} charSet="UTF-8" />
        <script dangerouslySetInnerHTML={{ __html: `window.__assets=${JSON.stringify(props.assets)};` }} charSet="UTF-8" />
        <script src={assets.vendor.js} charSet="UTF-8" />
        <script src={assets.client.js} charSet="UTF-8" />
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.shape({
    client: PropTypes.shape({
      css: PropTypes.string.isRequired,
      js: PropTypes.string.isRequired,
    }).isRequired,
    vendor: PropTypes.shape({
      js: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  component: PropTypes.node.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  store: PropTypes.object.isRequired,
};

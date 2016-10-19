import './global.css';

if (document.querySelectorAll('div#prime-minister').length) {
  require.ensure([], function chunkButtonComponent() {
    const button = require('./components/button').default;
    button('Winston').render('#first');
    button('Churchill').render('#second');
  });
}


// Polyfill libraries
import 'babel-polyfill';

// Project Files
import './really-impressive-styles.css';
import button from './components/button';

button('Winston').render('#first');
button('Churchill').render('#second');

console.log('Hello, webpack!');

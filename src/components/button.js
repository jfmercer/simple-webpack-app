import $ from 'jquery';
import Mustache from 'mustache';
import template from './button.html';
import styles from './button.css';

export default function button(text) {
  return {
    render: render
  };

  function render(buttonLabel) {
    var button = Mustache.render(template, {
      styles: styles,
      text: text
    });

    // Render the button
    $(buttonLabel).html(button);

    // Attach a listener
    $(buttonLabel).click(onClick.bind(this));
  }

  function onClick(event) {
    event.preventDefault();
    console.log('You clicked the ' + text + ' button.');
  }
}

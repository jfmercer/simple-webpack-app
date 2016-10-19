import $ from 'jquery';
import Mustache from 'mustache';
import template from './button.html';
import './button.css';

export default function button(text) {
  return {
    render: render
  };

  function render(node) {
    var button = Mustache.render(template, {
      text: text
    });

    // Render the button
    $(node).html(button);

    // Attach a listener
    $(node).click(onClick.bind(this));
  }

  function onClick(event) {
    event.preventDefault();
    console.log('You clicked the ' + text + ' button.');
  }
}

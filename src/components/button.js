import $ from 'jquery';
import Mustache from 'mustache';
import template from './button.html';
import './button.css';

export default function button(text) {
  return {
    render: render
  };

  function render(node) {
    // Render the button
    $(node).html(
      Mustache.render(template, {text})
    );

    // Attach a listener
    $(node).click(onClick.bind(this));
  }

  function onClick(event) {
    event.preventDefault();
    console.log('You clicked the ' + text + ' button.');
  }
}

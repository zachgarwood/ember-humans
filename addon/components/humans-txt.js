import Component from '@ember/component';
import fetch from 'fetch';
import layout from '../templates/components/humans-txt';
import { getOwner } from '@ember/application';

export default Component.extend({
  layout,

  humans: null,

  init() {
    this._super(...arguments);

    this.getHumans();
  },
  getHumans() {
    const config = getOwner(this).resolveRegistration('config:environment');
    fetch(config.rootURL + 'humans.txt')
      .then(response => response.text())
      .then(responseText => {
        this.set('humans', responseText);
      });
  }
});

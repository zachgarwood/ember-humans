import Component from '@ember/component';
import Ember from 'ember';
import fetch from 'fetch';
import layout from '../templates/components/humans-txt';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { warn } from '@ember/debug';

export default Component.extend({
  layout,
  classNames: ['humans-txt'],

  humansTxt: '',

  sections: computed('humansTxt', function () {
    let lines = this.get('humansTxt').split('\n');
    let sections = lines.reduce((sections, line) => {
      let result;
      if ((result = /\/\*([\s\S]*?)\*\//g.exec(line)) !== null) {
        sections.push({ header: result[1], items: [] })
      } else if ((result = /(\S+)/g.exec(line)) !== null) {
        if (sections.length === 0) {
          warn('No initial header provided.', Ember.testing, { id: 'ember-humans.no-initial-header' });
          sections.push({ header: 'HUMANS', items: [] })
        }
        sections[sections.length - 1].items.push(line);
      }
      return sections;
    }, []);
    return sections;
  }),

  init() {
    this._super(...arguments);
    this.getHumansTxt();
  },
  async getHumansTxt() {
    const config = getOwner(this).resolveRegistration('config:environment');
    let response = await fetch(config.rootURL + 'humans.txt');
    switch (response.status) {
      case 200:
        this.set('humansTxt', await response.text());
        break;
      case 404:
        warn(
          'Place a file named "humans.txt" in your project\'s public/ directory.',
          Ember.testing,
          { id: 'ember-humans.no-humans-txt' }
        );
        break;
    }
  }
});

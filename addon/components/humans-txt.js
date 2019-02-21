import Component from '@ember/component';
import fetch from 'fetch';
import layout from '../templates/components/humans-txt';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

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
          // eslint-disable-next-line no-console
          console.debug('No initial header provided.');
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
  getHumansTxt() {
    const config = getOwner(this).resolveRegistration('config:environment');
    fetch(config.rootURL + 'humans.txt')
      .then(response => response.text())
      .then(responseText => {
        this.set('humansTxt', responseText);
      });
  }
});

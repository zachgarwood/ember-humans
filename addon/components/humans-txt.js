import Component from '@ember/component';
import Ember from 'ember';
import fetch from 'fetch';
import layout from '../templates/components/humans-txt';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { warn } from '@ember/debug';

/**
 * Display the contents of `humans.txt`.
 *
 * ```hbs
 * {{#humans-txt as |text|}}
 *   {{#each text.blocks as |block|}}
 *     <dl>
 *       <dt>{{block.header}}</dt>
 *       <dd>
 *         {{#each block.items as |item|}}
 *           <p>{{item}}</p>
 *         {{/each}}
 *       </dd>
 *     </dl>
 *   {{/each}}
 * {{/humans-txt}}
 * ```
 *
 * @class HumansTxt
 * @yield {Hash} text
 * @yield {Array<Object>} text.blocks
 * @yield {String} text.raw
 */
export default Component.extend({
  layout,
  classNames: ['humans-txt'],

  /**
   * The raw text of `humans.txt`.
   *
   * @property raw
   * @type String
   */
  raw: '',

  /**
   * The text from `humans.txt` divided up into blocks.
   *
   * Example:
   * ```javascript
   * [
   *   {
   *     header: "HEADER",
   *     items: [ "Item: Description" ]
   *   }
   * ]
   * ```
   *
   * @property blocks
   * @type Array<Object>
   */
  blocks: computed('raw', function () {
    let lines = this.get('raw').split('\n');
    return lines.reduce((blocks, line) => {
      let result;
      if ((result = /\/\*([\s\S]*?)\*\//g.exec(line)) !== null) {
        blocks.push({ header: result[1], items: [] })
      } else if ((result = /(\S+)/g.exec(line)) !== null) {
        if (blocks.length === 0) {
          warn('No initial header provided.', Ember.testing, { id: 'ember-humans.no-initial-header' });
          blocks.push({ header: 'HUMANS', items: [] })
        }
        blocks[blocks.length - 1].items.push(line);
      }
      return blocks;
    }, []);
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
        this.set('raw', await response.text());
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

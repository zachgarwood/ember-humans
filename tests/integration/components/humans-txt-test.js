import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const HUMANS_TXT = [
  {
    header: 'TEAM',
    items: [
      'Developer: Zach Garwood',
      'Location: Chicago, IL, USA',
    ]
  }
];

module('Integration | Component | humans-txt', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', HUMANS_TXT);
    await render(hbs`<HumansTxt @humans={{this.data}}/>`);

    assert.dom('header').includesText('TEAM');
    assert.dom('ul').includesText('Developer: Zach Garwood');
    assert.dom('ul').includesText('Location: Chicago, IL, USA');
  });
});

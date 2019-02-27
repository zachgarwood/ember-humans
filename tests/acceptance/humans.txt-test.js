import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, visit } from '@ember/test-helpers';

module('Acceptance | Usage', function(hooks) {
  setupApplicationTest(hooks);

  test('Usage', async function(assert) {
    await visit('/docs/usage');

    assert.dom('.humans-txt-section:first-of-type header').includesText('TEAM');
    assert.dom('.humans-txt-section:last-of-type header').includesText('SITE');
    assert.dom('pre.raw-text').isNotVisible();

    await click('button.toggle-view');

    assert.dom('pre.raw-text').includesText('/* TEAM */');
    assert.dom('.humans-txt-section').isNotVisible();
  });
});

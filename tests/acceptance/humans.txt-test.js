import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, visit, settled } from '@ember/test-helpers';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    await settled();

    assert.dom('.humans-txt-section:first-of-type header').includesText('TEAM');
    assert.dom('.humans-txt-section:last-of-type header').includesText('SITE');
    assert.dom('pre.raw-text').isNotVisible();

    await click('button.toggle-view');

    assert.dom('pre.raw-text').includesText('/* TEAM */');
    assert.dom('.humans-txt-section').isNotVisible();
  });
});

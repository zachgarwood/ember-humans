import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Docs', function(hooks) {
  setupApplicationTest(hooks);

  test('attribute humanstxt.org', async function(assert) {
    await visit('/docs');

    assert.dom('[href="http://humanstxt.org"]').exists();
  });
  test('display in inline form', async function(assert) {
    await visit('/docs/quickstart#humanstxt-component');

    assert.dom('.humans-txt-section:first-of-type header').includesText('TEAM');
    assert.dom('.humans-txt-section:first-of-type li:first-child').includesText('Developer: Zach Garwood');
    assert.dom('.humans-txt-section:first-of-type li:last-child').includesText('Location: Chicago, IL, USA');
    assert.dom('.humans-txt-section:last-of-type header').includesText('SITE');
    assert.dom('.humans-txt-section:last-of-type li').includesText('Standards: HTML5');
  });
  test('display raw text', async function(assert) {
    await visit('/docs/quickstart#humanstxt-file');

    assert.dom('pre.raw-text').includesText('/* TEAM */');
    assert.dom('pre.raw-text').includesText('/* SITE */');
  });
  test('display in block form', async function(assert) {
    await visit('/docs/usage');

    assert.dom('.humans-txt-section:first-of-type header').includesText('TEAM');
    assert.dom('.humans-txt-section:last-of-type header').includesText('SITE');
    assert.dom('pre.raw-text').isNotVisible();

    await click('button.toggle-view');

    assert.dom('pre.raw-text').includesText('/* TEAM */');
    assert.dom('.humans-txt-section').isNotVisible();
  });
});

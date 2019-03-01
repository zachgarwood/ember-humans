import { visit } from '@ember/test-helpers';
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

    assert.dom('section:first-of-type header').includesText('TEAM');
    assert.dom('section:first-of-type li:first-child').includesText('Developer: Zach Garwood');
    assert.dom('section:first-of-type li:last-child').includesText('Location: Chicago, IL, USA');
    assert.dom('section:last-of-type header').includesText('SITE');
    assert.dom('section:last-of-type li').includesText('Standards: HTML5');
  });
  test('display in block form', async function(assert) {
    await visit('/docs/usage#blocks');

    assert.dom('dl:first-of-type>dt').includesText('TEAM');
    assert.dom('dl:last-of-type>dt').includesText('SITE');
  });
  test('display raw text', async function(assert) {
    await visit('/docs/usage#raw');

    assert.dom('pre.text-raw').includesText('/* TEAM */');
    assert.dom('pre.text-raw').includesText('/* SITE */');
  });
});
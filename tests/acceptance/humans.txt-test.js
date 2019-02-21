import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, settled } from '@ember/test-helpers';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    await settled();

    assert.dom('.section:first-of-type header').includesText('TEAM');
    assert.dom('.section:first-of-type li:first-child').includesText('Developer: Zach Garwood');
    assert.dom('.section:first-of-type li:last-child').includesText('Location: Chicago, IL, USA');

    assert.dom('.section:last-of-type header').includesText('SITE');
    assert.dom('.section:last-of-type li').includesText('Standards: HTML5');

  });
});

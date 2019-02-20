import { module, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  skip('visiting /', async function(assert) {
    await visit('/');

    assert.dom('header').includesText('TEAM');
    assert.dom('ul').includesText('Developer: Zach Garwood');
    assert.dom('ul').includesText('Location: Chicago, IL, USA');
  });
});

import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | humans-txt', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it makes a request to /humans.txt', async function(assert) {
    this.server.get('/humans.txt', function() {
      assert.ok(true, 'The component requests /humans.txt');
    });

    await render(hbs`<HumansTxt/>`);
  });
});

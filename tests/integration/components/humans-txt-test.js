import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { Response } from 'ember-cli-mirage';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | humans-txt', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it makes a request to /humans.txt', async function(assert) {
    assert.expect(1);
    this.server.get('/humans.txt', () => assert.ok(true, 'The component requests /humans.txt'));

    await render(hbs`{{humans-txt}}`);
  });
  test('it handles 404', async function(assert) {
    this.server.get('/humans.txt', () => new Response(404, {}, {}));

    await render(hbs`{{humans-txt}}`);

    assert.dom('*').isNotVisible();
  });
  test('it handles a 500 response', async function(assert) {
    this.server.get('/humans.txt', () => new Response(500, {}, {}));

    await render(hbs`{{humans-txt}}`);

    assert.dom('*').isNotVisible();
  });
});

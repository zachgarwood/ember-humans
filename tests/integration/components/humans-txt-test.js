import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { Response } from 'ember-cli-mirage';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | humans-txt', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders in inline form', async function(assert) {
    await render(hbs`<HumansTxt/>`);

    assert.dom('.humans-txt-section:first-of-type header').includesText('TEAM');
    assert.dom('.humans-txt-section:first-of-type li:first-child').includesText('Developer: Zach Garwood');
    assert.dom('.humans-txt-section:first-of-type li:last-child').includesText('Location: Chicago, IL, USA');
    assert.dom('.humans-txt-section:last-of-type header').includesText('SITE');
    assert.dom('.humans-txt-section:last-of-type li').includesText('Standards: HTML5');
  });
  test('it renders in block form', async function(assert) {
    await render(hbs`
      <HumansTxt as |humans|>
        {{#each humans.sections as |section|}}
          <p>{{section.header}}</p>
        {{/each}}
      </HumansTxt>
    `)

    assert.dom('p:first-of-type').includesText('TEAM');
    assert.dom('p:last-of-type').includesText('SITE');
  });
  test('it makes a request to /humans.txt', async function(assert) {
    assert.expect(1);
    this.server.get('/humans.txt', () => assert.ok(true, 'The component requests /humans.txt'));

    await render(hbs`<HumansTxt/>`);
  });
  test('it handles 404', async function(assert) {
    this.server.get('/humans.txt', () => new Response(404, {}, {}));

    await render(hbs`<HumansTxt/>`);

    assert.dom('*').isNotVisible();
  });
  test('it handles a 500 response', async function(assert) {
    this.server.get('/humans.txt', () => new Response(500, {}, {}));

    await render(hbs`<HumansTxt/>`);

    assert.dom('*').isNotVisible();
  });
});

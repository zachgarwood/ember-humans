# Usage

The simplest way to use HumansTxt is to drop it into the template of your
Credits page, as is. But if you'd like to customize the look and layout, you
should use the block form. In block form, the element yields a hash containing
both an organized data structure, `blocks`, and the raw text of the humans.txt
file, `raw`.

## Using blocks

The `blocks` property is a list of objects, each containing a header and list of
items under that header.

{{#docs-demo as |demo|}}
  {{#demo.example name='usage.blocks.hbs'}}
    {{#humans-txt as |text|}}
      {{#each text.blocks as |block|}}
        <dl>
          <dt>{{block.header}}</dt>
          <dd>
            {{#each block.items as |item|}}
              <p>{{item}}</p>
            {{/each}}
          </dd>
        </dl>
      {{/each}}
    {{/humans-txt}}
  {{/demo.example}}

  {{demo.snippet 'usage.blocks.hbs'}}
{{/docs-demo}}

## Output raw text

The `raw` property dumps the raw text of your humans.txt.

{{#docs-demo as |demo|}}
  {{#demo.example name='usage.raw.hbs'}}
    {{#humans-txt as |text|}}
      <pre class="text-raw">{{text.raw}}</pre>
    {{/humans-txt}}
  {{/demo.example}}

  {{demo.snippet 'usage.raw.hbs'}}
{{/docs-demo}}

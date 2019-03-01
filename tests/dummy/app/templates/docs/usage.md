# Usage

`{{humans-txt}}` yields a hash containing `sections` and `rawText`.

## blocks

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

## raw

{{#docs-demo as |demo|}}
  {{#demo.example name='usage.raw.hbs'}}
    {{#humans-txt as |text|}}
      <pre class="text-raw">{{text.raw}}</pre>
    {{/humans-txt}}
  {{/demo.example}}

  {{demo.snippet 'usage.raw.hbs'}}
{{/docs-demo}}

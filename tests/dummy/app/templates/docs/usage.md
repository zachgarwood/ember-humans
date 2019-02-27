# Usage

{{#docs-demo as |demo|}}
  {{#demo.example name='humans.hbs'}}
    {{#humans-txt as |humans|}}
      <button class="toggle-view" {{action (toggle "showRaw" this)}}>
        Toggle View
      </button>
      <div>
        {{#if this.showRaw}}
          <pre class="raw-text">{{humans.raw}}</pre>
        {{else}}
          {{#each humans.sections as |section|}}
            <div class="humans-txt-section">
              <header class="humans-txt-header">{{section.header}}</header>
              <ul class="humans-txt-items">
                {{#each section.items as |item|}}
                  <li class="humans-txt-item">{{item}}</li>
                {{/each}}
              </ul>
            </div>
          {{/each}}
        {{/if}}
      </div>
    {{/humans-txt}}
  {{/demo.example}}

  {{demo.snippet 'humans.hbs'}}
{{/docs-demo}}

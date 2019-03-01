# Quickstart

## Installation

`ember install ember-humans`

## HumansTxt file

Place a file named `humans.txt` in the `public/` directory of your project, next
to the `robots.txt` file.

It should look something like this:

{{#humans-txt as |humans|}}
  <pre class="raw-text">{{humans.raw}}</pre>
{{/humans-txt}}

For more information, see
[http://humanstxt.org/Standard.html](http://humanstxt.org/Standard.html).

## HumansTxt component

Drop `{{humans-txt}}`into a credits component:
{{#docs-demo as |demo|}}
  {{#demo.example name='quickstart.humans-txt.hbs'}}
    <div class="credits">
      <h2>Credits</h2>
      {{humans-txt}}
    </div>
  {{/demo.example}}

  {{demo.snippet 'quickstart.humans-txt.hbs'}}
{{/docs-demo}}


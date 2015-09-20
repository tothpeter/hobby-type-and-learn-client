import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('jqui-draggable', 'Integration | Component | jqui draggable', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jqui-draggable}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#jqui-draggable}}
      template block text
    {{/jqui-draggable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

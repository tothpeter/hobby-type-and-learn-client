import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('jqui-droppable', 'Integration | Component | jqui droppable', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jqui-droppable}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#jqui-droppable}}
      template block text
    {{/jqui-droppable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

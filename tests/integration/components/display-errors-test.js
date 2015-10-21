import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('display-errors', 'Integration | Component | display errors', {
  integration: true
});

test('it renders correctly', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  
  this.set('showErrors', true);
  this.set('errors', ['error message1', 'error message2']);

  this.render(hbs`{{display-errors errors=errors showErrors=showErrors}}`);

  assert.equal(this.$().text().trim(), 'error message1', 'Display the first error message');
  
  this.set('showErrors', false);

  assert.equal(this.$().text().trim(), '', 'Display nothingh if there\' no error');
});

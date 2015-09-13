import { moduleForModel, test } from 'ember-qunit';

moduleForModel('label', 'Unit | Model | label', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:card']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

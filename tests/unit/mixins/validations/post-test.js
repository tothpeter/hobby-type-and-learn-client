import Ember from 'ember';
import ValidationsPostMixin from '../../../mixins/validations/post';
import { module, test } from 'qunit';

module('Unit | Mixin | validations/post');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidationsPostObject = Ember.Object.extend(ValidationsPostMixin);
  var subject = ValidationsPostObject.create();
  assert.ok(subject);
});

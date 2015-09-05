import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Mixin.create(EmberValidations, {
  validations: {
    'model.sideA': {
      presence: true,
      // length: { maximum: 30 }
    },
    'model.sideB': {
      presence: true,
      // length: { maximum: 30 }
    }
  }
});

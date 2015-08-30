import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  
  labels: DS.hasMany('label', { async: true }),
});

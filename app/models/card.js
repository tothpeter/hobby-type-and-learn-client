import DS from 'ember-data';

export default DS.Model.extend({
  sideA: DS.attr(),
  sideB: DS.attr(),
  proficiencyLevel: DS.attr('number'),

  user: DS.belongsTo('user'),
  labels: DS.hasMany('label', { async: true }),
});
